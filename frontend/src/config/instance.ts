import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";

const instance = axios.create({
	baseURL: process.env.SERVER_URL,
	timeout: 5000,
	headers: { "X-Custom-Header": "foobar" },
});

instance.interceptors.request.use(
	async function (config) {
		const token = config.headers.Authorization as string;

		config.withCredentials = true;
		console.log("1");

		if (!token) {
			console.log("zo r nef");

			return config;
		}
		console.log("2");

		const payload = (await jwtDecode(token)) as JwtPayload;
		console.log("payload:", payload);

		const exp = payload.exp as number;

		const timeBefore10 = new Date().getTime() + 10 * 1000 * 60;

		// token 10p nx hết hạn sẽ được refreshToken mới
		if (exp * 1000 < timeBefore10) {
			const { data } = await axios.post(
				`${process.env.SERVER_URL}/auth/refreshToken`,
				{},
				{
					withCredentials: true,
				},
			);
			if (data) {
				instance.defaults.headers.common["Authorization"] =
					`Bearer ${data.accessToken}`;
				config.headers.Authorization = `Bearer ${data.accessToken}`;
			}
		}
		return config;
	},
	function (error) {
		console.log("error", error);

		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	function (response) {
		console.log("response:", response);

		return response;
	},
	function (error: any) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger

		return Promise.reject(error);
	},
);

export default instance;
