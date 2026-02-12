import { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, MoreVertical, Search, Paperclip, Menu, X, ArrowLeft } from 'lucide-react';

const Chat = () => {
  const [activeChatId, setActiveChatId] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [isMobileListOpen, setIsMobileListOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const [contacts] = useState([
    { id: 1, name: 'Project Team: Skyline', status: '4 Online', lastMsg: 'Updated the drawings for floor 5.', time: '10:30 AM', unread: 2, avatar: 'https://ui-avatars.com/api/?name=Skyline+Tower&background=0D8ABC&color=fff' },
    { id: 2, name: 'Mike Ross', status: 'Online', lastMsg: 'Can you approve the invoice?', time: '09:15 AM', unread: 0, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: 3, name: 'Sarah Smith', status: 'Offline', lastMsg: 'Meeting reschedule?', time: 'Yesterday', unread: 0, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: 4, name: 'Client: Riverfront', status: 'Online', lastMsg: 'Looks good to proceed.', time: 'Mon', unread: 1, avatar: 'https://ui-avatars.com/api/?name=Riverfront+Park&background=10B981&color=fff' },
  ]);

  // Mock message history
  const [conversations, setConversations] = useState({
    1: [
      { id: 1, sender: 'Mike Ross', text: 'Hey team, just uploaded the new site photos.', time: '10:00 AM', isMe: false },
      { id: 2, sender: 'You', text: 'Great, are the foundation cracks visible?', time: '10:05 AM', isMe: true },
      { id: 3, sender: 'Mike Ross', text: 'Yes, captured in high res. Check the Photos tab.', time: '10:06 AM', isMe: false },
      { id: 4, sender: 'Sarah Smith', text: 'I will review them by noon.', time: '10:15 AM', isMe: false },
      { id: 5, sender: 'You', text: 'Updated the drawings for floor 5.', time: '10:30 AM', isMe: true },
    ],
    2: [
      { id: 1, sender: 'Mike Ross', text: 'Can you approve the invoice?', time: '09:15 AM', isMe: false },
    ],
    3: [
      { id: 1, sender: 'Sarah Smith', text: 'Meeting reschedule?', time: 'Yesterday', isMe: false },
    ],
    4: [
      { id: 1, sender: 'You', text: 'Site inspection is cleared.', time: 'Mon', isMe: true },
      { id: 2, sender: 'Client: Riverfront', text: 'Looks good to proceed.', time: 'Mon', isMe: false },
    ]
  });

  const activeContact = contacts.find(c => c.id === activeChatId);
  const currentMessages = conversations[activeChatId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, activeChatId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now(),
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setConversations({
      ...conversations,
      [activeChatId]: [...(conversations[activeChatId] || []), msg]
    });
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative">

      {/* Sidebar List */}
      <div className={`w-full md:w-80 border-r border-slate-100 flex flex-col bg-slate-50 absolute md:static inset-0 z-20 transition-transform duration-300 ${isMobileListOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input type="text" placeholder="Search chats..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-white">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => { setActiveChatId(contact.id); setIsMobileListOpen(false); }}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50 transition border-b border-slate-50 
                ${activeChatId === contact.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="relative">
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full border border-slate-100" />
                {contact.status === 'Online' && <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className={`text-sm font-semibold truncate ${activeChatId === contact.id ? 'text-blue-700' : 'text-slate-800'}`}>{contact.name}</h4>
                  <span className="text-[10px] text-slate-400">{contact.time}</span>
                </div>
                <p className={`text-xs truncate ${contact.unread > 0 ? 'font-bold text-slate-700' : 'text-slate-500'}`}>{contact.lastMsg}</p>
              </div>
              {contact.unread > 0 && (
                <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center shadow-sm">{contact.unread}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50 w-full">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileListOpen(true)} className="md:hidden text-slate-500 hover:text-slate-800 mr-2">
              <ArrowLeft size={24} />
            </button>
            <img src={activeContact?.avatar} className="w-10 h-10 rounded-full border border-slate-100" />
            <div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base">{activeContact?.name}</h3>
              <p className={`text-xs flex items-center gap-1 ${activeContact?.status === 'Online' || activeContact?.status.includes('Online') ? 'text-emerald-500' : 'text-slate-400'}`}>
                {activeContact?.status === 'Online' || activeContact?.status.includes('Online') ? '● ' : ''}{activeContact?.status}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4 text-slate-400">
            <button className="p-2 hover:bg-slate-100 rounded-full hover:text-blue-600 transition"><Phone size={20} /></button>
            <button className="p-2 hover:bg-slate-100 rounded-full hover:text-blue-600 transition"><Video size={20} /></button>
            <button className="p-2 hover:bg-slate-100 rounded-full hover:text-slate-600 transition"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50/50">
          {currentMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
              <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                {!msg.isMe && <span className="text-xs text-slate-500 mb-1 ml-1">{msg.sender}</span>}
                <div
                  className={`px-4 py-3 rounded-2xl text-sm shadow-sm
                     ${msg.isMe
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'}`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 mx-1.5 opacity-70">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition">
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-200 rounded-lg transition" title="Attach File">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-800 placeholder:text-slate-400 px-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`p-2 rounded-lg shadow-md transition flex items-center justify-center
                    ${newMessage.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-2 text-center">
            <p className="text-[10px] text-slate-400">Press Enter for send</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Chat;
