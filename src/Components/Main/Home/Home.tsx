import { LinearProgress, Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import { VacationInterface } from "../../../models/VacationModel";
import Filters from "../Filters/Filters";
import AdminComponent from "./AdminComponent/AdminComponent";
import { useState } from "react";
import { useVacationsQuery, useSumOfVacationsQuery } from "../../../helpers/vacationsQueries";
import Vacation from "./Vacation/Vacation";
import error from '../../../image/error.png';
import "./Home.css";


function Home(): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth);
    const [offset, setOffset] = useState<number>(0);

    const [likes, setLikes] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);
    const [coming, setComing] = useState<boolean>(false);

    const VacationsQuery = useVacationsQuery(offset, likes, active, coming);
    const SumOfVacationsQuery = useSumOfVacationsQuery(likes, active, coming);

    const handleChange = async (event: any, value: any) => {
        setOffset((value - 1) * 10);
    };

    return (
        <div className="Home">
            {
                VacationsQuery.isError ? <></>
                    : authSlice.role === "USER" ?
                        <Filters setOffset={setOffset} active={active} setActive={setActive} likes={likes} setLikes={setLikes} coming={coming} setComing={setComing} />
                        : authSlice.role === "ADMIN" ?
                            <AdminComponent />
                            : <></>}
            <div className="vacationsDiv">
                {
                    VacationsQuery.isLoading ?
                        <div className="LoadingDiv">
                            <LinearProgress />
                        </div>
                        : VacationsQuery.isSuccess ?
                            VacationsQuery?.data?.map((vaca: VacationInterface) => {
                                return <Vacation offset={offset} key={vaca.id} vacation={vaca} />
                            })
                            : VacationsQuery.isError ?
                                <div className="errorImageDiv"><img src={error} alt="" /></div> : <></>}
            </div>
            {VacationsQuery.isError ?
                <></>
                :
                <div className="pagination">
                    {SumOfVacationsQuery.data ?
                        <Pagination page={offset / 10 + 1} onChange={handleChange} count={Math.ceil(Number(SumOfVacationsQuery.data[0].vacationsSum / 10))} />
                        : <></>}
                </div>
            }
        </div>
    );
}

export default Home;