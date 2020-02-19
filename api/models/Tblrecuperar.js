/**
 * Tblrecuperar.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    rec_codigo:{
        type: 'string'
    },
    usu_clave_int:{
        type: 'number'
    },
    rec_estado:{
        type: 'number'  
    }

  },

};

