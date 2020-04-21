/**
 * TbltestimonioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let Procedures = Object();
const _ = require('lodash');

Procedures.querys = async (req, res)=>{
	let params = req.allParams();
    let resultado = Object();
	resultado = await QuerysServices(Tbltestimonio, params);
	for(let row of resultado.data){
		row.usuario = await Tblusuario.findOne({ id: row.usuario });
	}
	return res.ok(resultado);
}

module.exports = Procedures;