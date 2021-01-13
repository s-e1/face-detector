import './DisplayImage.css';

function DisplayImage({ url, box }) {
    var { topRow, leftCol, bottomRow, rightCol } = box;
    // console.log(box);
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img src={url} alt="" width="500px" id='imageInput' />
                <div className="bounding-box"
                    style={{ top: topRow, left: leftCol, bottom: bottomRow, right: rightCol }}
                >
                </div>
            </div>
        </div>
    );
}

export default DisplayImage;