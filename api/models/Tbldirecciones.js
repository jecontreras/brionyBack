/**
 * Tbldirecciones.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    usu_clave_int:{
        type: 'number'
    },
    bar_clave_int:{
        type: 'number'  
    },
    dir_descripcion:{
        type: 'string'
    },
    dir_detalle:{
        type: 'string'
    },
    dir_usu_actualiz:{
        type: 'string'  
    },
    dir_fec_actualiz:{
        type: 'string'
    },
    dir_nomenclatura:{
        type: 'string'
    },  
    dir_letra:{
        type: 'string'
    },
    dir_numero1:{
        type: 'string'
    },
    dir_numero2:{
        type: 'string'
    },
    dir_numero:{
        type: 'string'
    },
    dir_tipo:{
        type: 'string'
    },
    dir_tipo_icon:{
        type: 'string'
    },
    dir_latitud:{
        type: 'string'
    },
    dir_longitud:{
        type: 'string'
    },
    dir_real:{
        type: 'string'
    },
    dir_corta:{
        type: 'string'
    },

  },

};

