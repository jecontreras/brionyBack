/**
 * Tblproductosimagen.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    pro_clave_int:{
        type: 'number'
    },
    pri_imagen:{
        type: 'string'
    },
    pri_activo:{
        type: 'number'
    },
    pri_usu_actualiz:{
        type: 'string'
    },
    pri_fec_actualiz:{
        type: 'string'
    }


  },

};

