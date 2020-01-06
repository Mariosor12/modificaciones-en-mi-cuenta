import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class CompanyClient extends Component{
  render(){
    return(
        <section className="row margin-bottom">
            <div className="col-4 margin-bottom">
          <img src={this.props.image} alt="Cliente 1" style={{width: "inherit"}}/>
        </div>
        <div className="justified col-7">
        <h5><strong>{this.props.userData.nombre}</strong></h5>
        <h5><strong>{this.props.CompanyData.rif}</strong></h5>
        <h5><strong>{this.props.CompanyData.comercialDesignation}</strong></h5>
        <h5><strong>{this.props.CompanyData.businessName}</strong></h5>
        <h5><strong>{this.props.CompanyData.username}</strong></h5>
        <h5><strong>{this.props.CompanyData.password}</strong></h5>
        <h5><strong>{this.props.CompanyData.email}</strong></h5>
        <h5><strong>{this.props.CompanyData.webPage}</strong></h5>
        <h5><strong>{this.props.CompanyData.capital}</strong></h5>
        <h5><strong>{this.props.CompanyData.telephone1}</strong></h5>
        <h5><strong>{this.props.CompanyData.telephone2}</strong></h5>
        <h5><strong>{this.props.CompanyData.telephone3}</strong></h5>
        <h5><strong>{this.props.CompanyData.capital}</strong></h5>
        <h5><strong>{this.props.CompanyData.ContactPerson.nameContact}</strong></h5>
        <h5><strong>{this.props.CompanyData.ContactPerson.numberContact}</strong></h5>
        <h5><strong>{this.props.NaturalData.HomeAddress.state}</strong></h5>
        <h5><strong>{this.props.NaturalData.HomeAddress.city}</strong></h5>
        <h5><strong>{this.props.NaturalData.HomeAddress.municipality}</strong></h5>
        <h5><strong>{this.props.NaturalData.HomeAddress.parish}</strong></h5>
        <h5><strong>{this.props.NaturalData.HomeAddress.homeAvenue}</strong></h5>
        <h5><strong>{this.props.NaturalData.HomeAddress.homeBuilding}</strong></h5>
        <h5><strong>{this.props.NaturalData.HomeAddress.homeFloor}</strong></h5>
        <h5><strong>{this.props.NaturalData.HomeAddress.homeOffice}</strong></h5>
        <h5><strong>{this.props.NaturalData.HomeAddress.homeApartment}</strong></h5>
        <h5><strong>{this.props.NaturalData.FiscalAddress.state}</strong></h5>
        <h5><strong>{this.props.NaturalData.FiscalAddress.city}</strong></h5>
        <h5><strong>{this.props.NaturalData.FiscalAddress.municipality}</strong></h5>
        <h5><strong>{this.props.NaturalData.FiscalAddress.parish}</strong></h5>
        <h5><strong>{this.props.NaturalData.FiscalAddress.fiscalAvenue}</strong></h5>
        <h5><strong>{this.props.NaturalData.FiscalAddress.fiscalBuilding}</strong></h5>
        <h5><strong>{this.props.NaturalData.FiscalAddress.fiscalFloor}</strong></h5>
        <h5><strong>{this.props.NaturalData.FiscalAddress.fiscalOffice}</strong></h5>
        <h5><strong>{this.props.NaturalData.FiscalAddress.fiscalApartment}</strong></h5>
        <h5><strong>{this.props.NaturalData.MainAddress.state}</strong></h5>
        <h5><strong>{this.props.NaturalData.MainAddress.city}</strong></h5>
        <h5><strong>{this.props.NaturalData.MainAddress.municipality}</strong></h5>
        <h5><strong>{this.props.NaturalData.MainAddress.parish}</strong></h5>
        <h5><strong>{this.props.NaturalData.MainAddress.mainAvenue}</strong></h5>
        <h5><strong>{this.props.NaturalData.MainAddress.mainBuilding}</strong></h5>
        <h5><strong>{this.props.NaturalData.MainAddress.mainFloor}</strong></h5>
        <h5><strong>{this.props.NaturalData.MainAddress.mainOffice}</strong></h5>
        <h5><strong>{this.props.NaturalData.MainAddress.mainApartment}</strong></h5>
      
            <h5><strong>Puntos acumulados: </strong></h5>
            <div className="col-12 margin-bottom">
                <div className="justified col-12">
                    <div class="sticky" data-sticky data-anchor="content">
                    <h5><a id="h5link" href = "/pedidos">Pedidos</a></h5>
                    <hr></hr>
                    <h5><a id="h5link" href = "/seguridad">Seguridad</a></h5>
                    <hr></hr>
                    <h5><a id="h5link" href = "/metodopago">Metodos de Pago</a></h5>
                    <hr></hr>
                    <h5><a id="h5link" href = "/direccion">Direccion</a></h5>
                    <hr></hr>
                    <h5><a id="h5link" href="/InicioSesion">Cambiar de cuenta</a></h5>
                    <hr></hr>
                    <h5><a id="h5link" href="/carnet">Carnet de Afiliacion</a></h5>
                    <hr></hr>
                    </div>
                </div>
            </div>
        </div>


        </section>


    )
  }
}

export default CompanyClient
