/**
 * Tblproductosimagen.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      
    pri_imagen:{
        type: 'string'
    },
    producto:{
        model: "tblproductos"
    }


  },

};

