/**
 * Tblproveedorproductos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    prv_clave_int:{
        type: 'number'
    },
    pro_clave_int:{
        type: 'number'
    },
    ppr_compra:{
        type: 'integer'
    },
    ppr_usu_actualiz:{
        type: 'string'
    },
    ppr_fec_actualiz:{
        type: 'string'
    },
    cla_clave_int:{
        type: 'number'
    }

  },

};

