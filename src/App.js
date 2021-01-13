import { useState } from "react";
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import DisplayImage from "./components/DisplayImage/DisplayImage";
import User from "./components/User/User";
import Particles from 'react-particles-js';
import './App.css';

import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: "2c48e9078ded4426a89795af30e20197"
});

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
    var [url, setUrl] = useState('');
    var [box, setBox] = useState({});
    var [route, setRoute] = useState('signin');
    var [isSignedIn, setisSignedIn] = useState(false);

    var onRouteChange = (route) => {
        if (route === 'home') {
            setisSignedIn(true);
        } else if (route === 'signout') {
            setisSignedIn(false);
        }
        setRoute(route);
    }
    var onInputChange = (event) => {
        setInput(event.target.value);
    }
    var onButtonSubmit = () => {
        setUrl(input);
        app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
            .then(response => setBox(calculateBox(response)))
            .catch(err => console.log(err));
    }
    var calculateBox = (data) => {
        var clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        var image = document.getElementById('imageInput');
        var { top_row, left_col, bottom_row, right_col } = clarifaiFace;
        var { height, width } = image;
        return {
            topRow: top_row * height,
            leftCol: left_col * width,
            bottomRow: height - (bottom_row * height),
            rightCol: width - (right_col * width)
        }
    }

    return (
        <div className="App">
            <Particles className="particles"
                params={particlesOptions} />
            <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
            {route === 'home' ?
                <>
                    <Logo />
                    <User />
                    <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
                    <DisplayImage url={url} box={box} />
                </> :
                (route === 'signin' ?
                    <Signin onRouteChange={onRouteChange} /> :
                    <Register onRouteChange={onRouteChange} />
                )
            }
        </div>
    );
}

export default App;
