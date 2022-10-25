import axios from 'axios'


const URL_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`

const api = axios.create({
	baseURL: URL_BASE,
})

export default api
