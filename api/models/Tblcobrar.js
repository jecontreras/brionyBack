/**
 * Tblcobrar.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    cob_num_cedula:{
        type: 'string'
    },
    cob_num_celular:{
        type: 'string'
    },
    cob_num_cuenta:{
        type: 'string'
    },
    cob_monto:{
        type: 'integer',
        defaultsTo:0
    },
    cob_metodo:{
        type: 'string'
    },
    cob_descripcion:{
        type: 'string'
    },
    cob_estado:{
        type: 'number',
        defaultsTo:0  // 0 activa, 1 Aprobado, 2, Rechazado, 3, eliminado
    },
    usu_clave_int:{
        model: 'tblusuario'
    },
    cob_fecha_cobro:{
        type: 'string'
    },
    cob_fecha_pago:{
        type: 'string'
    },
    cob_usu_actualiz:{
        type: 'string'
    },
    cob_fec_actualiz:{
        type: 'string'
    },  
    cob_sw_eliminado:{
        type: 'string'
    },
  },

};

