import CommentEditor from "@/components/common/CommentForm";
import CommentItem from "./CommentItem";
import FilterComment from "./FilterComment";
import { useEffect, useState } from "react";
import { createComment, getListComments } from "@/service/comment";
import { IProductDetail } from "@/types/product";
import TYPE_COMMENT from "@/config/typeComment";
import {
	Comment,
	IObjectComment,
	IPageComment,
} from "@/types/TypeObjectComment";
import { useAuth } from "@/hooks/auth";
type Props = {
	product: IProductDetail | undefined;
};

const Comments = ({ product }: Props) => {
	const { isLoggedIn } = useAuth();
	const [content, setContent] = useState("");
	const [open, setOpen] = useState(false);
	const [pageIndex, setPageIndex] = useState(1);
	const [comment, setComment] = useState<Comment[]>([]);
	const [check, setCheck] = useState<IPageComment | null>(null);
	const [objectComment, setObjectComment] = useState<IObjectComment>({
		commentId: product?._id,
		commentType: TYPE_COMMENT.PRODUCT,
		pageIndex: pageIndex,
		pageSize: 5,
		sort: -1,
	});
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getListComments(objectComment);
				setComment((prevComments) => [...prevComments, ...data.content]);
				setCheck(data);
				return data;
			} catch (error) {
				console.log(error);
			}
		})();
	}, [objectComment]);

	const onSubmitComment = async () => {
		console.log("value:", content);
		try {
			const { data } = await createComment(
				content,
				product?._id as string,
				TYPE_COMMENT.PRODUCT,
			);
			setComment((prevComments) => [data?.data, ...prevComments]);
			setContent("");
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
				<h3 className="font-bold text-xl text-slate-600">
					{" "}
					{comment?.length} bình luận
				</h3>
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
				{comment?.map((comment: any) => {
          return <CommentItem comment={comment} setComment={setComment} />;
				})}
				{(check?.totalPage as number) > 0 &&
					(check?.pageIndex as number) !== (check?.totalPage as number) && (
						<div
							className="cursor-pointer"
							onClick={() => {
								setObjectComment((prev) => ({
									...prev,
									pageIndex: pageIndex + 1,
								}));
							}}
						>
							<h3 className="font-bold text-sm text-slate-600 hover:underline pl-9">
								Xem thêm bình luận
							</h3>
						</div>
					)}
			</div>
		</div>
	);
};

export default Comments;
