/**
 * Tblinventario.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    pro_clave_int:{
        type: 'number'
    },
    inv_entradas:{
        type: 'integer'
    },
    inv_salidas:{
        type: 'integer'
    },
    inv_usu_actualiz:{
        type: 'string'
    },
    inv_fec_actualiz:{
        type: 'string'
    },
    inv_entradas_peso:{
        type: 'string'
    },
    inv_salidas_peso:{
        type: 'string'
    },
    cla_clave_int:{
        type: 'string'
    }
  },

};

