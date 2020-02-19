/**
 * Tblpqr.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    usu_clave_int:{
        type: 'number'
    },
    pqr_tipo:{
        type: 'number'
    },
    pqr_descripcion:{
        type: 'string'
    },
    pqr_usu_actualiz:{
        type: 'string'
    },
    pqr_fec_actualiz:{
        type: 'string'
    },
    pqr_asociado:{
        type: 'number'
    },
    pqr_estado:{
        type: 'number'
    }

  },

};

