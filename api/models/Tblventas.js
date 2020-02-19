/**
 * Tblventas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    usu_clave_int:{
        type: 'number'
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
        type: 'number'
    },
    ven_cantidad:{  
        type: 'number'
    },
    ven_precio:{
        type: 'integer'
    },
    ven_sw_aprobada:{
        type: 'number'
    },
    ven_sw_eliminado:{
        type: 'number'
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
        type: 'string'
    },
    ven_usu_actualiz:{
      type: 'string'  
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
    nombreProducto:{
        type: 'string'
    }
  },

};

