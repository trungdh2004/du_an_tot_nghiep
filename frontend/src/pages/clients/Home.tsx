
import instance from "@/config/instance";
import useStore from "@/store/home.store";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
	
	// const [index, setIndex] = useState(1);
	const { cart } = useStore();
	const handleTest =async () => {
		try {
			const { data }: any = await instance.get<any>('/address/paddingAddress', {
				withCredentials:true
			})
			
		} catch (error) {
			console.log("error", error);
			
		}
	}

	const handleLogin = async () => {
		try {
			const { data } = await instance.post("/auth/login", {
				email:"dohuutrung@gmail.com",
    			password:"123456"
			}, {
				withCredentials: true
			})

			instance.defaults.headers.common['Authorization'] =`Bearer ${data.accessToken}`;
		} catch (error) {
			
		}
	}

	return (
		<div className="px-4 sm:px-6 md:px-[40px] xl:px-[50px] 2xl:px-[60px]">
			<div className="w-full bg-red-500 min-h-[100vh]">
				<button onClick={handleTest}>handleTest</button>
				<button onClick={handleLogin}>Login</button>
			</div>
		</div>
	);
};

export default Home;
