/**
 * Tblpreciosmercado.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    pro_clave_int:{
        type: 'number'
    },
    mer_clave_int:{
        type: 'number'
    },
    cla_clave_int:{
        type: 'number'
    },
    prm_ganancia:{
        type: 'integer'
    },
    prm_venta:{
        type: 'integer'
    },
    prm_usu_actualiz:{
        type: 'string'
    },
    prm_activo:{
        type: 'number'
    },
    prm_fec_actualiz:{
        type: 'string'
    },
    prm_costo:{
        type: 'integer'
    },  
    prm_peso_unidad:{
        type: 'integer'
    },
    usu_clave_int:{
        type: 'number'
    },
    prm_estado:{
        type: 'number'
    }

  },

};

