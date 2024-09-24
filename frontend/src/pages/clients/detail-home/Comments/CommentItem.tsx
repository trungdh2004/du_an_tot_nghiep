import { useEffect, useState } from "react";
import Actions from "./Actions";
import Reaction from "./Reaction";
import SendComment from "./SendComment";
import CommentEditor from "@/components/common/CommentForm";
import {
	Comment,
	IObjectComment,
	IPageComment,
} from "@/types/TypeObjectComment";
import { format } from "date-fns";
import TYPE_COMMENT from "@/config/typeComment";
import { useAuth } from "@/hooks/auth";
import {
	createComment,
	getListComments,
	reactionsComment,
} from "@/service/comment";
import { cn } from "@/lib/utils";
import { AiFillLike } from "react-icons/ai";
import DialogLoginComment from "./DialogLoginComment";
import { useLocation, useNavigate } from "react-router-dom";
import { calculateTimeDistance } from "@/common/func";
type Props = {
	comment: Comment;
};
const CommentItem = ({ comment }: Props) => {
	const { authUser, isLoggedIn } = useAuth();
	const [content, setContent] = useState(``);
	const [commentNotification, setCommentNotification] = useState<Comment[]>([]);
	const [pageIndex, setPageIndex] = useState(1);
	const [check, setCheck] = useState<IPageComment | null>(null);
	const [objectComment, setObjectComment] = useState<IObjectComment>({
		pageIndex: pageIndex,
		pageSize: 5,
		commentId: comment?._id,
		commentType: TYPE_COMMENT.COMMENT,
	});
	const [open, setOpen] = useState(false);
	const [openFeedback, setOpenFeedback] = useState<string | null>(null);
	const [openAnswer, setOpenAnswer] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const handleLoadMoreComments = async () => {
		const newPageIndex = pageIndex + 1;
		setPageIndex(newPageIndex);
		await handleListcommentItems(newPageIndex);
	};
	const handleListcommentItems = async (newPageIndex: number) => {
		try {
			const { data } = await getListComments({
				...objectComment,
				pageIndex: newPageIndex,
			});
			setCommentNotification((prevComments) => [
				...prevComments,
				...data.content,
			]);
			setCheck(data);
			return data;
		} catch (error) {
			console.log(error);
		}
	};
	const handlOpenFeedback = (
		commentId: string,
		userRep?: string,
		userNameRep?: string,
	) => {
		if (!isLoggedIn) {
			const productUrl = location.pathname;
			navigate(`/auth/login?url=${encodeURIComponent(productUrl)}`);
			return;
		}
		setOpenFeedback(commentId);
		if (userRep !== authUser?._id) {
			setContent(
				`<span contentEditable="false" class="link-mention">@${userNameRep}</span>`,
			);
		} else {
			setContent("");
		}
	};
	const handleLike = async (commentId: string) => {
		if (!isLoggedIn) {
			const productUrl = location.pathname;
			navigate(`/auth/login?url=${encodeURIComponent(productUrl)}`);
			return;
		}
		try {
			const data = await reactionsComment(commentId, true);
			return data;
		} catch (error) {
			console.log(error);
		}
	};
	const handleDislike = async (commentId: string) => {
		if (!isLoggedIn) {
			const productUrl = location.pathname;
			navigate(`/auth/login?url=${encodeURIComponent(productUrl)}`);
			return;
		}
		try {
			const data = await reactionsComment(commentId, false);
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const onSubmitComment = async () => {
		console.log("value:", content);
		try {
			const { data } = await createComment(
				content,
				comment?._id as string,
				TYPE_COMMENT.COMMENT,
			);
			console.log(data);
			setCommentNotification((prevComments) => [data?.data, ...prevComments]);
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
		setOpenFeedback(null);
	};
	const isFeedbackOpen = openFeedback === comment?._id;
	return (
		<div>
			<div className="flex items-start gap-1 md:gap-3 w-full">
				<div className="size-7 md:size-10 rounded-full border">
					<img
						src={comment?.user?.avatarUrl || `/avatar_25.jpg`}
						alt=""
						className="w-full h-full object-cover rounded-full"
					/>
				</div>
				<div className="flex-1">
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<span className="font-semibold text-base">
								{comment?.user?.full_name}
							</span>
							<span className="text-xs text-gray-400">
								{calculateTimeDistance(new Date(comment?.createdAt))} trước
							</span>
						</div>
						<span className="break-all text-sm">
							<div dangerouslySetInnerHTML={{ __html: comment?.content }} />
						</span>
					</div>
					<Reaction
						handlOpenFeedback={() =>
							handlOpenFeedback(
								comment?._id as string,
								comment?.user?._id,
								comment?.user?.full_name,
							)
						}
						handleLike={() => handleLike(comment?._id)}
						handleDislike={() => handleDislike(comment?._id)}
						comment={comment}
					/>

					{isFeedbackOpen &&
						(isLoggedIn ? (
							<CommentEditor
								onSubmit={onSubmitComment}
								avatar={authUser?.avatarUrl as string}
								handleClose={() => handleClose()}
								openComment
								content={content}
								handleChange={handleChange}
							/>
						) : (
							<div className="bg-blue-400 p-2 px-4 rounded-full">
								Bạn hãy đăng nhập để được bình luận
							</div>
						))}
					{comment?.replies_count !== 0 && (
						<div
							className={cn(
								"text-sm font-semibold text-blue-400 cursor-pointer",
								openAnswer && "hidden",
							)}
							onClick={() => {
								setOpenAnswer(true);
								handleListcommentItems(1);
							}}
						>
							{comment?.replies_count} câu trả lời
						</div>
					)}
				</div>
			</div>
			{openAnswer &&
				commentNotification?.map((comment) => {
					const isFeedbackOpen = openFeedback === comment?._id;
					return (
						<div className="flex items-start gap-1 md:gap-3 w-full pl-8">
							<div className="size-7 md:size-10 rounded-full border">
								<img
									src={comment?.user?.avatarUrl || `/avatar_25.jpg`}
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<div className="flex-1">
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-1">
										<span className="font-semibold text-base">
											{comment?.user?.full_name}
										</span>
										<span className="text-xs text-gray-400">
											{calculateTimeDistance(new Date(comment?.createdAt))}{" "}
											trước
										</span>
									</div>
									<span className="break-all text-sm">
										<div
											dangerouslySetInnerHTML={{ __html: comment?.content }}
										/>
									</span>
								</div>
								<Reaction
									handlOpenFeedback={() =>
										handlOpenFeedback(
											comment?._id as string,
											comment?.user?._id,
											comment?.user?.full_name,
										)
									}
									handleLike={() => handleLike(comment?._id)}
									handleDislike={() => handleDislike(comment?._id)}
									comment={comment}
								/>

								{isFeedbackOpen &&
									(isLoggedIn ? (
										<CommentEditor
											onSubmit={onSubmitComment}
											avatar={authUser?.avatarUrl as string}
											handleClose={() => handleClose()}
											openComment
											content={content}
											handleChange={handleChange}
										/>
									) : (
										<div className="bg-blue-400 p-2 px-4 rounded-full">
											Bạn hãy đăng nhập để được bình luận
										</div>
									))}
							</div>
						</div>
					);
				})}
			{(check?.totalPage as number) > 0 &&
				(check?.pageIndex as number) !== (check?.totalPage as number) && (
					<div
						className="cursor-pointer"
						onClick={() => {
							handleLoadMoreComments();
						}}
					>
						<h3 className="font-bold text-sm text-slate-600 hover:underline pl-9">
							Xem thêm bình luận
						</h3>
					</div>
				)}
		</div>
	);
};

export default CommentItem;
