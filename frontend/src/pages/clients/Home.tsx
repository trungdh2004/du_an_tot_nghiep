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
			const { data }: any = await instance.post<any>(
				"/address/paddingAddress",
				{
					withCredentials: true,
				},
			);
		} catch (error) {
			console.log("error", error);
		}
	};
	return (
		<div className="px-4 sm:px-6 md:px-[40px] xl:px-[50px] 2xl:px-[60px]">
			<div className="w-full bg-green-400 min-h-[20vh]">
				<button>handleTest</button>
				<button onClick={() => handleTest()}>Login</button>
			</div>
			<div className="w-full bg-white min-h-[20vh]">
				<button>handleTest</button>
				<button onClick={() => handleTest()}>Login</button>
			</div>
			<div className="w-full bg-red-400 min-h-[20vh]">
				<button>handleTest</button>
				<button onClick={() => handleTest()}>Login</button>
			</div>
			<div className="w-full bg-orange-400 min-h-[80vh]">
				<button>handleTest</button>
				<button onClick={() => handleTest()}>Login</button>
			</div>
		</div>
	);
};

export default Home;
