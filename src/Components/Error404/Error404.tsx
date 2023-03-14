import "./Error404.css";
import error from '../../image/404.png'
function Error404(): JSX.Element {
    return (
        <div className="Error404">
            <img src={error} alt="" />
        </div>
    );
}

export default Error404;
