import { useState } from 'react';
import { Send, Phone, Video, MoreVertical, Search, Paperclip } from 'lucide-react';

const Chat = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');

  const contacts = [
    { id: 1, name: 'Project Team: Skyline', lastMsg: 'Updated the drawings for floor 5.', time: '10:30 AM', unread: 2, avatar: 'https://ui-avatars.com/api/?name=Skyline+Tower&background=0D8ABC&color=fff' },
    { id: 2, name: 'Mike Ross', lastMsg: 'Can you approve the invoice?', time: '09:15 AM', unread: 0, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: 3, name: 'Sarah Smith', lastMsg: 'Meeting reschedule?', time: 'Yesterday', unread: 0, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: 4, name: 'Client: Riverfront', lastMsg: 'Looks good to proceed.', time: 'Mon', unread: 0, avatar: 'https://ui-avatars.com/api/?name=Riverfront+Park&background=10B981&color=fff' },
  ];

  const messages = [
    { id: 1, sender: 'Mike Ross', text: 'Hey team, just uploaded the new site photos.', time: '10:00 AM', isMe: false },
    { id: 2, sender: 'Me', text: 'Great, are the foundation cracks visible?', time: '10:05 AM', isMe: true },
    { id: 3, sender: 'Mike Ross', text: 'Yes, captured in high res. Check the Photos tab.', time: '10:06 AM', isMe: false },
    { id: 4, sender: 'Sarah Smith', text: 'I will review them by noon.', time: '10:15 AM', isMe: false },
    { id: 5, sender: 'Me', text: 'Updated the drawings for floor 5.', time: '10:30 AM', isMe: true },
  ];

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">

      {/* Sidebar List */}
      <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input type="text" placeholder="Search chats..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setActiveChat(contact.id)}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-white transition border-b border-slate-100 
                ${activeChat === contact.id ? 'bg-white border-l-4 border-l-blue-600 shadow-sm' : ''}`}
            >
              <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className={`text-sm font-semibold truncate ${activeChat === contact.id ? 'text-blue-700' : 'text-slate-800'}`}>{contact.name}</h4>
                  <span className="text-xs text-slate-400">{contact.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate">{contact.lastMsg}</p>
              </div>
              {contact.unread > 0 && (
                <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">{contact.unread}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white shadow-sm z-10">
          <div className="flex items-center gap-3">
            <img src={contacts[0].avatar} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-bold text-slate-800">Project Team: Skyline</h3>
              <p className="text-xs text-emerald-500 flex items-center gap-1">● 4 Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button className="hover:text-blue-600"><Phone size={20} /></button>
            <button className="hover:text-blue-600"><Video size={20} /></button>
            <button className="hover:text-slate-600"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex flex-col max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                {!msg.isMe && <span className="text-xs text-slate-500 mb-1 ml-1">{msg.sender}</span>}
                <div
                  className={`p-3 rounded-2xl text-sm shadow-sm
                     ${msg.isMe
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'}`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 mx-1.5">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-800 placeholder:text-slate-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition">
              <Send size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Chat;
