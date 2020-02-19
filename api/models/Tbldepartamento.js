/**
 * Tbldepartamento.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    dep_nombre:{
        type: 'string'
    },
    dep_usu_actualiz:{
        type: 'string'
    },
    dep_fec_actualiz:{
        type: 'string'
    },
    est_clave_int:{
        type: 'number'
    },
  },

};

