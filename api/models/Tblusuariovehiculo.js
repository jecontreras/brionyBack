/**
 * Tblusuariovehiculo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    usu_clave_int:{
        type: 'number'    
    },
    uve_placa:{
        type: 'string'
    },
    uve_marca:{
        type: 'string'
    },
    uve_linea:{
        type: 'string'
    },
    uve_modelo:{
        type: 'number'
    },
    uve_cilindrada:{
        type: 'integer'
    },
    uve_color:{
        type: 'string'
    },
    uve_soat:{
        type: 'string'
    },
    uve_soat_company:{
        type: 'string'
    },
    uve_soat_vencimiento:{
        type: 'string'
    },
    uve_tecno:{
        type: 'string'
    },
    uve_tecno_company:{
        type: 'string'
    },
    uve_tecno_vencimiento:{
        type: 'string'
    }

  },

};

