/**
 * Tblproveedorentradas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    pro_clave_int:{
        type: 'number'
    },
    pve_cantidad:{
        type: 'integer'
    },
    pve_usu_actualiz:{
        type: 'string'
    },
    pve_fec_actualiz:{
        type: 'string'
    },
    prv_clave_int:{
        type: 'number'
    },
    pve_peso:{
        type: 'integer'
    },  
    pve_real:{
        type: 'integer'
    },
    pve_medida:{
        type: 'number'
    },
    cla_clave_int:{
        type: 'number'
    }
  },

};

