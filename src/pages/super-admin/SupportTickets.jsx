import { useState } from 'react';
import { MessageCircle, CheckCircle, AlertTriangle, Clock, Search, MoreHorizontal, Send, User } from 'lucide-react';

const SupportTickets = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1023, subject: 'Cannot add new user', company: 'BuildRight Inc.', priority: 'High', status: 'Open', agent: 'Support Team', created: '2 hrs ago', messages: [
        { sender: 'User', text: 'I am getting an error 500 when adding a user.', time: '2 hrs ago' }
      ]
    },
    {
      id: 1022, subject: 'Billing invoice discrepancy', company: 'Apex Const.', priority: 'Medium', status: 'In Progress', agent: 'Billing Dept', created: '5 hrs ago', messages: [
        { sender: 'User', text: 'Invoice #4002 has wrong tax amount.', time: '5 hrs ago' },
        { sender: 'Billing Dept', text: 'Checking this now.', time: '4 hrs ago' }
      ]
    },
    { id: 1021, subject: 'Feature request: API Access', company: 'SkyHigh Devs', priority: 'Low', status: 'Closed', agent: 'Prod Manager', created: '1 day ago', messages: [] },
    { id: 1020, subject: 'System downtime report', company: 'Miller Homes', priority: 'Critical', status: 'Resolved', agent: 'DevOps', created: '2 days ago', messages: [] },
  ]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filteredTickets = tickets.filter(t => activeTab === 'All' || t.status === activeTab);

  const handleStatusChange = (status) => {
    if (selectedTicket) {
      const updated = { ...selectedTicket, status };
      setTickets(tickets.map(t => t.id === selectedTicket.id ? updated : t));
      setSelectedTicket(updated);
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;

    const newMessage = { sender: 'Support Agent', text: replyText, time: 'Just now' };
    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessage]
    };

    setTickets(tickets.map(t => t.id === selectedTicket.id ? updatedTicket : t));
    setSelectedTicket(updatedTicket);
    setReplyText('');
  };

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Support Tickets</h1>
          <p className="text-slate-500 text-sm">Manage incoming support requests.</p>
        </div>
        <div className="flex gap-4 text-sm font-medium">
          <button onClick={() => setActiveTab('Open')} className={`px-4 py-2 rounded-lg border transition ${activeTab === 'Open' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            Open
          </button>
          <button onClick={() => setActiveTab('Closed')} className={`px-4 py-2 rounded-lg border transition ${activeTab === 'Closed' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            Closed
          </button>
          <button onClick={() => setActiveTab('All')} className={`px-4 py-2 rounded-lg border transition ${activeTab === 'All' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            All Tickets
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        {/* Ticket List */}
        <div className={`${selectedTicket ? 'hidden lg:block' : 'block'} flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm`}>
          <div className="p-4 border-b border-slate-100 bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input type="text" placeholder="Search tickets..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
          <div className="divide-y divide-slate-100 overflow-y-auto">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-4 hover:bg-slate-50 transition cursor-pointer group border-l-4 ${selectedTicket?.id === ticket.id ? 'border-l-blue-500 bg-blue-50' : 'border-l-transparent'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition">{ticket.subject}</h3>
                  <span className="text-xs text-slate-500">{ticket.created}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-slate-500">{ticket.company}</span>
                  <span className="text-slate-400">•</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${ticket.priority === 'High' || ticket.priority === 'Critical' ? 'border-red-200 text-red-600 bg-red-50' : 'border-blue-200 text-blue-600 bg-blue-50'
                    }`}>
                    {ticket.priority}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`flex items-center gap-1 text-xs font-medium 
                    ${ticket.status === 'Open' ? 'text-blue-600' : ticket.status === 'Resolved' || ticket.status === 'Closed' ? 'text-emerald-600' : 'text-orange-600'}`}>
                    {ticket.status === 'Open' && <AlertTriangle size={12} />}
                    {ticket.status === 'Resolved' && <CheckCircle size={12} />}
                    {ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Detail View */}
        <div className={`${selectedTicket ? 'block' : 'hidden lg:block'} w-full lg:w-[500px] xl:w-[600px] bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden shadow-sm`}>
          {selectedTicket ? (
            <>
              <div className="p-6 border-b border-slate-100 bg-white">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-slate-800">{selectedTicket.subject}</h2>
                  <button onClick={() => setSelectedTicket(null)} className="lg:hidden text-slate-400">Back</button>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><User size={14} /> {selectedTicket.company}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {selectedTicket.created}</span>
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedTicket.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="bg-white border border-slate-200 text-slate-800 text-xs rounded px-2 py-1 outline-none"
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                    <option>Closed</option>
                  </select>
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">{selectedTicket.priority} Priority</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
                {/* Original Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">U</div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-slate-700">User</span>
                      <span className="text-xs text-slate-500">Original Request</span>
                    </div>
                    <p className="mt-1 text-slate-700 text-sm bg-white p-3 rounded-tr-xl rounded-b-xl border border-slate-200 shadow-sm">
                      Hi, I am experiencing an issue with {selectedTicket.subject.toLowerCase()}.
                    </p>
                  </div>
                </div>

                {/* Thread */}
                {selectedTicket.messages?.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.sender === 'Support Agent' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${msg.sender === 'Support Agent' ? 'bg-blue-600' : 'bg-slate-200 text-slate-600'}`}>
                      {msg.sender.charAt(0)}
                    </div>
                    <div className={`${msg.sender === 'Support Agent' ? 'items-end' : ''} flex flex-col`}>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-slate-700">{msg.sender}</span>
                        <span className="text-xs text-slate-500">{msg.time}</span>
                      </div>
                      <p className={`mt-1 text-sm p-3 rounded-xl border max-w-xs shadow-sm
                         ${msg.sender === 'Support Agent'
                          ? 'bg-blue-50 border-blue-100 text-blue-900 rounded-tr-none'
                          : 'bg-white border-slate-200 text-slate-700 rounded-tl-none'}`}>
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-blue-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                  />
                  <button onClick={handleSendReply} className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <MessageCircle size={48} className="mb-4 opacity-50 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-700">No Ticket Selected</h3>
              <p className="text-sm mt-2 max-w-xs">Select a ticket from the list to view details and respond.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;
