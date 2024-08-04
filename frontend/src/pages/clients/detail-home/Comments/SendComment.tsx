import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiWink } from "react-icons/bs";
const SendComment = () => {
	const [isOpen, setIsOpen] = useState({
		actions: false,
		focus: false,
		sendComment: true,
	});
	const [isEmoji, setIsEmoji] = useState(false);
	const elements = useRef<{
		content: null | HTMLElement;
		sendComment: null | HTMLButtonElement;
	}>({
		content: null,
		sendComment: null,
	});

	const updateState = (focus: boolean, contentNotEmpty: boolean) => {
		setIsOpen({
			actions: true,
			focus,
			sendComment: !contentNotEmpty,
		});
	};

	const handleFocusOrChange = () => {
		const content = elements.current.content;
		const contentNotEmpty = content && content.innerHTML.trim().length > 0;
		updateState(true, contentNotEmpty as boolean);
	};

	const handleBlur = () => {
		const content = elements.current.content;
		const contentNotEmpty = content && content.innerHTML.trim().length > 0;
		updateState(false, contentNotEmpty as boolean);
	};

	const handleCancel = () => {
		const content = elements.current.content;
		if (content) {
			content.innerHTML = "";
			setIsOpen({ actions: false, focus: false, sendComment: true });
		}
	};
	const sendComment = () => {
		const content = elements.current.content;
		if (content) {
			console.log(content.innerHTML);
		}
	};
	return (
		<div className="flex items-start gap-3">
			<div className="w-10 h-10 min-w-10 min-h-10 max-w-10 max-h-10">
				<img
					src="https://i.pinimg.com/564x/71/07/3d/71073d78daf2072dc0a785160a530439.jpg"
					alt="User avatar"
					className="w-full h-full object-cover rounded-full"
				/>
			</div>
			<div className="flex-1 flex flex-col items-end gap-3">
				<div
					onBlur={handleBlur}
					onFocus={handleFocusOrChange}
					onInput={handleFocusOrChange}
					ref={(e) => (elements.current.content = e)}
					className={cn(
						"w-full border-b border-gray-200 outline-none break-all transition-all duration-500",
						isOpen.focus && "border-blue-500",
					)}
					contentEditable
					data-placeholder="Viết bình luận..."
				/>
				<div
					className={cn(
						"w-full items-center justify-between gap-3 hidden",
						isOpen.actions && "flex",
					)}
				>
					<div>
						<button onClick={() => setIsEmoji((prev) => !prev)}>
							<BsEmojiWink />
						</button>
						{isEmoji && (
							<div className="absolute">
								<Picker
									data={data}
									onEmojiSelect={(value: any) => {
										const content = elements.current.content;
										if (content) {
											content.innerHTML = content.innerHTML + value.native;
											handleFocusOrChange();
										}
									}}
								/>
							</div>
						)}
					</div>
					<div>
						<Button
							onClick={handleCancel}
							className="bg-transparent hover:bg-black/5 text-slate-500 rounded-lg px-5"
						>
							Huỷ
						</Button>
						<Button
							onClick={sendComment}
							disabled={isOpen.sendComment}
							ref={(e) => (elements.current.sendComment = e)}
							className="bg-blue-500 text-white px-5 hover:bg-blue-600"
						>
							Bình luận
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SendComment;
