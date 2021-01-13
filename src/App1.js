// import React, { Component } from 'react';
// import Particles from 'react-particles-js';
// import Navigation from './components/navigation/navigation';
// import Logo from './components/logo/logo';
// import Rank from './components/rank/rank';
// import ImageLinkForm from './components/imagelinkform/imagelinkform';
// import FaceRecognition from './components/facerecognition/facerecognition';
// import './App.css';
// import 'tachyons';

// import Clarifai from 'clarifai'; // initialise api app with api key
// const app = new Clarifai.App({ 
//  apiKey: '<replace with your api key>'
// });

// const particlesOptions = { //background animation plugin
//   particles: {
//     number: {
//       value: 30,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     }
//   }
// }

// class App extends Component {

//   constructor() { // ImageLinkForm input field capture
//     super(); 
//     this.state = {
//       input: ''
//     }
//   }

//   onInputChange = (event) => { // ImageLinkForm input field capture
//     console.log(event.target.value); // capture input via console
//   }

//   onButtonSubmit = () => { // ImageLinkForm button click capture
//     console.log('click'); // capture click via console

//     // face detect api
//     app.models.predict(
//       Clarifai.COLOR_MODEL, 
//       "https://samples.clarifai.com/face-det.jpg")
//       .then(
//       function(response) {
//       // do something with response
//       console.log(response);
//       },
//       function(err) {
//       // there was an error
//       console.log(err);
//       }
//     );
// app.models
//     .initModel({
//         id: Clarifai.FACE_DETECT_MODEL,
//     })
//     .then((faceDetectModel) => {
//         return faceDetectModel.predict(
//             "https://samples.clarifai.com/face-det.jpg"
//         );
//     })

//   }

//   render() {
//     return (
//       <div className="App">
//         <Particles className='particles' //background animation plugin
//           params={particlesOptions} 
//         />
//         <Navigation />
//         {/*<Logo />*/}
//         <Rank />
//         <ImageLinkForm 
//           onInputChange={this.onInputChange} // input catpure
//           onButtonSubmit={this.onButtonSubmit} // button capture
//         />
//         <FaceRecognition />
//       </div>
//     );
//   }

// }

// export default App;

import { useState } from "react";
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import User from "./components/User/User";
import Particles from 'react-particles-js';
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
// metadata.set("authorization", "Key YOUR_CLARIFAI_API_KEY");
// import {ClarifaiStub, grpc} from "clarifai-nodejs-grpc";

// const stub = ClarifaiStub.grpc();

// const metadata = new grpc.Metadata();
metadata.set("authorization", "2c48e9078ded4426a89795af30e20197");


var particlesOptions = {
    particles: {
        value: 50,
        density: {
            enable: true,
            value_area: 800
        }
    }
}

function App() {
    var [input, setInput] = useState('');
    var onInputChange = (event) => {
        console.log(event.target.value);
    }
    var onButtonSubmit = () => {
        console.log('click');
    }

    return (
        <div className="App">
            <Particles className="particles"
                params={particlesOptions} />
            <Navigation />
            <Logo />
            <User />
            <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />

        </div>
    );
}

export default App;
