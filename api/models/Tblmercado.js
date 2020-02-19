/**
 * Tblmercado.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    mer_nombre:{
        type: 'string'
    },
    mer_descripcion:{
        type: 'string'
    },
    mer_activo:{ 
        type: 'integer',
        defaultsTo: 0
    },
    mer_usu_actualiz:{
        type: 'string'
    },
    mer_fec_actualiz:{
        type: 'string'
    },
    mer_clasificacion:{
        type: 'string'
    },
    mer_tamano:{
        type: 'number',
        defaultsTo: 0
    },
    mer_porcentaje:{
        type: 'integer',
        defaultsTo: 0
    },
    mer_cla_default:{
        type: 'integer',
        defaultsTo: 0
    }
  },

};

