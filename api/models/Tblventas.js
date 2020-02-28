/**
 * Tblventas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    usu_clave_int:{
        model: 'tblusuario'
    },  
    ven_nombre_cliente:{
        type: 'string'
    },
    ven_telefono_cliente:{
        type: 'string'
    },
    ven_direccion_cliente:{
        type: 'string'
    },
    ven_fecha_venta:{
        type: 'string'
    },
    ven_tipo:{
        type: 'string'
    },
    pro_clave_int:{
        model: 'tblproductos'
    },
    ven_cantidad:{  
        type: 'number'
    },
    ven_precio:{
        type: 'integer'
    },
    ven_total:{
        type: 'integer',
        defaultsTo: 0
    },
    ven_ganancias:{
        type: 'integer',
        defaultsTo: 0
    },
    ven_retirado: {
        type: 'boolean', defaultsTo: false,
    },
    ven_sw_aprobada:{
        type: 'number',
        defaultsTo: 0    //2 aceptado  
    },
    ven_sw_eliminado:{
        type: 'number',
        defaultsTo: 0  //1 eliminado
    },
    ven_imagen_producto:{
        type: 'string'
    },
    ven_imagen_conversacion:{
        type: 'string'
    },
    ven_motivo_rechazo:{
        type: 'string'
    },
    ven_usu_creacion:{
        model: 'tblusuario'
    },
    ven_usu_actualiz:{
        model: 'tblusuario'
    },
    ven_fec_creacion:{
        type: 'string'
    },
    ven_fec_actualiz:{
        type: 'string'
    },  
    ven_tallas:{
        type: 'string'
    },
    ven_estado:{
        type: 'integer',
        defaultsTo: 0
    },
    nombreProducto:{
        type: 'string'
    },
    ven_observacion:{
        type: 'string'
    },
  },

};

