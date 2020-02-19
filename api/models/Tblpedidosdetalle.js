/**
 * Tblpedidosdetalle.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    mer_clave_int:{
        type: 'number'
    },
    cla_clave_int:{
        type: 'number'
    },
    pro_clave_int:{
        type: 'number'
    },
    pde_cantidad:{
        type: 'integer'
    },
    pde_valor:{
        type: 'integer'
    },
    pde_usu_actualiz:{
        type: 'string'
    },
    pde_fec_actualiz:{
        type: 'string'  
    },
    pde_descuento:{
        type: 'integer'
    },
    pde_estado:{
        type: 'string'
    },
    pde_key:{
        type: 'string'
    },
    ped_clave_int:{
        type: 'number'
    },
    pde_tamano:{
        type: 'string'
    },
    pde_cantidad_unidad:{
        type: 'integer'
    },  
    pde_cantidad_peso:{
        type: 'integer'
    },
    pde_unidad:{
        type: 'integer'
    },
    pde_minimo:{
        type: 'integer'
    },
    pde_codigo:{
        type: 'string'
    },  
    pde_confirmado:{
        type: 'number'
    }

  },

};

