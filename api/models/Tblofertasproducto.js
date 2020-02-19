/**
 * Tblofertasproducto.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    pro_clave_int:{
        type: 'number'
    },
    ofp_usu_actualiz:{
        type: 'string'
    },
    ofp_fec_actualiz:{
        type: 'string'
    },
    ofe_clave_int:{
        type: 'number'
    }
  },

};

