import { useEffect, useState } from "react";
import Actions from "./Actions";
import Reaction from "./Reaction";
import SendComment from "./SendComment";
import CommentEditor from "@/components/common/CommentForm";
import { Comment, IObjectComment } from "@/types/TypeObjectComment";
import { format } from "date-fns";
import TYPE_COMMENT from "@/config/typeComment";
import { useAuth } from "@/hooks/auth";
import { createComment } from "@/service/comment";
type Props = {
	comment: Comment;
};
const CommentItem = ({ comment }: Props) => {
	const { authUser } = useAuth();
	const [content, setContent] = useState(``);
	const [objectComment, setObjectComment] = useState<IObjectComment>({
		commentId: comment?._id,
		commentType: TYPE_COMMENT.COMMENT,
  });
	const [open, setOpen] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  useEffect(() => {
     
   },[]);
	const handlOpenFeedback = () => {
		setOpenFeedback(true);
		if (comment?.user?._id !== authUser?._id) {
			setContent(
				`<span contentEditable="false" class="link-mention">@${comment?.user?.full_name}</span>`,
			);
    }
	};

	const onSubmitComment = async () => {
    console.log("value:", content);
    try {
			const data = await createComment(
				content,
				comment?._id as string,
				TYPE_COMMENT.COMMENT,
			);
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
		setOpenFeedback(false);
	};
	return (
		<div className="flex items-start gap-1 md:gap-3 w-full">
			<div className="size-7 md:size-10 rounded-full border">
				<img
					src={comment?.user?.avatarUrl}
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
							{format(new Date(comment?.createdAt), "dd/MM/yyyy HH:mm:ss")}
						</span>
					</div>
					<span className="break-all text-sm">
						<div
							dangerouslySetInnerHTML={{ __html: comment?.content }}
						/>
					</span>
				</div>
				<Reaction handlOpenFeedback={handlOpenFeedback} />
				{openFeedback && (
					<CommentEditor
						onSubmit={onSubmitComment}
						avatar="/avatar_25.jpg"
						handleClose={handleClose}
						openComment
						content={content}
						handleChange={handleChange}
					/>
				)}
			</div>
		</div>
	);
};

export default CommentItem;
