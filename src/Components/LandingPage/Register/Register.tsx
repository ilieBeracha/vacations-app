import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginRedux } from "../../../app/authSlice";
import { UserInterface } from "../../../models/UserModel";
import { toastAlerts } from "../../../helpers/toastAlerts";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../Services/userService";

function Register(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<UserInterface>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function formRegister(user: UserInterface) {
            const res = await userService.register(user);
            const data = await res.json()
            if (res.status === 200) {
                dispatch(loginRedux(data))
                toastAlerts.toastSuccess('Successfully registered')
                navigate('/')
            }else{
                toastAlerts.toastError(data)
            }
    }

    return (
        <div className="Login">
            <div className="authForm">
                <form action="" onSubmit={handleSubmit(formRegister)}>
                    <label htmlFor="">First name: </label>
                    <input type="text" {...register('firstName', {
                        required: true
                    })} />
                    <label htmlFor="">Last name: </label>
                    <input type="text" {...register('lastName', {
                        required: true
                    })} />
                    <label htmlFor="">Email: </label>
                    <input type="email" {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                    })} />
                    <label htmlFor="">Password: </label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 4,
                    })} />
                    {errors.email ? <div className="useFormError"><span>Email not valid</span></div> : <></>}
                    {errors.password ? <div className="useFormError"><span>Password min length 4 digits</span></div> : <></>}
                    <button>Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
