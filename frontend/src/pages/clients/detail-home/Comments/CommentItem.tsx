import { useState } from "react";
import Actions from "./Actions";
import Reaction from "./Reaction";
import SendComment from "./SendComment";
import CommentEditor from "@/components/common/CommentForm";

const CommentItem = () => {
	const [content, setContent] = useState("");
	const [open, setOpen] = useState(false);
	const [openFeedback, setOpenFeedback] = useState(false);

	const handlOpenFeedback = () => {
		setOpenFeedback(true);
	};

	const onSubmitComment = () => {
		console.log("value:", content);
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
					src="https://i.pinimg.com/564x/60/bb/74/60bb743859d72a4dc3a245c3ba1786c2.jpg"
					alt=""
					className="w-full h-full object-cover rounded-full"
				/>
			</div>
			<div className="flex-1">
				<div className="">
					<div className="flex items-center gap-1">
						<span className="font-semibold text-base">@toinh2004</span>
						<span className="text-xs text-gray-400">3 năm trước</span>
					</div>
					<span className="break-all text-sm">
						đối với dòng nhạc của a e nghĩ cứ làm lyric video như vầy là đúng
						mood r . làm mv thấy k hợp lắm với lại bên mình còn chưa có kinh
						nghiệm lắm nên cứ trau dồi thêm 1 thời gian nữa đến khi đủ sức ra 1
						mv tốt về cả hình ảnh lẫn âm nhạc a nhé. đợi tác phẩm tiếp theo của
						a :D
					</span>
				</div>
				<Reaction handlOpenFeedback={handlOpenFeedback} isLike />
				{openFeedback && (
					<CommentEditor
						onSubmit={onSubmitComment}
						avatar="/avatar_25.jpg"
						handleClose={handleClose}
						openComment
					/>
				)}
			</div>
		</div>
	);
};

export default CommentItem;
