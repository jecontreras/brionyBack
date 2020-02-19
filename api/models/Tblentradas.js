/**
 * Tblentradas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    ent_fecha:{
        type: 'string'
    },
    ent_cantidad:{
        type: 'integer',
        defaultsTo: 0
    },
    ent_valor:{
        type: 'integer',
        defaultsTo: 0      
    },
    pro_clave_int:{
        type: 'number'
    },
    ent_usu_actualiz:{
        type: 'string'
    },
    ent_fec_actualiz:{
        type: 'string'
    },
    tie_clave_int:{
        type: 'number'
    },
    prv_clave_int:{
        type: 'number'
    },
    ent_peso:{
        type: 'integer'
    },
    ent_real:{
        type: 'integer'      
    },
    ent_medida:{
        type: 'number'
    },
    cla_clave_int:{
        type: 'number'  
    },
    ent_pes_unidad:{
        type: 'integer'
    }
  },

};

