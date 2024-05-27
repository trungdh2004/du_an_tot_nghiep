import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const SignInWithFacebookOrGoogle = () => {
	return (
		<div className="space-y-5">
			<div className="grid grid-cols-6 gap-x-4 *:border *:border-gray-200 *:rounded-lg  ">
				<div className="col-span-3 flex items-center justify-center p-2 max-h-10 cursor-pointer hover:bg-gray-100">
					<FcGoogle size={24} />
				</div>
				<div className="col-span-3 flex items-center justify-center p-2 max-h-10 cursor-pointer hover:bg-gray-100">
					<BsFacebook size={24} fill="#1877F2" />
				</div>
			</div>
			{/* line */}
			<div className="grid grid-cols-6 gap-x-4 *:border-b *:border-gray-200 *:rounded-lg ">
				<div className="col-span-3 flex items-center justify-center "></div>
				<div className="col-span-3 flex items-center justify-center "></div>
			</div>
		</div>
	);
};

export default SignInWithFacebookOrGoogle;
