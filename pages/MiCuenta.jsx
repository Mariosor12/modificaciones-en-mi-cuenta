import React, {Component} from 'react';

import NaturalClient from '../components/NaturalClient'
import CompanyClient from '../components/CompanyClient'
import client1 from '../images/client1.png'
import Banner from '../components/Banner.jsx'
import Footer from '../components/Footer.jsx'
import axios from 'axios'

function validarTelefonoContacto(numero, rif){
  return axios.post('/read/telefonoContactoCliente', {
          telefono: numero,
          foreignKey: rif
        }).then((response)=> {
          return response.data[0].id
        }).catch(function (error) {
          console.log('AXIOS error: '+ error);
          return 'error'
        })
}

function foundDirecciones(arrayDireccion, arrayType){
  return axios.get('/read/direcciones')
  .then((response) => {
    return axios.get('/read/direccionPorNombreTipo',{
      params: {
        nombre: arrayDireccion[0],
        tipo: arrayType[0]
      }
    })
    .then((response)=>{
      return recursiveComparar(response.data, arrayType, arrayDireccion,1,response.data[0].clave)
    })
    .catch(function (error){
      console.log('AXIOS error: '+ error);
      alert('Error al buscar el Estado')
      return false
    })
  })
  .catch(function (error) {
  console.log('AXIOS error: '+ error);
  alert('Error al buscar las diercciones')
  return false
  });
}
function recursiveComparar(data, arrayType, arrayDireccion, i,foreign){
  console.log(arrayType[i], arrayDireccion[i],arrayDireccion, i, foreign)
    return axios.get('/read/direccionPorNombreTipoFK',{
      params: {
        nombre: arrayDireccion[i],
        tipo: arrayType[i],
        fk_direccion: foreign
      }
    }).then((response)=>{
      if((response.data.length>0)&&(i < arrayDireccion.length)){
        console.log('Existe')
        if(response.data[0].tipo !== 'Ciudad') foreign = response.data[0].clave
        return recursiveComparar(data,arrayType,arrayDireccion, i+1, foreign)
      }
      else {
        console.log("FINAL: "+foreign)
        return foreign
      }
    }).catch(function (error) {
      console.log('AXIOS error: '+ error);
      alert('Error al obtener la dirección')
      return false
    })
}

class MiCuenta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {id: '', nombre: '', contrasena: ''},
      NaturalData: {
        rif: "", ci: "", name: "", lastName: "", gender: "",
        email: "", bornDate: "",
        HomeAddress: {state:"", city:"", municipality:"", parish:"", homeAvenue:"",
                      homeBuilding:"", homeFloor:"", homeOffice:"", homeApartment:""},
        telephoneNumber: "", cellphoneNumber: "", officeNumber: ""
      },
      CompanyData: {
        rif: "", comercialDesignation: "", businessName: "",
        username: "", password: "", email: "", webPage: "", capital: "",
        telephone1: "", telephone2: "", telephone3: "",  ContactPerson:{ nameContact: "", numberContact: "" },
        FiscalAddress: {state:"", city:"", municipality:"", parish:"", fiscalAvenue:"",
                        fiscalBuilding:"", fiscalFloor:"", fiscalOffice:"", fiscalApartment:""},
        MainAddress: {state:"", city:"", municipality:"", parish:"", mainAvenue:"",
                        mainBuilding:"", mainFloor:"", mainOffice:"", mainApartment:""}
      },
      isLoggedIn:false,
			naturalClient: true,
    }

    this.handleHomeAddress = this.handleHomeAddress.bind(this);
  this.handleHomeState = this.handleHomeState.bind(this);
  this.handleHomeCity = this.handleHomeCity.bind(this);

  this.handleCompanyEmail = this.handleCompanyEmail.bind(this);
  this.handleCompanyPassword = this.handleCompanyPassword.bind(this);
  this.handleCompanyInput = this.handleCompanyInput.bind(this);
  this.handleContactPerson = this.handleContactPerson.bind(this);
  this.handleFiscalAddress = this.handleFiscalAddress.bind(this);
  this.handleFiscalState = this.handleFiscalState.bind(this);
  this.handleFiscalCity = this.handleFiscalCity.bind(this);
  this.handleMainAddress = this.handleMainAddress.bind(this);
  this.handleMainState = this.handleMainState.bind(this);
  this.handleMainCity = this.handleMainCity.bind(this);
  this.isLoggedIn = this.isLoggedIn.bind(this)
  }

  componentWillMount() {
    axios.get('/read/userInfo',{withCredentials: true
    })
    .then((res)=> { // handle success
      console.log('Callback Axios con Data del Usuario')
      console.log(res.data)
      this.setState({userData: res.data, isLoggedIn:true})
      return this.state.userData.id
    })
    .then((res)=>{
    	return axios.get('/read/clientePorUserId',{
        params: {
          fk_usuario : res
        }})
			.then((res)=>{return res})
			.catch(function (error){//handle error
				console.log('axios'); console.log(error)
			})
    })
		.then((res)=>{
			console.log(res.data)
			let data = res.data
			if(data.tipo === 'Natural'){
				this.setState({NaturalData: {
					rif: data.rif, ci: data.natural_ci, name: data.natural_nombre, lastName: data.natural_apellido, gender: data.natural_genero, bornDate: data.natural_fecha_nacimiento}, isLoggedIn:true})
			}
			else{
				this.setState({CompanyData: {
					rif: data.rif, comercialDesignation: data.juridico_denominacion_comercial, businessName: data.juridico_razon_social, webPage: data.juridico_pagina_web, capital: data.juridico_capital}, isLoggedIn:true, naturalClient: false})
			}
			return "ok"
		})
    .catch(function (error) { // handle error
      console.log('axios'); console.log(error);
    });
  }
  isLoggedIn() { this.setState({isLoggedIn:false}) }

  handleHomeState(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      NaturalData: {
        ...prevState.NaturalData,
        HomeAddress: {
          ...prevState.NaturalData.HomeAddress,
          [name]: value,
          municipality: "",
          parish: {

          }
        }
      }
    }), () => console.log(this.state.NaturalData));
  }
  handleHomeCity(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      NaturalData: {
        ...prevState.NaturalData,
        HomeAddress: {
          ...prevState.NaturalData.HomeAddress,
          [name]: value
        }
      }
    }), () => console.log(this.state.NaturalData));
  }
  handleHomeAddress(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      NaturalData: {
        ...prevState.NaturalData,
        HomeAddress: {
          ...prevState.NaturalData.HomeAddress,
          [name]: value
        }
      }
    }), () => console.log(this.state.NaturalData));
  }

  handleCompanyEmail(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      CompanyData: {
        ...prevState.CompanyData,
        email: value
      }
    }), () => console.log(this.state.CompanyData));
  }
  handleCompanyPassword(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      CompanyData: {
        ...prevState.CompanyData,
        password: value

      }
    }), () => console.log(this.state.CompanyData));
  }
  handleCompanyInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      CompanyData: {
        ...prevState.CompanyData,
        [name]: value
      }
    }), () => console.log(this.state.CompanyData));
  }
  handleContactPerson(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      CompanyData: {
        ...prevState.CompanyData,
        ContactPerson:{
          ...prevState.CompanyData.ContactPerson,
          [name]: value
        }
      }
    }), () => console.log(this.state.CompanyData));
  }

  handleFiscalState(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      CompanyData: {
        ...prevState.CompanyData,
        FiscalAddress: {
          ...prevState.CompanyData.FiscalAddress,
          [name]: value,
          municipality: "",
          parish: {

          }
        }
      }
    }), () => console.log(this.state.CompanyData));
  }
  handleFiscalCity(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      CompanyData: {
        ...prevState.CompanyData,
        FiscalAddress: {
          ...prevState.CompanyData.FiscalAddress,
          [name]: value,
          parish: {

          }
        }
      }
    }), () => console.log(this.state.CompanyData));
  }
  handleFiscalAddress(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      CompanyData: {
        ...prevState.CompanyData,
        FiscalAddress: {
          ...prevState.CompanyData.FiscalAddress,
          [name]: value
        }
      }
    }), () => console.log(this.state.CompanyData));
  }
  handleMainState(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      CompanyData: {
        ...prevState.CompanyData,
        MainAddress: {
          ...prevState.CompanyData.MainAddress,
          [name]: value,
          municipality: "",
          parish: {

          }
        }
      }
    }), () => console.log(this.state.CompanyData));
  }
  handleMainCity(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      CompanyData: {
        ...prevState.CompanyData,
        MainAddress: {
          ...prevState.CompanyData.MainAddress,
          [name]: value,
          parish: {

          }
        }
      }
    }), () => console.log(this.state.CompanyData));
  }
  handleMainAddress(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      CompanyData: {
        ...prevState.CompanyData,
        MainAddress: {
          ...prevState.CompanyData.MainAddress,
          [name]: value
        }
      }
    }), () => console.log(this.state.CompanyData));
  }
  render() {
    return (<div>
      <header>
        <div className="container">
          <Banner/>
        </div>
      </header>
      <br/>
      <div className="container">
				{
					this.state.naturalClient
					? <NaturalClient userData = {this.state.userData} clientData = {this.state.NaturalData} handleHomeAddress = {this.handleHomeAddress} handleHomeState = {this.handleHomeState}
            handleHomeCity = {this.handleHomeCity} image={client1}/>
					: <CompanyClient userData = {this.state.userData} clientData = {this.state.CompanyData} handleFiscalAddress = {this.handleFiscalAddress} handleFiscalState = {this.handleFiscalState} handleFiscalCity = {this.handleFiscalCity} handleMainAddress = {this.handleMainAddress}    handleMainState = {this.handleMainState} handleMainCity = {this.handleMainCity} image={client1}/>
				}
      </div>
      <br/>
      <div className="container-fluid">
        <Footer/>
      </div>
    </div>);
  }
}

export default MiCuenta
