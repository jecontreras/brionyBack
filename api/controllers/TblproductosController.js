/**
 * TblproductosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let Procedures = Object();
const _ = require('lodash');

Procedures.querys = async (req, res) => {
	let params = req.allParams();
	let resultado = Object();
	console.log("***", params);
	resultado = await QuerysServices(Tblproductos, params);
	for (let row of resultado.data) {
		if (row.cat_clave_int) row.cat_clave_int = await Tblcategorias.findOne({ where: { id: row.cat_clave_int } });
		if (row.pro_categoria) row.pro_categoria = await Tblcategorias.findOne({ where: { id: row.pro_categoria } });
		if (row.pro_usu_creacion) row.pro_usu_creacion = await Tblproveedor.findOne({ where: { id: row.pro_usu_creacion } });
	}
	return res.ok(resultado);
}
Procedures.tridy = async (req, res) => {
//Procedures.querys = async (req, res) => {
	let params = req.allParams();
	res.status(200).send({ status: 200, data: "ok" });
	await TblproductosServices.procesoCategoria();
	await TblproductosServices.procesoProvedor();
	await TblproductosServices.nextTridy();	

}

module.exports = Procedures;

