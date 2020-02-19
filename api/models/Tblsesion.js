/**
 * Tblsesion.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    usu_clave_int:{
        type: 'number'
    },
    ses_inicio:{
        type: 'string'
    },
    ses_fin:{
        type: 'string'
    },
    ses_activo:{
        type: 'number'
    },
    ses_ip:{
        type: 'string'
    }

  },

};

