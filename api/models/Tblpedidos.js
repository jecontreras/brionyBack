/**
 * Tblpedidos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    usu_clave_int:{
        type: 'number'
    },
    dir_clave_int:{
        type: 'number'
    },
    ped_fecha:{
        type: 'string'
    },
    ped_usu_actualiz:{
        type: 'string'
    },
    ped_fec_actualiz:{
        type: 'string'
    },
    ped_total:{
        type: 'integer'
    },
    ped_estado:{
        type: 'number'
    },
    ped_ip:{
        type: 'string'
    },
    ped_telefono:{
        type: 'string'
    },
    ped_domicilio:{
        type: 'integer'
    },
    ped_tiempo_entrega:{
        type: 'string'
    },
    ped_codigo:{
        type: 'string'
    },
    ped_domiciliario:{
        type: 'number'
    },
    ped_inicio:{
        type: 'string'
    },
    ped_final:{
        type: 'string'
    },
    ped_lista_deseo:{
        type: 'number'
    },
    ped_met_pago:{
        type: 'number'
    },
    ped_lista_nombre:{
        type: 'string'
    },
    ped_nota:{
        type: 'string'
    },
    ped_verificado:{
        type: 'number'
    },
    ped_fec_programada:{
        type: 'string'
    },
    ped_hor_programada:{
        type: 'string'
    },

  },

};

