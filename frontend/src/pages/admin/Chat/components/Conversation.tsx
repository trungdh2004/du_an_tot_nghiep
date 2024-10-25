import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
type Props = {
    setSelectedChat:Dispatch<SetStateAction<string>>;
}
const Conversation = ({setSelectedChat}:Props) => {
  const chats = [
    {
      id: 1,
      name: 'Olivia',
      avatar: '/api/placeholder/32/32',
      lastMessage: 'Need to go for lunch?',
      time: '1:32PM',
      online: true
    },
    {
      id: 2,
      name: 'Scarlett',
      avatar: '/api/placeholder/32/32',
      lastMessage: 'Typing...',
      time: '12:24PM',
      online: true,
      unread: 2
    },
  ];
  return (
      <div >
        <div className="p-4 border-b">
          <h1 className="mb-4 text-xl font-semibold">Messages</h1>
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-500 left-3 top-3" />
            <Input 
              placeholder="Search Chat" 
              className="pl-9"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-2">
            <h3 className="px-2 py-1 text-sm text-gray-500">ACTIVE CHATS</h3>
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSelectedChat(String(chat?.id));
                }}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{chat.name}</span>
                    <span className="text-sm text-gray-500">{chat.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">{chat.lastMessage}</span>
                    {chat.unread && (
                      <Badge variant="secondary" className="bg-green-100">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>     
  );
};

export default Conversation;