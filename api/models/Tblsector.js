/**
 * Tblsector.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    sec_nombre:{
        type: 'string'
    },
    est_clave_int:{
        type: 'integer'
    },
    sec_usu_actualiz:{
        type: 'string'
    },
    sec_fec_actualiz:{
        type: 'string'
    },
    sec_horas:{
        type: 'integer'
    },
    sec_minutos:{
        type: 'integer'
    },
    sec_domicilio:{
        type: 'integer'
    },
    mun_clave_int:{
        type: 'number'
    },
    sec_monto:{
        type: 'integer'
    }

  },

};

