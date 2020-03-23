import React, { Component } from 'react';
import './App.css'
class App extends Component {
    state = {
        firstName: '',
        lastName: '',
        pesel: '',
        accept: false,
        adres: '',

        errors: {
        firstName: false,
        lastName: false,
        pesel: false,
        accept: false,
        adres: false,
        }
    }

    messages = {
        firstName_incorrect: 'Nazwa nie może zawierać spacji',
        lastName_incorrect: 'Nazwa nie może zawierać spacji',
        pesel_incorrect: 'PESEL musi mieć 11 znaków!',
        accept_incorrect: 'Zgoda musi byc zaznaczona',
        adres_incorrect: 'Adres nie moze być pusty'
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const type = e.target.type;

        if (type ==="text") {
        this.setState({
            [name]: value,
        })
        } else if (type === "checkbox"){
            const checked = e.target.checked;
            this.setState({
                [name]: checked,
            })
        }
         
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const validation = this.formValidation();
        console.log(validation)
        if (validation.correct) {
            this.setState({
                firstName: '',
                lastName: '',
                pesel: '',
                accept: false,
                adres: '',
                message: 'formularz został wysłany',
        
                errors: {
                firstName: false,
                lastName: false,
                pesel: false,
                accept: false,
                adres: false,
                }
            })
        } else {
            this.setState({
                errors: {
                firstName: !validation.firstName,
                lastName: !validation.lastName,
                pesel: !validation.pesel,
                accept: !validation.accept,
                adres: !validation.adres,
                }
            })
        }
    }

    formValidation(){
        let firstName = false;
        let lastName = false;
        let pesel = false;
        let accept = false;
        let adres = false;
        let correct = false;

        if(this.state.firstName.length > 2 && this.state.firstName.indexOf(' ')=== -1) {
            firstName = true;
        }
        if(this.state.lastName.length > 2 && this.state.lastName.indexOf(' ')=== -1) {
            lastName = true;
        }
        if(this.state.pesel.length ===11) {
            pesel = true;
        }
        if(this.state.accept) { 
            accept = true;
        }
        if(this.state.adres) {
            adres = true;
        }
        if(firstName && lastName && pesel && accept && adres) {
            correct =true;
        }

        return({
            correct,
            firstName,
            lastName,
            pesel,
            accept,
            adres,
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="firstName"> Imię
                    <input id="firstName" name="firstName" className="inputText" type="text" onChange={this.handleChange} value={this.state.firstName}/>
                    {this.state.errors.firstName && <span>{this.messages.firstName_incorrect}</span>}
                </label>
                <label htmlFor="lastName"> Nazwisko
                    <input id="lastName" name="lastName" className="inputText" type="text" onChange={this.handleChange} value={this.state.lastName}/>
                    {this.state.errors.lastName && <span>{this.messages.lastName_incorrect}</span>}
                </label>
                <label htmlFor="pesel"> PESEL
                    <input id="pesel" name="pesel" type="text" onChange={this.handleChange} value={this.state.pesel}/> 
                    {this.state.errors.pesel && <span>{this.messages.pesel_incorrect}</span>}
                </label>
                <label htmlFor="adres"> Adres
                    <input id="adres" name="adres" type="text" onChange={this.handleChange} value={this.state.adres}/> 
                    {this.state.errors.adres && <span>{this.messages.adres_incorrect}</span>}
                </label>
                <label htmlFor="accept">
                    <input type="checkbox" id="accept" name="accept" checked={this.state.accept} onChange={this.handleChange}/> Wyrażam zgodę
                </label>
                {this.state.errors.accept && <span>{this.messages.accept_incorrect}</span>}

                <button>Dodaj nowego pacjenta</button>
            </form>
        );
    }
}

export default App;