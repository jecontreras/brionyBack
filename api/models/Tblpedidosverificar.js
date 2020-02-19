/**
 * Tblpedidosverificar.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    pro_clave_int:{
        type: 'number'
    },
    cla_clave_int:{
        type: 'number'
    },
    pev_tamano:{
        type: 'string'
    },
    pev_maduracion:{
        type: 'string'
    },
    pev_fecha:{
        type: 'string'
    },
    pev_estado:{
        type: 'number'
    },
    pev_usu_actualiz:{
        type: 'string'
    },
    pev_fec_actualiz:{
        type: 'string'
    }

  },

};

