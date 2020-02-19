/**
 * Tblmunicipio.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    mun_nombre:{
        type: 'string'
    },
    dep_clave_int:{ 
        type:  'number'
    },
    mun_usu_actualiz:{
        type: 'string'
    },
    mun_fec_actualiz:{
        type: 'string'
    },
    est_clave_int:{
        type: 'number'
    }
  },

};

