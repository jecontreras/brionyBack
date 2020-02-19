/**
 * Tbltallas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    tal_descripcion:{
        type: 'string'
    },
    tal_tipo:{
        type: 'number'
    },
    tal_sw_activo:{
        type: 'integer'
    }

  },

};

