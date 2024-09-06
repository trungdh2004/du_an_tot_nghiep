import CommentEditor from "@/components/common/CommentForm";
import CommentItem from "./CommentItem";
import FilterComment from "./FilterComment";
import { useState } from "react";

const Comments = () => {
	const [content, setContent] = useState("");
	const [open, setOpen] = useState(false);

	const onSubmitComment = () => {
		console.log("value:", content);
	};

	const handleChange = (content: string) => {
		setContent(content);
	};

	const handleClose = () => {
		setOpen(false)
	}
	return (
		<div>
			<div className="mb-3 flex items-center gap-2">
				<h3 className="font-bold text-xl text-slate-600"> 959 bình luận</h3>
				<FilterComment />
			</div>
			<CommentEditor
				onSubmit={onSubmitComment}
				avatar="/avatar_25.jpg"
				handleChange={handleChange}
				handleClose={handleClose}
				content={content}
				handleOpen={() => setOpen(true)}
				openComment={open}
			/>
			<div className="space-y-5 mt-10">
				<CommentItem />
				<CommentItem />
				<CommentItem />
				<CommentItem />
			</div>
		</div>
	);
};

export default Comments;
