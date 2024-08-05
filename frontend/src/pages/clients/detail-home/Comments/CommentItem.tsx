import Actions from "./Actions";
import Reaction from "./Reaction";
import SendComment from "./SendComment";

const CommentItem = () => {
	return (
		<div className="flex items-start gap-3 w-full">
			<div className="w-10 h-10 min-w-10 min-h-10 max-w-10 max-h-10">
				<img
					src="https://i.pinimg.com/564x/60/bb/74/60bb743859d72a4dc3a245c3ba1786c2.jpg"
					alt=""
					className="w-full h-full object-cover rounded-full"
				/>
			</div>
			<div>
				<div className="w-11/12">
					<div className="flex items-center gap-1">
						<span className="font-semibold text-base">@toinh2004</span>
						<span className="text-xs text-gray-400">3 năm trước</span>
					</div>
					<span className="break-all">
						đối với dòng nhạc của a e nghĩ cứ làm lyric video như vầy là đúng
						mood r . làm mv thấy k hợp lắm với lại bên mình còn chưa có kinh
						nghiệm lắm nên cứ trau dồi thêm 1 thời gian nữa đến khi đủ sức ra 1
						mv tốt về cả hình ảnh lẫn âm nhạc a nhé. đợi tác phẩm tiếp theo của
						a :D
					</span>
				</div>
				<Reaction />
				<SendComment sizeAvatar={30} />
			</div>
			<div className="">
				<Actions />
			</div>
		</div>
	);
};

export default CommentItem;
