/**
 * Tblpreciostmp.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    mer_clave_int:{
        type: 'number'
    },
    cla_clave_int:{
        type: 'number'
    },
    valor:{
        type: 'integer'
    },
    peso_unidad:{
        type: 'integer'
    }

  },

};

