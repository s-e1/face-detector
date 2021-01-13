import Tilty from 'react-tilty';
import './Logo.css';
import ai from './ai.png';


function Logo() {
    return (
        <div className="ma4 mt0">
            <Tilty className="br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }}>
                <div className="pa3">
                    <img src={ai} alt="img" height="100px" style={{ paddingTop: '5px' }} />
                </div>
            </Tilty>
        </div>
    );
}

export default Logo;