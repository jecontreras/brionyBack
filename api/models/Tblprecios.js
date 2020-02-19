/**
 * Tblprecios.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    pro_clave_int:{
        type: 'number'
    },
    pre_costo:{
        type: 'integer'
    },
    pre_venta:{
        type: 'integer'
    },
    pre_activo:{
        type: 'number'
    },
    pre_usu_actualiz:{
        type: 'string'
    },
    pre_fec_actualiz:{
        type: 'string'
    },
    pre_ganancia:{
        type: 'integer'
    }

  },

};

