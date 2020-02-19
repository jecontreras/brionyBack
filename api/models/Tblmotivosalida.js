/**
 * Tblmotivosalida.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    mos_nombre:{
        type: 'string'
    },
    mos_usu_actualiz:{
        type: 'string'
    },
    mos_fec_actualiz:{
        type: 'string'
    },
    est_clave_int:{
        type: 'number'
    }

  },

};

