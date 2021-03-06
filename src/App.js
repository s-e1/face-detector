import { useEffect, useState } from "react";
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import DisplayImage from "./components/DisplayImage/DisplayImage";
import User from "./components/User/User";
import Particles from 'react-particles-js';
import './App.css';

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
    var [user, setUser] = useState({
        id: 125,
        name: '',
        email: '',
        entries: 0,
        joined: ''
    })

    useEffect(() => {
        // fetch('http://localhost:3001')
            fetch('https://face-detector-se.herokuapp.com')
            .then(response => response.json())
            .then(console.log)
    }, [])

    var onRouteChange = (route) => {
        if (route === 'home') {
            setisSignedIn(true);
        } else if (route === 'signout') {
            initialState();
        }
        setRoute(route);
    }
    var onInputChange = (event) => {
        setInput(event.target.value);
    }
    var loadUser = (user) => {
        setUser({ ...user });
    }
    var onPictureSubmit = () => {
        setUrl(input);
        // fetch('http://localhost:3001/imageurl', {
            fetch('https://face-detector-se.herokuapp.com/imageurl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    // fetch('http://localhost:3001/image', {
                        fetch('https://face-detector-se.herokuapp.com/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: user.id })
                    })
                        .then(response => response.json())
                        .then(count => setUser({ ...user, entries: count }))
                        .catch(console.log)
                }
                setBox(calculateBox(response))
            })
            .catch(err => console.log(err));
    }

    var calculateBox = (data) => {
        var image = document.getElementById('imageInput');
        var { height, width } = image;

        // make array of face boxes
        var imgList = data.outputs[0].data.regions;
        var boxList = imgList.map(val => {
            var id = val.id;
            var imgBox = val.region_info.bounding_box;
            var { top_row, left_col, bottom_row, right_col } = imgBox;

            return {
                id,
                topRow: top_row * height,
                leftCol: left_col * width,
                bottomRow: height - (bottom_row * height),
                rightCol: width - (right_col * width)
            }
        })

        return boxList;
    }
    var initialState = () => {
        setInput('');
        setUrl('');
        setBox({});
        setRoute('signin');
        setisSignedIn(false);
        setUser({
            id: 125,
            name: '',
            email: '',
            entries: 0,
            joined: ''
        })
    }

    return (
        <div className="App">
            <Particles className="particles"
                params={particlesOptions} />
            <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
            {route === 'home' ?
                <>
                    <Logo />
                    <User name={user.name} entries={user.entries} />
                    <ImageLinkForm onInputChange={onInputChange} onPictureSubmit={onPictureSubmit} />
                    <DisplayImage url={url} boxlist={box} />
                </> :
                (route === 'signin' ?
                    <Signin onRouteChange={onRouteChange} loadUser={loadUser} /> :
                    <Register onRouteChange={onRouteChange} loadUser={loadUser} />
                )
            }
        </div>
    );
}

export default App;
