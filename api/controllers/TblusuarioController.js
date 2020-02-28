/**
 * TblusuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var Passwords = require('machinepack-passwords');
let Procedures = Object();

Procedures.register = async(req, res)=>{
    let
        params = req.allParams()
    ;
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
  let rol = await Tblperfil.findOne({prf_descripcion: params.rol || "usuario"});
  if(!rol) {
    rol = await Tblperfil.create({prf_descripcion: params.rol || "usuario"}).fetch();
    if(!rol) return res.ok({status: 400, data: "error al crear el rol"});
  }
  params.usu_perfil = rol.id;
  params.codigo = codigo();
  user = await Tblusuario.create(params).fetch();
  if(!user) return res.badRequest(err);
  user = await Tblusuario.findOne({id: user.id}).populate('usu_perfil');
  return res.ok({status: 200, 'success': true, data: user});
}
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

Procedures.login = async function(req, res){
    Tblusuario.findOne({usu_email: req.param('usu_email')}).populate('usu_perfil').exec(function(err, user){
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

Procedures.querys = async (req, res)=>{
	let params = req.allParams();
    let resultado = Object();
    console.log("***", params);
	resultado = await QuerysServices(Tblusuario, params);
	for(let row of resultado.data){
		row.usu_perfil = await Tblperfil.findOne({ id: row.usu_perfil });
	}
	return res.ok(resultado);
}

module.exports = Procedures;
