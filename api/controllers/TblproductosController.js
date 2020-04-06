/**
 * TblproductosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let Procedures = Object();
Procedures.querys = async (req, res)=>{
	let params = req.allParams();
    let resultado = Object();
    console.log("***", params);
	resultado = await QuerysServices(Tblproductos, params);
	for(let row of resultado.data){
		if( row.cat_clave_int ) row.cat_clave_int = await Tblcategorias.findOne({where:{id: row.cat_clave_int}});
		if( row.pro_sw_tallas ) row.listTallas = await Tbltallas.find({ tal_tipo: row.pro_sw_tallas });
		if( row.pro_categoria ) row.pro_categoria = await Tblcategorias.findOne({ where: { id: row.pro_categoria }});
	}
	return res.ok(resultado);
}
module.exports = Procedures;

