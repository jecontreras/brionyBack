/**
 * Tblbarrio.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    bar_nombre: {
        type: 'string'
    },
    est_clave_int: {
        type: 'integer',
        defaultsTo: 0
    },
    bar_usu_actualiz:{
        type: 'integer',
        defaultsTo: 0
    },
    bar_fec_actualiz:{
        type: 'number', autoUpdatedAt: true,
    },
    sec_clave_int:{
        type: 'integer',
        defaultsTo: 0
    }
  },

};

