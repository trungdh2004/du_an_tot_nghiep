import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type Props = {
	message: string;
	isMe: boolean;
};
const ChatMessage = ({ message, isMe }: Props) => (
	<div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}>
		{!isMe && (
			<Avatar className="w-8 h-8 mr-2">
				<AvatarImage src="/api/placeholder/32/32" />
				<AvatarFallback>SC</AvatarFallback>
			</Avatar>
		)}
		<div
			className={`max-w-[70%] ${isMe ? "bg-purple-500 text-white" : "bg-gray-100"} rounded-2xl px-4 py-2`}
		>
			<p>{message}</p>
		</div>
	</div>
);
export default ChatMessage;
