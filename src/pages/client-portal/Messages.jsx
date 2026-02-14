import { Send, User, MessageCircle, Search, Paperclip, Phone, MoreVertical, Menu } from 'lucide-react';
import { useState } from 'react';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar toggle

  const conversations = [
    { id: 1, name: 'Project Manager', role: 'Lead', avatar: 'PM', status: 'online', unread: 0, lastMsg: 'No problem, we will update you.', time: '10:40 AM' },
    { id: 2, name: 'Site Foreman', role: 'Site', avatar: 'SF', status: 'offline', unread: 2, lastMsg: 'Materials arrived today.', time: '9:15 AM' },
    { id: 3, name: 'Design Team', role: 'Design', avatar: 'DT', status: 'online', unread: 0, lastMsg: 'New sketches uploaded.', time: 'Yesterday' },
    { id: 4, name: 'Billing Dept', role: 'Finance', avatar: 'BD', status: 'offline', unread: 0, lastMsg: 'Invoice #004 is due soon.', time: 'Mon' },
  ];

  const [messages, setMessages] = useState([
    { id: 1, sender: 'Project Manager', text: 'Good morning! Just wanted to let you know that the foundation inspection is scheduled for tomorrow.', timestamp: '10:30 AM', isMe: false },
    { id: 2, sender: 'You', text: 'That sounds great! Will I need to be present for that?', timestamp: '10:35 AM', isMe: true },
    { id: 3, sender: 'Project Manager', text: 'No, looking good! We will send you photos once it is completed.', timestamp: '10:40 AM', isMe: false },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const message = {
      id: messages.length + 1,
      sender: 'You',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
      {/* Sidebar List */}
      <div className={`absolute md:static inset-y-0 left-0 z-20 w-80 bg-slate-50 border-r border-slate-200 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex justify-between items-center">
            Messages
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400"><MoreVertical size={20} /></button>
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => { setActiveChat(chat.id); setSidebarOpen(false); }}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${activeChat === chat.id ? 'bg-white shadow-sm border border-slate-100' : 'hover:bg-slate-100 border border-transparent'}`}
            >
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${activeChat === chat.id ? 'bg-blue-600' : 'bg-slate-400'}`}>
                  {chat.avatar}
                </div>
                {chat.status === 'online' && <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className={`text-sm font-semibold truncate ${activeChat === chat.id ? 'text-slate-900' : 'text-slate-700'}`}>{chat.name}</h3>
                  <span className="text-[10px] text-slate-400">{chat.time}</span>
                </div>
                <p className={`text-xs truncate ${activeChat === chat.id ? 'text-blue-600 font-medium' : 'text-slate-500'}`}>
                  {chat.lastMsg}
                </p>
              </div>
              {chat.unread > 0 && (
                <span className="w-5 h-5 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm shadow-blue-200">
                  {chat.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white w-full relative z-10 md:z-0">
        {/* Chat Header */}
        <div className="h-16 px-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-lg">
              <Menu size={20} />
            </button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold border border-blue-50">PM</div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Project Manager</h3>
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                ● Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <button className="p-2 hover:bg-slate-50 rounded-full transition"><Phone size={18} /></button>
            <button className="p-2 hover:bg-slate-50 rounded-full transition"><Search size={18} /></button>
            <button className="p-2 hover:bg-slate-50 rounded-full transition"><MoreVertical size={18} /></button>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 scroll-smooth">
          <div className="flex justify-center my-4">
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">Today</span>
          </div>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex w-full ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end max-w-[85%] md:max-w-[70%] gap-3 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mb-1 ${msg.isMe ? 'bg-blue-600' : 'bg-slate-400'}`}>
                  {msg.isMe ? 'Me' : 'PM'}
                </div>
                <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`px-5 py-3 rounded-2xl text-sm shadow-sm leading-relaxed
                                        ${msg.isMe
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                    }`}>
                    {msg.text}
                  </div>
                  <span className={`text-[10px] mt-1.5 px-1 font-medium ${msg.isMe ? 'text-blue-600/60' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
          <form onSubmit={handleSendMessage} className="flex gap-3 items-end max-w-4xl mx-auto">
            <button type="button" className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
              <Paperclip size={20} />
            </button>
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl flex items-center focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all overflow-hidden">
              <input
                type="text"
                className="w-full bg-transparent px-4 py-3 text-sm text-slate-800 focus:outline-none placeholder:text-slate-400"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 transition-all disabled:opacity-50 disabled:shadow-none hover:scale-105 active:scale-95"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
