import { UserInterface } from "../models/UserModel"
// import { BASE_URL } from "./config"

const BASE_URL = process.env.REACT_APP_BASE_URL

class UserService {
    async login(user: UserInterface) {
        const results = fetch(`${BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return results;
    }

    async register(user: UserInterface) {
        const results = fetch(`${BASE_URL}/register`, {
            method: 'POST',
            body: JSON.stringify(user),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return results;
    }
}

export const userService = new UserService()