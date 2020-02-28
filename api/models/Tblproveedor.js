/**
 * Tblproveedor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    prv_nro_docum:{
        type: 'string'
    },
    prv_tipo_docum:{
        type: 'string'
    },
    prv_nombre:{
        type: 'string'
    },
    prv_telefono1:{
        type: 'string'
    },  
    prv_telefono2:{
        type: 'string'
    },  
    prv_email:{
        type: 'string'
    },
    prv_direccion:{
        type: 'string'
    },
    prv_activo:{
        type: 'number',
        defaultsTo: 0
    },
    prv_observacion:{
        type: 'string'
    },
    prv_usu_actualiz:{
        type: 'string'
    },
    prv_fec_actualiz:{
        type: 'string'
    }

  },

};

