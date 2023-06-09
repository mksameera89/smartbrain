import React, { Component } from "react";


class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            errorAlert: '',
        }
    }

onSignInEmailChange = (event) => {
 this.setState({signInEmail: event.target.value});
}

onSignInPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
   }

   onSubmitSignIn = (event) => {
   

    fetch('https://smartbrain-backend-0ijt.onrender.com/signin', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            email: this.state.signInEmail,
            password: this.state.signInPassword
        })
    })
    .then(response => response.json())
    .then(user => {
        if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange('home');
        }else if (user === 'incorrect form submission'){
            this.setState({errorAlert: 'incorrect form submission'})
        }else if (user === 'Incorrect username or password'){
            this.setState({errorAlert: 'Incorrect username or password'})
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
}



    render () {
        const {onRouteChange} = this.props;
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
              <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={this.onSignInEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={this.onSignInPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                    </fieldset>
                    <div className="dark-red b pa0">
                        <p>{this.state.errorAlert}</p>
                    </div>
                    <div className="">
                    <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                    <a href="#0" onClick={() => onRouteChange('register')} className="f6 link dim black db">Register</a>
                    </div>
                </div>
              </main>
          </article>
        )
    }
    
}

export default SignIn;