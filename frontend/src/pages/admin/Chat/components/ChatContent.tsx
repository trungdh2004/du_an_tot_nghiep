import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Smile } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createMessage, findConversation, pagingMessage } from "@/service/chat";
import { IConversation } from "./Conversation";
import { Button } from "@/components/ui/button";
import { CiLogout } from "react-icons/ci";
import EmojiModal from "@/components/common/EmojiModal";
import { useAuth } from "@/hooks/auth";

export interface IMessage {
	_id: string;
	conversation: string;
	user: User;
	content: string;
	sender: string;
	read: string[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export interface User {
	_id: string;
	full_name: string;
	email: string;
	avatarUrl: string;
}

type PropState = {
	content: IMessage[];
	pageIndex: number;
	totalPage: number;
	totalAllOptions: number;
};

const ChatContent = () => {
	const { id } = useParams();
	const [message, setMessage] = useState<PropState>({
		content: [],
		pageIndex: 1,
		totalPage: 0,
		totalAllOptions: 0,
	});
	const [messageNew, setMessageNew] = useState("");
	const [conversation, setConversation] = useState<IConversation>();
	const [loading, setLoading] = useState(false);
	const [scroll, setScroll] = useState(false);
	const { socket } = useAuth();

	const refBox = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (socket) {
			socket?.emit("joinChat", id as string);
			socket.on("messageSender",(message) => {
				console.log("message",message);
				setMessage((prev) => ({
					...prev,
					content: [...prev.content, message],
				}));
				setScroll(true)
			})
		}
		(async () => {
			try {
				setLoading(true);
				const { data: conversation } = await findConversation(id as string);
				setConversation(conversation);

				const { data } = await pagingMessage(id as string, 1);
				setMessage(data);
			} catch (error) {
			} finally {
				setLoading(false);
				setScroll(true);
			}
		})();

		return () => {
			if (socket) {
				socket?.emit("leaveRoom", id as string);
			}
		};
	}, [id]);


	const handleNewMessage = async () => {
		try {
			const { data } = await createMessage(messageNew, "ADMIN", id as string);
			setMessage((prev) => ({
				...prev,
				content: [...prev.content, data.data],
			}));
			if (socket) {
				socket?.emit("newMessage", data?.data, data?.conversation);
			}
			setScroll(true);
			setMessageNew("")
		} catch (error) {}
	};

	useEffect(() => {
		if (scroll) {
			if (refBox.current) {
				refBox.current.scrollTop = refBox.current.scrollHeight;
			}
			setScroll(false);
		}
	}, [scroll]);
	return (
		<div className="h-full flex flex-col">
			<header className="flex items-center justify-between w-full px-3 border-b h-[60px]">
				<div className="flex items-center gap-3">
					<div className="overflow-hidden border rounded-full size-10">
						<img src="/avatar_25.jpg" alt="" />
					</div>
					<div>
						<h2 className="font-semibold">{conversation?.user?.full_name}</h2>
						<span className="text-sm text-green-500">online</span>
					</div>
				</div>

				<Button variant={"outline"} className="block md:hidden">
					<CiLogout size={20} />
				</Button>
			</header>
			<div
				className=" flex-1 block scroll-custom overflow-y-auto space-y-2 p-2"
				ref={refBox}
			>
				{message?.content.map((msg) => <ChatMessage key={msg._id} {...msg} />)}
			</div>

			<div className="p-4 border-t">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleNewMessage();
					}}
					className="flex items-center gap-2"
				>
					<EmojiModal
						getEmoji={(e) => {
							setMessageNew((prev) => `${prev}${e.native}`);
						}}
					/>
					<Input
						placeholder="Type your message here..."
						className="flex-1"
						value={messageNew}
						onChange={(e) => setMessageNew(e.target.value)}
					/>
					<Button variant={"ghost"} disabled={!messageNew} type="submit">
						<Send className="w-6 h-6 text-purple-500" />
					</Button>
				</form>
			</div>
		</div>
	);
};
export default ChatContent;
