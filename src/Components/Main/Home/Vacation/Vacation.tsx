import { useSelector } from "react-redux";
import { VacationInterface } from "../../../../models/VacationModel";
import { IMAGE_URL } from "../../../../Services/config";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteVacation from "./DeleteVacation/DeleteVacation";
import EditVacation from "./EditVacation/EditVacation";
import { useLikesMutation } from "../../../../helpers/likesQueries";
import "./Vacation.css";

function Vacation({ vacation, offset }: { vacation: VacationInterface, offset: number }): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth);
    const LikesMutation = useLikesMutation(vacation, offset);

    return (
        <div className="Vacation">
            <div className="VacationSettings">
                {
                    authSlice.role === "ADMIN" ?
                        <>
                            <div className="vacationBtn">
                                <EditVacation vacation={vacation} />
                                <DeleteVacation vacation={vacation} />
                            </div>
                        </>
                        :
                        <div onClick={() => LikesMutation.mutate()} className="likedVacation">
                            <span>{vacation.totalLikes}</span>
                            {vacation.userLikes ?
                                <FavoriteIcon color="error" />
                                :
                                <FavoriteIcon color="disabled" />
                            }
                        </div>
                }
            </div>
            <div className="VacationImage">
                <img src={IMAGE_URL + vacation.imageName} alt={vacation.destination} />
            </div>
            <div className="VacationDates">
                <span>{vacation.startingDate} / {vacation.endingDate}</span>
            </div>
            <div className="VacationDetails">
                <b>{vacation.destination}</b>
                <b>{vacation.price}$</b>
            </div>
            <div className="VacationDescription">
                <span>{vacation.description}</span>
            </div>
        </div>
    );
}

export default Vacation;
