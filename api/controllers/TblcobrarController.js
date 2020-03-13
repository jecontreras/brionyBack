/**
 * TblcobrarController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let Procedures = Object();
const _ = require('lodash');
const moment = require('moment');

Procedures.querys = async ( req, res )=>{
	let params = req.allParams();
    let resultado = Object();
	resultado = await QuerysServices(Tblcobrar, params);
	for(let row of resultado.data){
		row.usu_clave_int = await Tblusuario.findOne( { where:{ id: row.usu_clave_int }} );
	}
	return res.ok(resultado);
}

Procedures.create = async ( req, res )=>{
	let params = req.allParams();
	let resultado = Object();

	resultado = await Tblcobrar.find({ where: { usu_clave_int: params.usu_clave_int }, sort: 'createdAt desc' });
	resultado = resultado[0];
	if(resultado) { if( (await Procedures.validandoRetiro(resultado)) == false ) return res.ok({ status: 200, data: 'no puedes retirar espera 15 dias'}); } 
	
	let validadndo = await Procedures.validandoCantidad(params);

	if(validadndo < params.cob_monto) return res.status(400).send({status:400 ,mensaje: "Error Cantidad no Disponible"});

	resultado = await Tblcobrar.create(params).fetch();

	resultado = await Tblcobrar.find({ id: resultado.id }).populate('usu_clave_int');

	return res.ok({ status: 200, data: resultado });
}

Procedures.validandoCantidad = async ( res )=>{
	let resultado = Object();
	resultado = await Tblventas.find({ usu_clave_int: res.usu_clave_int });
	resultado = _.sumBy( resultado, (row)=> row.ven_ganancias );
	resultado+= await Procedures.getPuntos( res );
	return resultado;
}
Procedures.getPuntos = async ( data )=>{
	let resultado = Object();
	resultado = await Puntos.findOne({ usuario: data.usu_clave_int });
	console.log("REs", resultado)
	if(resultado.valor == 0) return 0;
	let query = {
		"ven_tipo": "carrito",
		"usu_clave_int": data.usu_clave_int,
		"ven_nombre_cliente": "creadoPuntos",
		"ven_telefono_cliente": "creadoPuntos",
		"ven_direccion_cliente": "creadoPuntos",
		"ven_fecha_venta": new moment().format('DD-MM-YYYY'),
		"pro_clave_int": "15",
		"ven_precio": 1,
		"ven_cantidad": 1,
		"ven_total": 1,
		"ven_ganancias": resultado.valor,
		"ven_tallas": "0",
		"ven_estado": 4,
		"create": new moment().format('DD-MM-YYYY'),
	};
	let info = await Procedures.createFactura( query );
	info = await NivelServices.descontandoPuntos( query );
	return resultado.valor;
}

Procedures.createFactura = async ( data )=>{
	let resultado = Object();
	resultado = await Tblventas.create(data);
	return resultado;
}

Procedures.validandoRetiro = async ( res )=>{
	let
	      fecha1 = new Date(res.createdAt), fecha2 = new Date(), diasDif = fecha2.getTime() - fecha1.getTime(), dias = Math.round(diasDif / (1000 * 60 * 60 * 24))
    ;
    if(dias < 15) return false;
    else return true;
}

module.exports = Procedures;

