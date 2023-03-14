import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutRedux } from "../../app/authSlice";
import { toastAlerts } from "../../helpers/toastAlerts";
import "./Header.css";

function Header(): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logOut() {
        dispatch(logoutRedux())
        navigate('/')
        toastAlerts.toastInfo('Logged out')
    }

    return (
        <div className="Header">
            <div className="HeaderLogo">
                <NavLink to={'/'}>
                    <h1>Vaca</h1>
                </NavLink>
            </div>

            <div className="LandingPageAuth">
                {authSlice && authSlice.role === "ADMIN" ?
                    <>
                        <NavLink to={'/report'}>Reports</NavLink>
                        <button onClick={() => logOut()}>Log out</button>
                    </>
                    :
                    authSlice ?
                        <button onClick={() => logOut()}>Log out</button>

                        :
                        <>
                            <NavLink to={'/login'}>Login</NavLink>
                            <NavLink to={'/register'}>Register</NavLink>
                        </>
                }
            </div>
        </div>
    );
}

export default Header;
