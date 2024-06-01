import instance from "@/config/instance";
import { useAuth } from "@/hooks/auth";
import useStore from "@/store/home.store";

const Home = () => {
	// const [index, setIndex] = useState(1);
	const { cart } = useStore();
	const { authUser, isLoggedIn } = useAuth();
	console.table({
		"Thông tin ": authUser,
		"Trạng tháin ": isLoggedIn,
	});
	const handleTest = async () => {
		try {
			const { data }: any = await instance.get<any>("/address/paddingAddress", {
				withCredentials: true,
			});
		} catch (error) {
			console.log("error", error);
		}
	};
	return (
		<div className="px-4 sm:px-6 md:px-[40px] xl:px-[50px] 2xl:px-[60px]">
			<div className="w-full bg-red-500 min-h-[100vh]">
				<button>handleTest</button>
				<button>Login</button>
			</div>
		</div>
	);
};

export default Home;
