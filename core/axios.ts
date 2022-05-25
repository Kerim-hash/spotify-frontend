import axios from 'axios'

const get_token = () => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('token'))
      }
}
console.log(get_token())

export const instance = axios.create({
    baseURL: `http://localhost:5000`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${get_token()}`,
    },
});