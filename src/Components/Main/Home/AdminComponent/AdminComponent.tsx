import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Filters from "../../Filters/Filters";
import AddVacation from "./AddVacation/AddVacation";
import "./AdminComponent.css";

function AdminComponent({ setOffset, likes, active, coming, setLikes, setActive, setComing }: { setOffset: any, likes: boolean, active: boolean, coming: boolean, setLikes: any, setActive: any, setComing: any }): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth)
    return (
        <div className="AdminComponent">
            <div className="welcomeAdmin">
                <h3>Welcome {authSlice.firstName} {authSlice.lastName}</h3>
            </div>
            <Filters setOffset={setOffset} active={active} setActive={setActive} likes={likes} setLikes={setLikes} coming={coming} setComing={setComing} />
            <AddVacation />
        </div>
    );
}

export default AdminComponent;
