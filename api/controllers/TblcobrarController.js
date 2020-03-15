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

	if( (await Procedures.validandoRetiro()) == false ) return res.ok({ status: 200, data: 'no puedes retirar dias hábiles son los día 12-13-14-15 y 27-28-29-30 del mes '});
	
	let validadndo = await Procedures.validandoCantidad(params);

	if(validadndo < params.cob_monto) return res.status(400).send({status:400 ,mensaje: "Error Cantidad no Disponible"});

	resultado = await Tblcobrar.create(params).fetch();

	resultado = await Tblcobrar.find({ id: resultado.id }).populate('usu_clave_int');

	return res.ok({ status: 200, data: resultado });
}

Procedures.validandoCantidad = async ( res )=>{
	let resultado = Object();
	let extra = Array();

	extra = await Tblcobrar.find( { where: { usu_clave_int: res.usu_clave_int, cob_estado: 1 } });
  	resultado.pagado = _.sumBy( extra, (row)=> row.cob_monto );
	//console.log("************",resultado.pagado)

	extra = await Tblventas.find({ usu_clave_int: res.usu_clave_int, ven_estado: 1, ven_retirado:false, ven_sw_eliminado: 0 });
	resultado.disponible = _.sumBy( extra, (row)=> row.ven_ganancias );
	//console.log("************",resultado.disponible, extra)
	
	resultado.disponible+= await Procedures.getPuntos( res );

	resultado = Number( resultado.disponible || 0 ) - Number( resultado.pagado || 0);
	console.log("************",resultado)
	if( 0 >= resultado) return 0;
	return resultado;
}
Procedures.getPuntos = async ( data )=>{
	let resultado = Object();
	resultado = await Puntos.findOne({ usuario: data.usu_clave_int });
	console.log("REs", resultado)
	if(!resultado) return 0;
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
	if(Number(fecha) >=12 && Number(fecha) <= 15) return true
	if(Number(fecha) >=27 && Number(fecha) <= 30) return true
    return true;
}

Procedures.fechasDisponibles = async  ( req, res)=>{
	let params = req.allParams();
	let fecha = momentz();
	let resultado = Object();
	fecha.tz('America/Bogota').format('ha z');  // 5am PDT
	fecha = new moment(fecha).format('DD');
	if(Number(fecha) >=12 && Number(fecha) <= 15) return res.ok({status:200, data:true})
	if(Number(fecha) >=27 && Number(fecha) <= 30) return res.ok({status:200, data:true})
	resultado = await Tblventas.findOne({usu_clave_int: params.user, cob_estado: 0 });
	if(resultado) return res.ok({status:200, data: false, mensaje: "Tienes un retiro en estado pendiente mas informacion al servicio al cliente +573148487506"});
	return res.ok({status:200, data:false})
	

}

module.exports = Procedures;

