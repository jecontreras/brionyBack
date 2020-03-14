/**
 * TblusuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var Passwords = require('machinepack-passwords');
const _ = require('lodash');
const moment = require('moment');
let Procedures = Object();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.register = async(req, res)=>{

    let params = req.allParams();
  // sails.log.info(26, params);
  if((params.usu_clave !== params.usu_confir) && (!params.usu_usuario && !params.email && !params.usu_nombre)) return res.ok({status: 400, data: "error en el envio de los datos"});
    //   Validando si existe  el usuario
  let user = await Tblusuario.findOne({where:{usu_email: params.usu_email}});
  if(user) return res.ok({status: 400, data: "error el username ya se encuentra registrado"});
    //   Validando la Contraseña
  let password = await Procedures.encryptedPassword(params.usu_clave);
  if(!password) return res.serverError("password Error");
  params.usu_clave = password;
    //   Codigo
  function codigo(){return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase();}
    //   Rol
  let rol = await Tblperfil.findOne({prf_descripcion: params.rol || "vendedor"});
  if(!rol) {
    rol = await Tblperfil.create({prf_descripcion: params.rol || "vendedor"}).fetch();
    if(!rol) return res.ok({status: 400, data: "error al crear el rol"});
  }
  params.usu_perfil = rol.id;
  params.codigo = codigo();
  params.nivel = await NivelServices.getNivel();
  params.nivel = params.nivel.id;
  user = await Tblusuario.create(params).fetch();
  if(!user) return res.badRequest(err);
  user = await Tblusuario.findOne({id: user.id}).populate('usu_perfil').populate('cabeza');
  return res.ok({status: 200, 'success': true, data: user});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.encryptedPassword = (password) =>{
    return new Promise(resolve=>{
        Passwords.encryptPassword({
            password: password,
          }).exec({
            error: function (err){
              resolve(false)
            },
            success: function (password) {
              resolve(password);

            }
        });
    })

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.login = async function(req, res){
    Tblusuario.findOne({usu_email: req.param('usu_email')}).populate('usu_perfil').populate('cabeza').exec(function(err, user){
        if(err) return res.send({'success': false,'message': 'Peticion fallida','data': err});
        if(!user) return res.send({'success': false,'message': 'Usuario no encontrado','data': user});
        Passwords.checkPassword({
            passwordAttempt: req.param('usu_clave'),
            encryptedPassword: user.usu_clave,
            }).exec({
            error: function (err) {
                return res.send({'success': false,'message': 'Eror del servidor','data': err});
            },
            incorrect: function () {
                return res.send({'success': false,'message': 'Contraseña incorrecta'});
            },
            success: function () {
                user.password = '';
                sails.log('User '+ user.id +' has logged in.');
                return res.send({
                'success': true,
                'message': 'Peticion realizada',
                'data': user
                });

            },
            });
        })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.cambioPass = async (req, res)=>{

  let params = req.allParams();
  let resultado = Object();
  params.password = await Procedures.encryptedPassword(params.password);
  resultado = await Tblusuario.update({id: params.id},{usu_clave: params.password}).fetch();
  return res.status(200).send( { status:200, data: resultado } );

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.querys = async (req, res)=>{
	let params = req.allParams();
    let resultado = Object();
    console.log("***", params);
	resultado = await QuerysServices(Tblusuario, params);
	for(let row of resultado.data){
    row.usu_perfil = await Tblperfil.findOne({ id: row.usu_perfil });
    row.nivel = await Categorias.findOne({ id: row.nivel });
    row.cabeza = await Tblusuario.findOne({ id: row.cabeza });
	}
	return res.ok(resultado);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.infoUser = async (req, res)=>{
  let params = req.allParams();
  let resultado = Object();
  let extra = Object();
  if(params.where) params = params.where;

  resultado = await Tblusuario.findOne({ id: params.id });
  if( !resultado ) return res.ok( { status:200, data: resultado } );
  //get de puntos 
  extra = await Puntos.findOne( { where: { usuario: resultado.id }});
  if(!extra) resultado.gananciasRefereridos = 0;
  else resultado.gananciasRefereridos = extra.valor;

  //mis ganancias
  extra = await Tblventas.find( { where: { usu_clave_int: resultado.id, ven_estado: 1, ven_sw_eliminado: 0 } });
  resultado.ganancias = ( _.sumBy( extra, (row)=> row.ven_ganancias ) ) + resultado.gananciasRefereridos;
  //por cobrar
  extra = await Tblcobrar.find( { where: { usu_clave_int: resultado.id, cob_estado: 0 } });
  resultado.cobrado = _.sumBy( extra, (row)=> row.cob_monto );
  //pagado
  extra = await Tblcobrar.find( { where: { usu_clave_int: resultado.id, cob_estado: 1 } });
  resultado.pagado = _.sumBy( extra, (row)=> row.cob_monto );
  // porcobrar y le resta lo pagadao
  extra = await Tblventas.find( { where: { usu_clave_int: resultado.id, ven_retirado: false, ven_estado: 1, ven_sw_eliminado: 0 } });
  resultado.porcobrado = (( _.sumBy( extra, (row)=> row.ven_ganancias ) ) + resultado.gananciasRefereridos) - ( resultado.pagado || 0 );
  
  //Busca el nivel del usuario
  resultado.nivel = await NivelServices.nivelUser( resultado );
  return res.ok( { status:200, data: resultado } );
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.guardarPunto = async(req, res)=>{
  let params = req.allParams();
  let resultado = Object();
  let user = await Tblusuario.findOne( { id: params.user } );
  if(!user) return res.status(400).send({ status:400, data: "Error de Usuario no Encontrado"});
  resultado = await NivelServices.procesoGanacias( user, { id: 1, ven_ganancias: params.ganancias }, { valor: 100 } );
  return res.status(200).send( { status:200, data:"ok" });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = Procedures;
