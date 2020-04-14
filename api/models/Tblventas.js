/**
 * Tblventas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 const moment = require('moment');
module.exports = {

  attributes: {

    usu_clave_int:{
        model: 'tblusuario',
        required: true
    },  
    create:{
        type: 'string',
        required: true
    },
    ven_nombre_cliente:{
        type: 'string',
        required: true
    },
    ven_telefono_cliente:{
        type: 'string',
        required: true
    },
    ven_ciudad:{
        type: 'string'
    },
    ven_direccion_cliente:{
        type: 'string',
        required: true
    },
    ven_fecha_venta:{
        type: 'string',
        required: true
    },
    ven_tipo:{
        type: 'string',
        required: true
    },
    pro_clave_int:{
        model: 'tblproductos'
    },
    ven_cantidad:{  
        type: 'number'
    },
    ven_precio:{
        type: 'integer',
        required: true
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
        type: 'string'
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
        defaultsTo: 0 // 0 activa, 1 Aprobado, 2, Rechazado, 3, eliminado, 4 Factura Automatica de puntos
    },
    nombreProducto:{
        type: 'string'
    },
    cob_num_cedula_cliente:{
        type: 'string'
    },
    ven_observacion:{
        type: 'string'
    },
    ven_comizionCabeza:{
        type: 'boolean',
        defaultsTo: false
    },
    ven_barrio:{
        type: 'string'
    },
    ven_numero_guia:{
        type: 'string'
    },
    ven_imagen_guia:{
        type: 'string'
    }
  },
  afterCreate:(valuesToSet, proceed)=>{
    console.log("values", valuesToSet)
      valuesToSet.create = new moment().format('DD-MM-YYYY');
    return proceed();
  },
  beforeUpdate:(valuesToSet, proceed)=>{
      console.log("values", valuesToSet)
      if( valuesToSet.ven_estado == 1 && !valuesToSet.ven_comizionCabeza ) NivelServices.updateCabeza(valuesToSet);
    return proceed();
  }
};

