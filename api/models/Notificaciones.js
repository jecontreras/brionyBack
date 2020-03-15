/**
 * Notificaciones.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    titulo:{
      type: 'string'
    },
    descripcion:{
      type: 'string'
    },
    venta:{
      model: 'tblventas'
    },
    view:{
      type: 'boolean',
      defaultsTo: false
    },
    user:{
      model: 'tblusuario'
    }

  },

};

