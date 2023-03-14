import axios from "axios";
import { BASE_URL } from "./config";

function getToken() {
    let token = window.localStorage.getItem('token');
    return token;
}
class VacationService {
    constructor() {
        axios.interceptors.response.use((response) => response, (error) => {
            console.log(error)
            if (error.response.status === 401) {
                window.localStorage.removeItem('token')
                window.location.reload()
            }
        });

    }
    
    async getVacations(offset: number, likes: boolean, active: boolean, coming: boolean) {
        const token = getToken()
        const results = await (await axios.get(`${BASE_URL}/vacation?offset=${offset}&likes=${likes}&active=${active}&coming=${coming}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
        return results;
    }

    async addVacation(vacation: FormData) {
        const token = getToken()
        const results = await axios.post(`${BASE_URL}/vacation/add`, vacation, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return results;
    }

    async deleteVacation(id: number) {
        const token = getToken()
        const results = await axios.delete(`${BASE_URL}/vacation/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return results;
    }

    async editVacation(vacation: FormData) {
        const token = getToken();
        const results = await axios.put(`${BASE_URL}/vacation/edit`, vacation, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return results;
    }

    async getSumOfVacations(likes: boolean, active: boolean, coming: boolean) {
        const token = getToken()
        const results = await (await axios.get(`${BASE_URL}/vacation/sum?likes=${likes}&active=${active}&coming=${coming}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
        return results;
    }

    async addOrRemoveLike(vacationId: number) {
        const token = getToken()
        const results = await axios.post(`${BASE_URL}/likes`, {
            vacationId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return results;
    }

    async getLikesForGraph() {
        const token = getToken();
        const results = await (await axios.get(`${BASE_URL}/likes/graph`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })).data;
        return results
    }
}

export const vacationService = new VacationService()