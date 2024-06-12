import { setItemLocal } from "@/common/localStorage";
import app from "@/config/initializeFirebase";
import { useAuth } from "@/hooks/auth";
import { useRouterHistory } from "@/hooks/router";
import { socialUser } from "@/service/account";
import { AxiosError } from "axios";
import {
	AdditionalUserInfo,
	GoogleAuthProvider,
	getAdditionalUserInfo,
	getAuth,
	signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const SignInWithFacebookOrGoogle = () => {
	const auth = getAuth(app);
	const { setAuthUser, setIsLoggedIn } = useAuth();
	const routerHistory = useRouterHistory();
	const handleLoginGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then(async (result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				// The signed-in user info.
				const user: AdditionalUserInfo | null = getAdditionalUserInfo(result);
				const payload = {
					email: result?.user?.email,
					first_name: user?.profile?.given_name,
					last_name: user?.profile?.family_name,
					full_name: user?.profile?.name,
					picture: user?.profile?.picture,
					uid: user?.profile?.id,
					provider: user?.providerId,
				};
				socialUser(payload)
					.then(({ data }) => {
						console.log(data);
						setAuthUser?.(data?.user);
						setIsLoggedIn?.(true);
						setItemLocal("token", data?.accessToken);
						toast.success(data?.message);
						routerHistory();
					})
					.catch((error) => {
						if (error instanceof AxiosError) {
							toast.error(error.response?.data?.message);
						}
					});
				// IdP data available using getAdditionalUserInfo(result)
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};

	return (
		<div className="space-y-5">
			<div className="grid grid-cols-6 gap-x-4 *:border *:border-gray-200 *:rounded-lg  ">
				<div
					className="col-span-6 flex items-center gap-3 justify-center p-2 max-h-10 cursor-pointer hover:bg-gray-100"
					onClick={handleLoginGoogle}
				>
					<FcGoogle size={24} />
					<span className="text-sm">Đăng nhập với Google</span>
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
