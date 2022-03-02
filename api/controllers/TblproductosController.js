/**
 * TblproductosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let Procedures = Object();
const _ = require('lodash');
const moment = require('moment');

Procedures.querys = async (req, res) => {
	let params = req.allParams();
	let resultado = Object();
	console.log("***", params);
	resultado = await QuerysServices(Tblproductos, params);
	for (let row of resultado.data) {
		row.listComentarios = _.orderBy( await Procedures.comentarios( row.id ), ['posicion', 'age'] );
		if (row.cat_clave_int) row.cat_clave_int = await Tblcategorias.findOne({ where: { id: row.cat_clave_int } });
		if (row.pro_categoria) row.pro_categoria = await Tblcategorias.findOne({ where: { id: row.pro_categoria } });
		if (row.pro_usu_creacion) row.pro_usu_creacion = await Tblproveedor.findOne({ where: { id: row.pro_usu_creacion } });
		if( row.pro_sw_tallas && !row.listaTallas ) {
			row.listTallas = await Tbltallas.find({ tal_tipo: row.pro_sw_tallas });
			row.listTallas = _.orderBy( row.listTallas, ['tal_descripcion'], ['asc'] );
		}
		if( row.listaTallas ) row.listTallas = _.orderBy( row.listaTallas, ['tal_descripcion'], ['asc'] );
	}
	return res.ok(resultado);
}

Procedures.comentarios = async ( id )=>{
	let resultado = await Tbltestimonio.find( { productos: id } );
	let dataFinix = [];
	dataFinix =  [
		{
			nombre: "Antonio",
			fecha: new moment().format("DD/MM/YYYY"),
			descripcion: "Producto genial muy util y facil de usar.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Carlos montaño",
			fecha: (new moment().add(-1, 'days')).format("DD/MM/YYYY"),
			descripcion: "Me Encanto en Todas Formas Recomendado.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Rafael",
			fecha: (new moment().add(-2, 'days')).format("DD/MM/YYYY"),
			descripcion: "LLego muy rapido y me encanto.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Estafany",
			fecha: (new moment().add(-3, 'days')).format("DD/MM/YYYY"),
			descripcion: "A mi esposo le gusto saludos.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Ester",
			fecha: (new moment().add(-4, 'days')).format("DD/MM/YYYY"),
			descripcion: "Es Muy Genial Gracias.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Jose",
			fecha: (new moment().add(-5, 'days')).format("DD/MM/YYYY"),
			descripcion: "Gracias Tienda Recomendado.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Olga",
			fecha: (new moment().add(-6, 'days')).format("DD/MM/YYYY"),
			descripcion: "Tenia Miedo alcomprar pero me llego bien gracias.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Cristian",
			fecha: (new moment().add(-7, 'days')).format("DD/MM/YYYY"),
			descripcion: "Gracias tienda recomendad.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		},
		{
			nombre: "Miguel",
			fecha: (new moment().add(-8, 'days')).format("DD/MM/YYYY"),
			descripcion: "Gracias me encanto.",
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		}
	];
	let result = _.map( resultado, ( key )=>{
		return {
			nombre: key.nombre,
			fecha: new moment( key.createdAt ).format("DD/MM/YYYY"),
			descripcion: key.descripcion,
			posicion: _.random(0, 10),
			foto: "./assets/noimagen.jpg"
		}
	});
	dataFinix.push( ...result );
	return dataFinix;
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

