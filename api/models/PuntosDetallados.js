/**
 * PuntosDetallados.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    valor:{
      type: 'integer',
      required: true
    },
    valorAnterior:{
      type: 'integer',
      required: true
    },
    valorTotal:{
      type: 'integer',
      required: true
    },
    usuario:{
      model: 'tblusuario',
      required: true
    },
    venta:{
      model: 'tblventas',
      required: true
    },
    porcentaje:{
      type: 'integer',
      required: true
    },
    tipo:{
      type: 'integer',
      defaultsTo: 0 // 0 entrada 1 salida
    },
    estado:{
      type: 'integer',
      defaultsTo: 0 // 0 activo 1 inactivo
    }

  },

};

