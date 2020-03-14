let Procedures = Object();
const moment = require('moment');

////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.nivelUser = async ( data )=>{
    let params = data //.allParams();
    //if(params.where) params = params.where;
    if( !params.id ) return {};
    let resultado = Object();
    let countUser = Number();
    // consulta el usuario
    let user = await Tblusuario.findOne({ id: params.id }).populate('nivel');
    // Buscar el nivel primero jade
    let nivel = await Procedures.getNivel();
    // miro cuantos referidos tengo activos
    resultado = await Procedures.findReferidos( params, nivel.id );
    for(let row of resultado){
      countUser+= await Procedures.validarNivel(row);
    }
    //console.log("************",user);
    if( !user.nivel ) { user.nivel = nivel; await Procedures.asignandoleNivel(user, countUser); }
    if( !user.nivel.id ) await Procedures.asignandoleNivel(user, countUser);
    else {
  
      let miNivelProx = await Procedures.getMiNivel( countUser );
      user.nivel = miNivelProx;
      await Procedures.asignandoleNivel(user);
      
    }
    // return res.status(200).send({data: user});
    return user.nivel;
  
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.getMiNivel = async( countUser )=>{
  let resultado = await Categorias.find( { where:{ invitados: { '>=': 0,'<=': countUser } }, sort: 'invitados DESC' } );
  //console.log("**** mi nivel", resultado);
  return resultado[0];

}

////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.asignandoleNivel = async( data )=>{
  let resultado = Object();
  resultado = await Tblusuario.update({ id:data.id }, { nivel:data.nivel.id }); //.fetch();
  //console.log(resultado);
  return resultado;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.getNivel = async( )=>{
  let resultado = Object();
  resultado = await Categorias.findOne( { where:{ categorias: 'jade' } });
  //console.log("**********+++", resultado)
  return resultado;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.findReferidos = async( data, nivel )=>{
  let resultado = Array();
  resultado = await Tblusuario.find({ where:{ cabeza:data.id, nivel: { '!=': nivel } } });
  return resultado;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.validarNivel = async( data )=>{
    let resultado = Object();
    let fechaAtras = new moment().add(-16,'days');
    let fechaHoy = new moment().add(1,'days');
    //console.log("*****",new moment(fechaHoy).format('DD-MM-YYYY HH:MM:SS'))
    resultado = await Tblventas.findOne({ 
      where:{ 
        usu_clave_int: data.id,
        create:{
          ">": new moment(fechaAtras).format('YYYY-MM-DD'),
          "<": new moment(fechaHoy).format('YYYY-MM-DD')
        },
        ven_estado: 1
      }
    });
    if(!resultado) return 0;
    else return 1;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.updateCabeza = async( venta )=>{
  let resultado = Object();
  venta = await Tblventas.findOne( { id: venta.id });
  //console.log( "*****", venta );
  let userGet = await Tblusuario.findOne({ id: venta.usu_clave_int });
  if(!userGet) return {};
  for(let i = 1; i <= 5; i++){
    if( !userGet.cabeza ) break;
    resultado = await Procedures.buscarCabeza( userGet.cabeza );
    //console.log("corriendo", i, resultado)
    if(!resultado.nivel) continue;
    if( resultado.nivel.nivelProfundidad >= i ){
      let gananciasSubmit = await Procedures.submitGanancias( resultado, venta, i );
    }
    userGet.cabeza = resultado.cabeza;
  }
  await Tblventas.update({ id: venta,id }, { ven_comizionCabeza:true });
  return {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.submitGanancias = async( user, venta, profundidad )=>{
  let comision = user.nivel.precioNivel.find( row => Number( row.profundidad ) == Number( profundidad ) );
  if(!comision) return {};
  venta = {
    id: venta.id,
    ven_ganancias: ( Number( venta.ven_ganancias ) * Number( comision.valor ) ) / 100
  }
  return await Procedures.procesoGanacias( user, venta, comision );
}

Procedures.procesoGanacias = async ( user, venta, comision )=>{
  let resultado = Object();
  let data = {
    usuario: user.id,
    venta: venta.id,
    porcentaje: comision.valor,
    tipo: 0,
    estado: 0,
    valor: venta.ven_ganancias,
    valorAnterior: 0,
    valorTotal: 0
  };
  data.valorTotal = data.valor;
  data = await Procedures.getPuntosDetallados( data );
  await Procedures.createPuntosDetallados( data );
  data.valor = data.valorTotal;
  await Procedures.createPuntos( data );
  //console.log( "*****", resultado );
  return resultado;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.getPuntosDetallados = async ( data )=>{
  let  resultado = Object();
  resultado = await PuntosDetallados.find({ where:{ usuario: data.usuario, estado:0 }, sort: 'id DESC' });
  resultado = resultado[0];
  if(resultado) {
    data.valorAnterior = resultado.valorTotal;
    data.valorTotal = data.valorAnterior + data.valor;
  }
  return data;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.createPuntosDetallados = async( data )=>{
  let  resultado = Object();
  resultado = await PuntosDetallados.create(data).fetch();
  return resultado;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.createPuntos = async( data )=>{
  let  resultado = Object();
  resultado = await Puntos.findOne({ usuario: data.usuario });
  if(!resultado) resultado = await Puntos.create(data).fetch();
  else resultado = await Puntos.update({id: resultado.id}, data).fetch();
  return resultado;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.buscarCabeza = async( cabeza )=>{
  let resultado = Object();
  //console.log( "cabeza", cabeza);
  resultado = await Tblusuario.findOne({ where:{id: cabeza} });
  resultado.nivel = await Procedures.nivelUser( resultado );
  return resultado;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
Procedures.descontandoPuntos = async( data )=>{
  let resultado = Object();
  resultado = await PuntosDetallados.find({ where:{ usuario: data.usu_clave_int, estado:0 }, sort: 'id DESC' });
  resultado = resultado[0];
  let query = {
    usuario: data.usu_clave_int,
    venta: 1,
    porcentaje: 0,
    tipo: 1,
    estado: 0,
    valor: resultado.valorAnterior,
    valorAnterior: resultado.valorAnterior,
    valorTotal: 0
  };
  resultado = await PuntosDetallados.create( query );
  resultado = await Puntos.update({ usuario: data.usu_clave_int }, { usuario: data.usu_clave_int, valor: 0, tipo: 1 }); 
  return 'ok';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = Procedures;
////////////////////////////////////////////////////////////////////////////////////////////////////////