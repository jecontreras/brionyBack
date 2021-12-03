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
		if (row.pro_sw_tallas) {
			row.listTallas = await Tbltallas.find({ tal_tipo: row.pro_sw_tallas });
			row.listTallas = _.orderBy(row.listTallas, ['tal_descripcion'], ['asc']);
		}
		if (row.pro_categoria) row.pro_categoria = await Tblcategorias.findOne({ where: { id: row.pro_categoria } });
	}
	return res.ok(resultado);
}
Procedures.tridy = async (req, res) => {
//Procedures.querys = async (req, res) => {
	let params = req.allParams();
	let resultado = Object();

	resultado = await Procedures.provedor();
	let data1 = [];
	data1.push( resultado[0] );
	data1.push( resultado[1] );
	data1.push( resultado[2] );
	data1.push( resultado[3] );
	data1.push( resultado[4] );
	data1.push( resultado[5] );
	data1.push( resultado[6] );
	data1.push( resultado[7] );
	data1.push( resultado[8] );
	data1.push( resultado[9] );
	data1.push( resultado[10] );
	data1.push( resultado[11] );
	data1.push( resultado[12] );
	data1.push( resultado[13] );
	data1.push( resultado[14] );
	data1.push( resultado[15] );
	data1.push( resultado[16] );
	for( let row of data1 ){
		//console.log("*********", row)
		row.articulos = await Procedures.articuloProvedor( row.id_tienda );
	}
	/*resultado = await Procedures.getArticulos();
	let finix = [];
	for (let row of resultado) {
		let data = {
			"id": row.id_producto,
			"pro_nombre": row.nombre,
			"foto": row.url,
			"pro_descripcion": "disponibles desde la talla 36 a la talla 43 echos en material sintético de muy buena calidad",
			"cat_clave_int": 0,
			"pro_activo": 0,
			"pro_mostrar_agotado": 0,
			"pro_descripcionbreve": "",
			"pro_codigo": "3DBG1F",
			"pro_usu_creacion": 0,
			"pro_usu_actualiz": "",
			"pro_fec_actualiz": "",
			"pro_uni_compra": 0,
			"pro_pes_compra": 0,
			"pro_unidad_disponible": 0,
			"pro_mu_compra": 0,
			"pro_mp_compra": 0,
			"pro_uni_venta": 50000,
			"pro_pes_venta": 0,
			"pro_mu_venta": 0,
			"pro_mp_venta": 0,
			"pro_reserva": 0,
			"pro_estado": 0,
			"pro_tamano": 0,
			"pro_kilo": 0,
			"pro_und_kilo": 0,
			"pro_precio_venta_cliente": 0,
			"tit_clave_int": 0,
			"listColor": null,
			"checkMayor": 0,
			"listPrecios": null,
			"pro_categoria": row.id_categoria,
			"pro_sw_tallas": 3
		}
		await Tblproductos.create( data ).fetch();
		finix.push( data );
	}*/
	for (let row of data1 ){
		for( let key of row.articulos ){
			let detalle = ( await Procedures.getArticulosDetalles( key.id_producto ) ) || false;
			detalle = detalle[0];
			console.log("*************", detalle )
			let data = {
				"id": detalle.id_producto,
				"pro_nombre": detalle.nombre,
				"foto": detalle.imagen,
				"pro_descripcion": detalle.descripcion + "  "+ detalle.modo_uso || '',
				"cat_clave_int": 0,
				"pro_activo": 0,
				"pro_mostrar_agotado": 0,
				"pro_descripcionbreve": "",
				"pro_codigo": "3DBG1F",
				"pro_usu_creacion": 0,
				"pro_usu_actualiz": "",
				"pro_fec_actualiz": "",
				"pro_uni_compra": 0,
				"pro_pes_compra": 0,
				"pro_unidad_disponible": 0,
				"pro_mu_compra": 0,
				"pro_mp_compra": detalle.costo,
				"pro_uni_venta": detalle.precio_venta,
				"pro_marca": detalle.tiendas_que_lo_venden, // empresa que lo vende
				"pro_pes_venta": 0,
				"pro_mu_venta": detalle.total_vendidos, // total vendios
				"pro_mp_venta": 0,
				"pro_reserva": 0,
				"pro_estado": 0,
				"pro_tamano": detalle.alto,
				"pro_kilo": 0,
				"pro_und_kilo": 0,
				"pro_precio_venta_cliente": 0,
				"tit_clave_int": 0,
				"listColor": null,
				"checkMayor": 0,
				"listPrecios": null,
				"pro_categoria": detalle.id_categoria,
				"pro_sw_tallas": 3
			}
			await Tblproductos.create( data ).fetch();
		}
	}
	return res.status(200).send({ status: 200, data: data1 });

}

Procedures.getArticulos = async () => {
	let resultado = Array();
	let url = `https://triidy.info/serviciosTriidy/Servicio.asmx/GetProductosPrivados?id_tienda=9289&token=jq2gh66o6dxr.54&codigo_pais=57`;
	let headers = {
		'authority': 'triidy.info',
		'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
		'accept': 'application/json, text/plain, */*',
		'sec-ch-ua-mobile': '?0',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
		'sec-ch-ua-platform': '"Windows"',
		'origin': 'https://triidy.com',
		'sec-fetch-site': 'cross-site',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'referer': 'https://triidy.com/',
		'accept-language': 'es-US,es-419;q=0.9,es;q=0.8,en;q=0.7,und;q=0.6,pl;q=0.5,pt;q=0.4',
		'Cookie': 'AWSALB=ZJvDw6oRA6uP2RQJRGQB8IgQP4a3ES4NyPsC3u8gdYnUJ2/prU4sfvnOI0wlI8m3MLFON4PfZ4cV6T1QvD5CAeVw1DIvQJyvc7wZeWn5IYugdI+Ne5fzDuOwDbFf; AWSALBCORS=ZJvDw6oRA6uP2RQJRGQB8IgQP4a3ES4NyPsC3u8gdYnUJ2/prU4sfvnOI0wlI8m3MLFON4PfZ4cV6T1QvD5CAeVw1DIvQJyvc7wZeWn5IYugdI+Ne5fzDuOwDbFf'
	};

	resultado = await HttpService.request(url, "", false, headers, {}, 'GET');
	//console.log("************", resultado)
	try {
		return JSON.parse(resultado) || [];
	} catch (error) {
		return [];
	}
}

Procedures.provedor = async () => {
	let resultado = Object();

	let url = "https://triidy.info/serviciosTriidy/Servicio.asmx/GetProveedor?id_tienda=9289&token=jq2gh66o6dxr.54&nombre_pais=Colombia";
	let headers = {
		'authority': 'triidy.info',
		'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
		'accept': 'application/json, text/plain, */*',
		'sec-ch-ua-mobile': '?0',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
		'sec-ch-ua-platform': '"Windows"',
		'origin': 'https://triidy.com',
		'sec-fetch-site': 'cross-site',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'referer': 'https://triidy.com/',
		'accept-language': 'es-US,es-419;q=0.9,es;q=0.8,en;q=0.7,und;q=0.6,pl;q=0.5,pt;q=0.4',
		'Cookie': 'AWSALB=qGd/r1WqIzco1IfrDbdXvqA9bX8C545Ifpuavrluef1Z6lwIjLgdhQuVlhetxIyo0UvWAksU6zpuKwbA+pvXXzfywJIcdu0Ld9n7fhqpvQ0XMilmhvQ+lYmysiRn; AWSALBCORS=qGd/r1WqIzco1IfrDbdXvqA9bX8C545Ifpuavrluef1Z6lwIjLgdhQuVlhetxIyo0UvWAksU6zpuKwbA+pvXXzfywJIcdu0Ld9n7fhqpvQ0XMilmhvQ+lYmysiRn'
	};

	resultado = await HttpService.request(url, "", false, headers, {}, 'GET');
	return JSON.parse(resultado) || [];


}

Procedures.articuloProvedor = async (id) => {
	let resultado = Object();
	let url = `https://triidy.info/serviciosTriidy/Servicio.asmx/GetCatalogo?id_proveedor=${id}&id_tienda_logueada=9289&token=jq2gh66o6dxr.55&tipo=Tienda&codigo_pais=57`;
	let headers = {
		'authority': 'triidy.info',
		'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
		'accept': 'application/json, text/plain, */*',
		'sec-ch-ua-mobile': '?0',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
		'sec-ch-ua-platform': '"Windows"',
		'origin': 'https://triidy.com',
		'sec-fetch-site': 'cross-site',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'referer': 'https://triidy.com/',
		'accept-language': 'es-US,es-419;q=0.9,es;q=0.8,en;q=0.7,und;q=0.6,pl;q=0.5,pt;q=0.4',
		'Cookie': 'AWSALB=dYYkSJGLyuBBv+P5MLs74O8rrwYiv7zoSOUUJCXGuswCsmiUarqkStPijJN12NPcdtnZxIvyKFleoOY2iimpnKLU+qYqeqazwLTfqQDlZASOAqQNqSivnE2jf3pi; AWSALBCORS=dYYkSJGLyuBBv+P5MLs74O8rrwYiv7zoSOUUJCXGuswCsmiUarqkStPijJN12NPcdtnZxIvyKFleoOY2iimpnKLU+qYqeqazwLTfqQDlZASOAqQNqSivnE2jf3pi'
	};

	resultado = await HttpService.request(url, "", false, headers, {}, 'GET');
	//console.log("************", resultado)
	try {
		return JSON.parse(resultado) || [];
	} catch (error) {
		return [];
	}
}

Procedures.getArticulosDetalles = async ( id ) => {
	let resultado = Array();
	let url = `https://triidy.info/serviciosTriidy/Servicio.asmx/GetProducto?id=${ id }&token=jq2gh66o6dxr.54`;
	let headers = {
		'authority': 'triidy.info',
		'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
		'accept': 'application/json, text/plain, */*',
		'sec-ch-ua-mobile': '?0',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
		'sec-ch-ua-platform': '"Windows"',
		'origin': 'https://triidy.com',
		'sec-fetch-site': 'cross-site',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		'referer': 'https://triidy.com/',
		'accept-language': 'es-US,es-419;q=0.9,es;q=0.8,en;q=0.7,und;q=0.6,pl;q=0.5,pt;q=0.4',
		'Cookie': 'AWSALB=zxWPPHJxI34x1dwlAbTIPJS20zfRXSt44edXE7hna0IFsBP6NHXhpA8b1XqKDvqe5CH3HpfR0JEAQIiBs7pVvb+kQMK6uy02k1EC4LytKRpmvy6RB5KPItZGs3UG; AWSALBCORS=zxWPPHJxI34x1dwlAbTIPJS20zfRXSt44edXE7hna0IFsBP6NHXhpA8b1XqKDvqe5CH3HpfR0JEAQIiBs7pVvb+kQMK6uy02k1EC4LytKRpmvy6RB5KPItZGs3UG'
	};

	resultado = await HttpService.request(url, "", false, headers, {}, 'GET');
	//console.log("************", resultado)
	try {
		return JSON.parse(resultado) || [];
	} catch (error) {
		return [];
	}
}

module.exports = Procedures;

