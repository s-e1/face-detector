import './DisplayImage.css';

function DisplayImage({ url, boxlist }) {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img src={url} alt="" width="500px" id='imageInput' />
                <div>
                    {boxlist.length &&
                        boxlist.map((item) => {
                            return <div className="bounding-box"
                                style={{ top: item.topRow, left: item.leftCol, bottom: item.bottomRow, right: item.rightCol }}
                                key={item.id}
                            ></div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default DisplayImage;