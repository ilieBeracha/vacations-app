import { useState } from "react";
import { useSelector } from "react-redux";
import "./Filters.css";

function Filters({ setOffset, likes, active, coming, setLikes, setActive, setComing }: { setOffset: any, likes: boolean, active: boolean, coming: boolean, setLikes: any, setActive: any, setComing: any }): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth);

    const [likedDisable, setLikedDisable] = useState<boolean>(false)
    const [activeDisable, setActiveDisable] = useState<boolean>(false)
    const [comingDisable, setComingDisable] = useState<boolean>(false)

    async function activeFilter() {
        setOffset(0)
        if (!active) {
            setLikedDisable(true)
            setComingDisable(true)
        } else {
            setLikedDisable(false)
            setComingDisable(false)
        }
        setActive(!active);
    }


    async function comingFilter() {
        setOffset(0)
        if (!coming) {
            setLikedDisable(true)
            setActiveDisable(true)
        } else {
            setLikedDisable(false)
            setActiveDisable(false)
        }
        setComing(!coming);
    }


    async function likedFilter() {
        setOffset(0)
        if (!likes) {
            setComingDisable(true)
            setActiveDisable(true)
        } else {
            setComingDisable(false)
            setActiveDisable(false)
        }
        setLikes(!likes)
    }

    return (
        <div className="Filters">
            <div className="welcomeUser">
                {
                    authSlice.role === "ADMIN" ? <></> :
                        <h3>Welcome {authSlice.firstName} {authSlice.lastName}</h3>
                }
            </div>
            <div className="FilterCheckBoxes">
                {
                    authSlice.role === 'ADMIN' ? <></> :
                        <div className="FiltersCheckboxDiv">
                            <label htmlFor="">Liked</label>
                            <input
                                onChange={() => likedFilter()}
                                type="checkbox"
                                name="filterVacations"
                                disabled={likedDisable}
                            />
                        </div>
                }
                <div className="FiltersCheckboxDiv">
                    <label htmlFor="">Active</label>
                    <input
                        onChange={() => activeFilter()}
                        type="checkbox"
                        name="filterVacations"
                        disabled={activeDisable}
                    />
                </div>
                <div className="FiltersCheckboxDiv">
                    <label htmlFor="">Coming</label>
                    <input
                        onChange={() => comingFilter()}
                        type="checkbox"
                        name="filterVacations"
                        disabled={comingDisable}
                    />
                </div>
            </div>
        </div>
    );
}

export default Filters;
