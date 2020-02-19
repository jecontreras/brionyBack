/**
 * Tblreglas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    reg_monto:{
        type: 'integer'
    },
    reg_horaped:{
        type: 'string'
    },  
    reg_horaent:{
        type: 'string'
    },
    reg_horamax:{
        type: 'string'
    },
    reg_usu_actualiz:{
        type: 'string'
    },
    reg_fec_actualiz:{
        type: 'string'
    }

  },

};

