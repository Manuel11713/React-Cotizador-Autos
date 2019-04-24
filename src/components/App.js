import React,{Component} from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Resumen from './Resumen';
import Resultado from './Resultado';
import {obtenerDiferenciaAnio,calcularMarca,obtenerPlan} from '../Helpers'

class App extends Component{

  state ={
    resultado: '',
    datos:{}
  }
  
  cotizarSeguro=(datosHijo)=>{//con esta funcion obtenemos los datos del hijo
    const {marca,plan,year} = datosHijo;
    //Agregar una base de $2000;
    let resultado = 2000;
    //Obtener la difrencia de años
    const difrencia =  obtenerDiferenciaAnio(year);
    //y por cada año restar el 3%;
    resultado -= ((difrencia*3)*resultado)/100;
    //Americano 15%, Asiatico 5%, y Europeo 30% de aumento en el costo del seguro;
    resultado *= calcularMarca(marca);
    //Para el plan Basico incrementa un 20% y para el plan completo incrementa un 50%.
    resultado *= obtenerPlan(plan);
    resultado = resultado.toFixed(2);//que solo imprima 2 decimales


    this.setState({
      resultado,
      datos:datosHijo
    });
  }


  render(){
    return (
      <div className="contenedor">
          <Header titulo='Cotizador de Seguro de Auto'/>

          <div className="contenedor-formulario">
            <Formulario
              cotizarSeguro={this.cotizarSeguro}
            />
            <Resumen
              datos ={this.state.datos}
              resultado = {this.state.resultado}
            />
            <Resultado
                resultado={this.state.resultado}
               />
          </div>
      </div>
    )
  }
}

export default App;
