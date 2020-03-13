/**
 * Categorias.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    categorias:{
      type: 'string'
    },
    invitados:{
      type: 'integer'
    },
    montoRetiro:{
      type: 'integer'
    },
    disablemontoRetiro:{
      type: 'boolean'
    },
    nivelProfundidad:{
      type: 'integer'
    },
    precioNivel:{
      type: 'json'
    }

  },

};

