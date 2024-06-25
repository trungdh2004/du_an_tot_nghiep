import ProgessBarLoading from "@/components/common/ProgessBarLoading";
import Quil from "@/components/common/Quil";
import instance from "@/config/instance";
import { useAuth } from "@/hooks/auth";
import { useUploadFile, useMultipleImage } from "@/hooks/upload";
import useStore from "@/store/home.store";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";

const Home = () => {
	// const [index, setIndex] = useState(1);
	const { uploadMultipleImage } = useMultipleImage();

	const { register, handleSubmit } = useForm<{ file: File }>();
	const onSubmit = (data: any) => {
		uploadMultipleImage(data.file);
	};

	return (
		<div className="px-4 sm:px-6 md:px-[40px] xl:px-[50px] 2xl:px-[60px]">
			<div className="mt-40 h-72">
				<Quil />
			</div>
			<div className="mt-30">{/* <ProgessBarLoading />; */}</div>
			<div className="w-full pt-40 bg-green-400 min-h-[100vh]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<h2>UpLoad</h2>
					{/* <img src={preview} alt="" className="size-24" /> */}
					<input
						type="file"
						multiple
						{...register("file")}
						// onChange={setPreviewImage}
					/>
					<button type="submit">Upload</button>
				</form>
			</div>
		</div>
	);
};

export default Home;
