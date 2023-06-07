/**
 * TblproductosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let Procedures = Object();
const _ = require('lodash');

Procedures.querys = async (req, res)=>{
	let params = req.allParams();
    let resultado = Object();
	let idUser = params.where.user;
	delete params.where.user;
  let validPrice = params.where.idPrice;
  delete params.where.idPrice;
	resultado = await QuerysServices( Tblproductos, params );
	let porcentaje;
	if( idUser ) porcentaje = await Procedures.validadorPrecio( idUser );
	for(let row of resultado.data){
		row.precioProveedor = row.pro_vendedor;
		if( row.cat_clave_int ) row.cat_clave_int = await Tblcategorias.findOne({ id: row.cat_clave_int });
		if( row.pro_usu_creacion ) row.pro_usu_creacion = await Tblusuario.findOne({ id: row.pro_usu_creacion });
		if( row.pro_sw_tallas && !row.listaTallas ) {
			row.listTallas = await Tbltallas.find({ tal_tipo: row.pro_sw_tallas });
			row.listTallas = _.orderBy( row.listTallas, ['tal_descripcion'], ['asc'] );
		}
		if( row.listaTallas ) row.listTallas = _.orderBy( row.listaTallas, ['tal_descripcion'], ['asc'] );
		if( row.pro_categoria ) row.pro_categoria = await Tblcategorias.findOne({ where: { id: row.pro_categoria }});
		if( idUser ) {
			if( porcentaje.porcentaje > porcentaje.porcentajePerfil ) row.precio_vendedor = row.pro_uni_venta - ( ( row.pro_uni_venta * porcentaje.porcentaje ) / 100 );
			else {
				if( row.pro_vendedor > 0 ) row.precio_vendedor = row.pro_vendedor;
				else row.precio_vendedor = row.pro_uni_venta - ( ( row.pro_uni_venta * porcentaje.porcentajePerfil ) / 100 );
			}
			if( porcentaje.categoria == "dropshipping básico" ) delete row.precio_vendedor;
		}
    if( validPrice ){
      try { row.pro_uni_venta = ( ( await PriceArticle.findOne( { user: validPrice, article: row.id } ) ).price ) || row.pro_uni_venta; } catch (error) {
        console.log("****ERRORRR",40);
      }
    }

	}
	return res.ok(resultado);
}

Procedures.filtroStock = async( filtro )=>{
	let resultado = Object();

}

Procedures.validadorPrecio = async( idUser )=>{
	let resultado = Object();
	resultado = await Tblusuario.find( { where: { id: idUser } } ).populate('categoriaPerfil');
	resultado = resultado[0];
	if( !resultado ) return {
		porcentajePerfil: 10,
		porcentaje: 10,
		categoria: "dropshipping básico"
	};
	try {
		return {
			porcentajePerfil: resultado.categoriaPerfil.precioPorcentaje,
			porcentaje: resultado.porcentaje,
			categoria: resultado.categoriaPerfil.categoria
		};
	} catch (error) {
		return {
			porcentajePerfil: 10,
			porcentaje: 10,
			categoria: "dropshipping básico"
		};
	}
}

Procedures.ordenar = async ( req, res )=>{
	let params = req.allParams();
	let resultado = Object();
	params.lista = params.lista.reverse();
	for( let row of params.lista ) resultado = await Tblproductos.update( { id: row.id }, { createdAt: new Date() });
	return res.status(200).send( { status:200, data: "Ordenado exitoso" });
}


module.exports = Procedures;

