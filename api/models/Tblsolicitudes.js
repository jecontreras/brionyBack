/**
 * Tblsolicitudes.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    sol_ip:{
        type: 'string'
    },
    usu_clave_int:{
        type: 'number'
    },
    sol_productos:{
        type: 'string'
    },
    sol_fecha_solicitud:{
        type: 'string'
    }

  },

};

