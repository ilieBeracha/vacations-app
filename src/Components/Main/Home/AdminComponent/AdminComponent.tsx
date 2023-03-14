import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AddVacation from "./AddVacation/AddVacation";
import "./AdminComponent.css";

function AdminComponent(): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth)
    return (
        <div className="AdminComponent">
            <div className="welcomeAdmin">
                <h3>Welcome {authSlice.firstName} {authSlice.lastName}</h3>
            </div>
            <AddVacation />
        </div>
    );
}

export default AdminComponent;
