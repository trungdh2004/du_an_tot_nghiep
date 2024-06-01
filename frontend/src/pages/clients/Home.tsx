import ButtonCrease from "@/components/ButtonCrease";
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

	return (
		<>
			{cart?.map((row) => (
				<p>
					{row.name} - {row.quantity}
				</p>
			))}
			<ButtonCrease />
		</>
	);
};

export default Home;
