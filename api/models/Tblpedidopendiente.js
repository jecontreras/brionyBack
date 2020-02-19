/**
 * Tblpedidopendiente.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    pro_clave_int:{
        type: 'number'
    },  
    pep_cantidad:{
        type: 'number'
    },
    pep_fecha:{
        type: 'string'
    },
    pep_ip:{
        type: 'string'
    },
    pep_id_tienda:{
        type: 'number'
    },
    pep_tallas:{
        type: 'string'
    }
  },

};

