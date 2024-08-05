import CommentItem from "./CommentItem";
import FilterComment from "./FilterComment";
import SendComment from "./SendComment";

const Comments = () => {
	return (
		<div>
			<div className="mb-3 flex items-center gap-2">
				<h3 className="font-bold text-xl text-slate-600"> 959 bình luận</h3>
				<FilterComment />
			</div>
			<SendComment />
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
