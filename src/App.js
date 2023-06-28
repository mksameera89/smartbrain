import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const initialState = {
  input: '',
  imageUrl: '',
  box : {},
  route: 'signin',
  isSingIn: false,
  user: {
    id:  '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  calculateFaceLocation = (res) => {
    const clarifaiFace = res.outputs[0].data.regions[0].region_info.bounding_box ; 
    const image = document.getElementById('imageInput');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);

    return {
      leftCol : clarifaiFace.left_col * imageWidth,
      topRow : clarifaiFace.top_row * imageHeight,
      rightCol : imageWidth - (clarifaiFace.right_col * imageWidth),
      bottomRow : imageHeight - (clarifaiFace.bottom_row * imageHeight)
    };
  }

  displayFaceBox = (box) => {
    this.setState({box : box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

const requestOptions = {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({
      imgUrl: this.state.input
    })
};

fetch('https://smartbrain-backend-0ijt.onrender.com/imageUrl', requestOptions)
    .then(response => response.json())
    .then(result => {this.displayFaceBox(this.calculateFaceLocation(result))
    if(result){
      fetch('https://smartbrain-backend-0ijt.onrender.com/image', {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            id: this.state.user.id            
        })
      }).then(response => response.json())
      .then(count => {
      this.setState(Object.assign(this.state.user, {entries: count}))
      })
      }
      })
    .catch(error => console.log('error', error));
  }
 
  onRouteChange = (route) => {
    if(route === 'signin'){
      this.setState(initialState);
    }else if(route === 'home'){
      this.setState({isSingIn: true});
    }
    this.setState({route: route});
  }

  loadUser = (data) => {
    this.setState({user: {
      id:  data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  render() {
    return (
      <div className="App">
        <ParticleBackground />
        <Navigation onRouteChange={this.onRouteChange} route={this.state.route} />
        { this.state.route === 'home'
        ? <div>
        <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries} />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          />
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
        </div>
        : (this.state.route === 'signin'
        ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
        }
      </div>
    );
  }
}


export default App;
