/**
 * Tblunidades.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    uni_codigo:{
        type: 'string'
    },
    uni_nombre:{
        type: 'string'
    },
    est_clave_int:{
        type: 'number'
    },
    uni_usu_actualiz:{
        type: 'string'
    },  
    uni_fec_actualiz:{
        type: 'string'
    }

  },

};

