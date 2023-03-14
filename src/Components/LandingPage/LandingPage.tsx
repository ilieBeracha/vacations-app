import { Routes, Route } from "react-router-dom";
import LandingPageContent from "./LandingPageContent/LandingPageContent";
import Login from "./Login/Login";
import Register from "./Register/Register";
import "./LandingPage.css";

function LandingPage(): JSX.Element {
    return (
        <div className="LandingPage">
            <Routes>
                <Route path="/" element={<LandingPageContent />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="*" element={'404'} />
            </Routes>
        </div>
    );
}

export default LandingPage;
