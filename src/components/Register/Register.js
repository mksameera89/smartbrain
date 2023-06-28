import React, { Component } from "react";

class Register extends Component {
    constructor(){
        super();
        this.state = {
            userName: '',
            registerEmail: '',
            registerPassword: '',
            errorAlert:''

        }
    }

onUserNameChange = (event) => {
    this.setState({userName: event.target.value});
}

onRegisterEmailChange = (event) => {
    this.setState({registerEmail: event.target.value});
}

onRegisterPasswordChange = (event) => {
    this.setState({registerPassword: event.target.value});
}

onSubmitRegister = () => {
    fetch('Http://localhost:3000/register', {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            name: this.state.userName,
            email: this.state.registerEmail,
            password: this.state.registerPassword
        })
    }).then(response => response.json())
    .then(data => {
        if(data.id){
            this.props.loadUser(data);
            this.props.onRouteChange('home');
            alert('registration successfull!'); 
        }else{
            this.setState({ errorAlert: 'Registration failed'});
        }
    })
}


    render() {
        const {onRouteChange} = this.props;
        return(
          <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">User name</label>
                        <input onChange={this.onUserNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="taxt" name="userName"  id="user-name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={this.onRegisterEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={this.onRegisterPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                    <div className="dark-red b pa0">
                        <p>{this.state.errorAlert}</p>
                    </div>
                    </fieldset>
                    <div className="">
                    <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                    </div>
                    <div className="lh-copy mt3">
                    <a href="#0" onClick={() => onRouteChange('signin')} className="f6 link dim black db">Sign In</a>
                    </div>
                </div>
            </main>
          </article>
        )
    }
} 

export default Register;