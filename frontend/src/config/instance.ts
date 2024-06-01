import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";

const instance = axios.create({
	baseURL: process.env.SERVER_URL,
	timeout: 1000,
	headers: { "X-Custom-Header": "foobar"},
});

instance.interceptors.request.use(async function (config) {
	const token = config.headers.Authorization as string
	config.withCredentials = true

	if (!token) {
		return config
	}

	const payload = jwtDecode(token) as JwtPayload

	const exp = payload.exp as number
	
	const timeBefore10 = ((new Date().getTime()) + 10 * 1000 * 60)
	
	// token 10p nx hết hạn sẽ được refreshToken mới
	if (exp * 1000 < timeBefore10) {
		const { data } = await axios.post(`${process.env.SERVER_URL}/auth/refreshToken`,{}, {
			withCredentials:true
		})
		if (data) {
			instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
			config.headers.Authorization = `Bearer ${data.accessToken}`
		}
	}
	return config;
}, function (error) {
return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    console.log("response:",response);
	
    return response;
  }, function (error:any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
	
	
    return Promise.reject(error);
  });

export default instance;
