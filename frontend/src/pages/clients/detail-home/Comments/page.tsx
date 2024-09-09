import CommentEditor from "@/components/common/CommentForm";
import CommentItem from "./CommentItem";
import FilterComment from "./FilterComment";
import { useState } from "react";
import { createComment } from "@/service/comment";
import { IProductDetail } from "@/types/product";
import TYPE_COMMENT from "@/config/typeComment";
type Props = {
	product: IProductDetail | undefined;
};
const Comments = ({ product }: Props) => {
	const [content, setContent] = useState("");
	const [open, setOpen] = useState(false);

	const onSubmitComment = async () => {
		console.log("value:", content);
		try {
			const data = await createComment(
				content,
				product?._id as string,
				TYPE_COMMENT.PRODUCT,
      );
      setContent("")
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (content: string) => {
		setContent(content);
	};

	const handleClose = () => {
		setOpen(false);
	};
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
