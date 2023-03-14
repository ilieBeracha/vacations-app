import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginRedux } from "../../../app/authSlice";
import { UserInterface } from "../../../models/UserModel";
import { toastAlerts } from "../../../helpers/toastAlerts";
import "./Login.css";
import { userService } from "../../../Services/userService";

function Login(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<UserInterface>();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    async function formLogin(user: UserInterface) {
        const res = await userService.login(user);
        const data = await res.json()
        if (res.status === 200) {
            dispatch(loginRedux(data))
            console.log(res)
            toastAlerts.toastSuccess('Logged in')
            navigate('/')
        } else {
            toastAlerts.toastError(data)
        }
    }

    return (
        <div className="Login">
            <div className="authForm">
                <form action="" onSubmit={handleSubmit(formLogin)}>
                    <label htmlFor="">Email: </label>
                    <input type="email" {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                    })} />
                    <label htmlFor="">Password: </label>
                    <input type="password" {...register('password', {
                        minLength: 4,
                        required: true
                    })} />
                    {errors.email ? <div className="useFormError"><span>Email not valid</span></div> : <></>}
                    {errors.password ? <div className="useFormError"><span>Password min length 4 digits</span></div> : <></>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
