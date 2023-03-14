import "./LandingPageContent.css";
import fly from '../../../image/fly.png'

function LandingPageContent(): JSX.Element {
    return (
        <div className="LandingPageContent">
            <div className="LandingPageContentSen">
                <h4>Discover your dream <span style={{color: '#8AAAE5'}}>vacation</span> with our user-friendly travel website.</h4>
                <h5>Find your next adventure and explore the world with ease - discover affordable flights, comfortable accommodations, and unforgettable experiences on our all-in-one travel finder website.</h5>
            </div>

            <div className="earthImage">
                <img src={fly} alt="" />
            </div>
        </div>
    );
}

export default LandingPageContent;
