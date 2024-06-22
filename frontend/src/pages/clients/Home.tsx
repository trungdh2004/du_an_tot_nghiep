import instance from "@/config/instance";
import { useAuth } from "@/hooks/auth";
import { useUploadFile, useMultipleImage } from "@/hooks/upload";
import useStore from "@/store/home.store";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";

const Home = () => {
	// const [index, setIndex] = useState(1);
	const uploadFiles = useMultipleImage();

	const { register, handleSubmit } = useForm<{ file: File }>();
	const onSubmit = (data: any) => {
		uploadFiles(data.file);
	};

	return (
		<div className="px-4 sm:px-6 md:px-[40px] xl:px-[50px] 2xl:px-[60px]">
			<div className="w-full pt-40 bg-green-400 min-h-[100vh]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<h2>UpLoad</h2>
					<input type="file" multiple {...register("file")} />
					<button type="submit">Upload</button>
				</form>
			</div>
		</div>
	);
};

export default Home;
