import { useSelector } from "react-redux";
import { Route, Routes, useLocation, redirect } from "react-router-dom";
import Error404 from "../Error404/Error404";
import { Reports } from "../Reports/Reports";
import Home from "./Home/Home";
import "./Main.css";

function Main(): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth)
    const location = useLocation();

    if (authSlice.role !== "ADMIN" && location.pathname === "/report") {
        redirect('/')
    };
    
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                {
                    authSlice.role === "ADMIN" ?
                        <Route path="/report" element={<Reports />}></Route>
                        : <></>}
                <Route path="*" element={<Error404 />} />
            </Routes>
        </div>
    );
}

export default Main;
