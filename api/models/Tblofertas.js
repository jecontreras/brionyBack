/**
 * Tblofertas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    ofe_titulo:{
        type: 'string'
    },
    ofe_descripcion:{
        type: 'string'  
    },
    ofe_inicio:{
        type: 'string'
    },
    ofe_fin:{
        type: 'string'
    },
    ofe_tipo_descuento:{
        type: 'number'
    },
    ofe_descuento:{
        type: 'integer'
    },
    ofe_estado:{
        type: 'number'
    },
    ofe_hor_inicio:{
        type: 'string'
    },
    ofe_hor_fin:{
        type: 'string'
    },
    ofe_usu_actualiz:{
        type: 'string'
    },
    ofe_fec_actualiz:{
        type: 'string'
    },
    ofe_imagen:{
        type: 'string'
    },
    ofe_excento_domicilio:{
        type: 'number'
    },
    mer_clave_int:{
        type: 'number'
    }
  },

};

