/**
 * TblcobrarController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let Procedures = Object();
const _ = require('lodash');
const moment = require('moment');
const momentz = require('moment-timezone');

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

	if( (await Procedures.validandoRetiro()) == false ) return res.ok({ status: 200, data: 'no puedes retirar espera 15 dias'});
	
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

Procedures.validandoRetiro = async ( )=>{
	let fecha = momentz();
	fecha.tz('America/Bogota').format('ha z');  // 5am PDT
	fecha = new moment(fecha).format('DD');
	if(Number(fecha) >=15 && Number(fecha) <= 18) return true
	if(Number(fecha) >=30 && Number(fecha) <= 3) return true
    return true;
}

Procedures.fechasDisponibles = async  ( req, res)=>{
	let fecha = momentz();
	fecha.tz('America/Bogota').format('ha z');  // 5am PDT
	fecha = new moment(fecha).format('DD');
	if(Number(fecha) >=15 && Number(fecha) <= 18) return res.ok({status:200, data:true})
	if(Number(fecha) >=30 && Number(fecha) <= 3) return res.ok({status:200, data:true})
	return res.ok({status:200, data:false})
	

}

module.exports = Procedures;

