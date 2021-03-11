import { useState } from "react";

function Signin({ onRouteChange, loadUser }) {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var onEmailChange = (event) => {
        setEmail(event.target.value);
    }
    var onPasswordChange = (event) => {
        setPassword(event.target.value);
    }
    var onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin', {
            // fetch('https://face-detector-se.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    loadUser(user);
                    onRouteChange('home');
                }
            })
        // .then(data => {
        //     if (data === "success") {
        //         onRouteChange('home');
        //     }
        // })
    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email" name="email-address" id="email-address"
                                onChange={onEmailChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password" name="password" id="password"
                                onChange={onPasswordChange} />
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit" value="Sign in" onClick={() => onSubmitSignIn()}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p className="f6 link dim black db pointer" onClick={() => onRouteChange('register')}>
                            Register
                        </p>
                    </div>
                </div>
            </main>
        </article>
    );
}

export default Signin;