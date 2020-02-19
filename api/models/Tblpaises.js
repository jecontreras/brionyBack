/**
 * Tblpaises.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    iso:{
        type: 'string'
    },
    nombre:{
        type: 'string'
    },
    imagen:{
        type: 'string'
    },
    codigo:{
        type: 'number'
    }
  },

};

