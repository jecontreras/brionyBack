/**
 * Tblsalidas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    sal_fecha:{
        type: 'string'
    },  
    mos_clave_int:{
        type: 'number'  
    },
    sal_cantidad:{
        type: 'integer'
    },
    sal_usu_actualiz:{
        type: 'string'
    },
    sal_fec_actualiz:{
        type: 'string'
    },
    pro_clave_int:{
        type: 'number'
    },
    sal_peso:{
        type: 'integer'
    },
    cla_clave_int:{
        type: 'number'  
    }

  },

};

