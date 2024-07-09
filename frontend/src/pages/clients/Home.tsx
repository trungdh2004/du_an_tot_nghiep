import FroalaEditor from "@/components/common/Froala";
import { useAuth } from "@/hooks/auth";
import { newBlogs } from "@/service/blog";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

const Home = () => {
	const { isLoggedIn } = useAuth();
	const [content, setContent] = useState("");
	// const debounced = useDebounceCallback(setContent, 2000);
	useEffect(() => {
		console.log(isLoggedIn, content);

		if (!isLoggedIn && !content) return;
		(async () => {
			try {
				const { data } = await newBlogs({ content });
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [content]);
	return (
		<div className="px-4 sm:px-6 md:px-[40px] xl:px-[50px] 2xl:px-[60px]">
			<div className="mt-40 ">
				<FroalaEditor content={content} onChangeContext={setContent} />
			</div>
			<div className="mt-30">{/* <ProgessBarLoading />; */}</div>
		</div>
	);
};

export default Home;
