/**
 * TblcobrarController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let Procedures = Object();
const _ = require('lodash');

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

	let validadndo = await Procedures.validandoCantidad(params);

	if(validadndo < params.cob_monto) return res.status(400).send({status:400 ,mensaje: "Error Cantidad no Disponible"});

	resultado = await Tblcobrar.find({ where: { usu_clave_int: params.usu_clave_int }, sort: 'createdAt desc' });
	resultado = resultado[0];
	if(resultado) { if( (await Procedures.validandoRetiro(resultado)) == false ) return res.ok({ status: 200, data: 'no puedes retirar espera 15 dias'}); } 
	resultado = await Tblcobrar.create(params).fetch();

	resultado = await Tblcobrar.find({ id: resultado.id }).populate('usu_clave_int');

	return res.ok({ status: 200, data: resultado });
	
}

Procedures.validandoCantidad = async ( res )=>{
	let resultado = Object();
	resultado = await Tblventas.find({ usu_clave_int: res.usu_clave_int });
	resultado = _.sumBy( resultado, (row)=> row.ven_ganancias );
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

