import { BsFacebook } from "react-icons/bs";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	FacebookAuthProvider,
	getAdditionalUserInfo,
	AdditionalUserInfo,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import app from "@/config/initializeFirebase";
import instance from "@/config/instance";

interface ISocial {
	isNewUser: boolean;
	providerId: string;
	profile: {
		email: string;
		family_name: string;
		given_name: string;
		granted_scopes: string;
		id: string;
		name: string;
		picture: string;
	};
}

const SignInWithFacebookOrGoogle = () => {
	const auth = getAuth(app);

	const handleLoginGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then(async (result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const user: AdditionalUserInfo | null = getAdditionalUserInfo(result);
				console.log("user:", user);

				const body = {
					full_name: user?.profile?.name,
					last_name: user?.profile?.given_name,
					first_name: user?.profile?.family_name,
					picture: user?.profile?.picture,
					uid: user?.profile?.id,
					provider: user?.providerId,
					email: user?.profile?.email,
				};
				const { data } = await instance.post("/auth/social-user", body);

				console.log("data User:", data);
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};

	const handleLoginFacebook = () => {
		const provider = new FacebookAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = FacebookAuthProvider.credentialFromResult(result);

				// The signed-in user info.
				const user = result.user;

				console.log("user:", user);
				console.log("credential:", credential);

				// IdP data available using getAdditionalUserInfo(result)
				// ...
			})
			.catch((error) => {
				console.log("error:", error);

				// Handle Errors here.
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
					className="col-span-3 flex items-center justify-center p-2 max-h-10 cursor-pointer hover:bg-gray-100"
					onClick={handleLoginGoogle}
				>
					<FcGoogle size={24} />
				</div>
				<div
					className="col-span-3 flex items-center justify-center p-2 max-h-10 cursor-pointer hover:bg-gray-100"
					onClick={handleLoginFacebook}
				>
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
