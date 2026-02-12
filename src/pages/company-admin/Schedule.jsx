import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X, Save, AlertTriangle, Trash2, Edit, CheckCircle } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const Schedule = () => {
  const [currentMonth, setCurrentMonth] = useState('February 2026');
  const [events, setEvents] = useState([
    { id: 1, title: 'Foundation Pour', project: 'Skyline Tower', start: 2, end: 4, color: 'bg-blue-500', description: 'Pouring main concrete foundation.' },
    { id: 2, title: 'Steel Framework', project: 'Riverfront Park', start: 5, end: 12, color: 'bg-emerald-500', description: 'Erecting steel support structures.' },
    { id: 3, title: 'Electrical Wiring', project: 'City Center Mall', start: 10, end: 15, color: 'bg-orange-500', description: 'Rough-in for 1st floor electrical.' },
    { id: 4, title: 'Plumbing Rough-in', project: 'Skyline Tower', start: 18, end: 22, color: 'bg-purple-500', description: 'Main water line connections.' },
    { id: 5, title: 'Roof Installation', project: 'Green Valley', start: 25, end: 28, color: 'bg-red-500', description: 'Mounting roof panels.' },
  ]);

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '', project: '', start: 1, end: 1, color: 'bg-blue-500', description: ''
  });

  const daysInMonth = 28; // Feb 2026
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Handlers
  const openAddModal = () => {
    setFormData({ title: '', project: '', start: 1, end: 1, color: 'bg-blue-500', description: '' });
    setIsAddOpen(true);
  };

  const handleSaveAdd = () => {
    const newEvent = { ...formData, id: Date.now() };
    setEvents([...events, newEvent]);
    setIsAddOpen(false);
  };

  const openViewModal = (event) => {
    setSelectedEvent(event);
    setIsViewOpen(true);
  };

  const openEditModal = () => {
    setFormData(selectedEvent);
    setIsEditOpen(true);
    setIsViewOpen(false); // Close view, open edit
  };

  const handleSaveEdit = () => {
    setEvents(events.map(e => e.id === selectedEvent.id ? formData : e));
    setIsEditOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteOpen(true);
    setIsViewOpen(false);
  };

  const confirmDelete = () => {
    setEvents(events.filter(e => e.id !== selectedEvent.id));
    setIsDeleteOpen(false);
  };

  const EventForm = ({ data, setData, onSubmit, submitLabel }) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Event Title</label>
        <input
          type="text"
          value={data.title}
          onChange={e => setData({ ...data, title: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
          placeholder="e.g. Site Inspection"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
        <input
          type="text"
          value={data.project}
          onChange={e => setData({ ...data, project: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
          placeholder="e.g. Skyline Tower"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Start Day (Feb)</label>
          <input
            type="number"
            min="1" max="28"
            value={data.start}
            onChange={e => setData({ ...data, start: parseInt(e.target.value) })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">End Day (Feb)</label>
          <input
            type="number"
            min={data.start} max="28"
            value={data.end}
            onChange={e => setData({ ...data, end: parseInt(e.target.value) })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Color Code</label>
        <select
          value={data.color}
          onChange={e => setData({ ...data, color: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition"
        >
          <option value="bg-blue-500">Blue</option>
          <option value="bg-emerald-500">Emerald</option>
          <option value="bg-orange-500">Orange</option>
          <option value="bg-purple-500">Purple</option>
          <option value="bg-red-500">Red</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea
          value={data.description}
          onChange={e => setData({ ...data, description: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 transition h-20 resize-none"
          placeholder="Details about the event..."
        />
      </div>
      <div className="flex justify-end pt-2">
        <button
          onClick={onSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-lg shadow-blue-200 flex items-center gap-2"
        >
          <Save size={18} /> {submitLabel}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Project Schedule</h1>
          <p className="text-slate-500 text-sm">Manage timelines and milestones.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200"
        >
          <Plus size={18} /> Add Event
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft size={20} /></button>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <CalendarIcon size={24} className="text-blue-600" />
              {currentMonth}
            </h2>
            <button className="p-2 hover:bg-slate-100 rounded-full"><ChevronRight size={20} /></button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="flex items-center gap-1 text-xs text-slate-600"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Skyline</span>
            <span className="flex items-center gap-1 text-xs text-slate-600"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Riverfront</span>
            <span className="flex items-center gap-1 text-xs text-slate-600"><div className="w-3 h-3 rounded-full bg-orange-500"></div> City Center</span>
          </div>
        </div>

        {/* Gantt / Calendar Hybrid View */}
        <div className="overflow-x-auto pb-4 custom-scrollbar">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-28 gap-px bg-slate-200 border border-slate-200 rounded-t-lg">
              {days.map(d => (
                <div key={d} className="bg-slate-50 p-2 text-center text-xs font-semibold text-slate-600">
                  {d}
                </div>
              ))}
            </div>

            <div className="border-x border-b border-slate-200 bg-white relative h-80 rounded-b-lg">
              {/* Grid Lines */}
              <div className="absolute inset-0 grid grid-cols-28 pointer-events-none">
                {days.map(d => <div key={d} className="border-r border-slate-100 h-full"></div>)}
              </div>

              {/* Events */}
              <div className="relative pt-4 space-y-3 z-10 px-0.5">
                {events.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => openViewModal(event)}
                    className={`absolute h-8 rounded-md shadow-sm ${event.color} text-white text-xs px-2 flex items-center cursor-pointer hover:brightness-110 transition-all hover:scale-[1.01] hover:shadow-md hover:z-20`}
                    style={{
                      left: `${((event.start - 1) / daysInMonth) * 100}%`,
                      width: `${((event.end - event.start + 1) / daysInMonth) * 100}%`,
                      top: `${(events.indexOf(event) * 40) + 20}px` // Simple stacking logic
                    }}
                    title={`${event.title} (${event.project})`}
                  >
                    <span className="font-bold truncate">{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Upcoming Milestones</h3>
          <ul className="space-y-4">
            {events.slice(0, 3).map(event => (
              <li key={event.id} className="flex justify-between items-center border-b border-slate-50 pb-2 last:border-0 hover:bg-slate-50 p-2 rounded-lg transition cursor-pointer" onClick={() => openViewModal(event)}>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{event.title}</p>
                  <p className="text-xs text-slate-500">{event.project}</p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">Feb {event.start}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modals */}

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Event">
        <EventForm data={formData} setData={setFormData} onSubmit={handleSaveAdd} submitLabel="Add Event" />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Event">
        <EventForm data={formData} setData={setFormData} onSubmit={handleSaveEdit} submitLabel="Save Changes" />
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Event Details">
        {selectedEvent && (
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-bold text-slate-800">{selectedEvent.title}</h4>
              <p className="text-sm text-slate-500 font-medium">{selectedEvent.project}</p>
            </div>
            <div className="flex gap-2">
              <span className={`px-2 py-1 rounded text-xs font-bold text-white ${selectedEvent.color}`}>
                {selectedEvent.start} Feb - {selectedEvent.end} Feb
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-sm text-slate-700">{selectedEvent.description || "No additional details provided."}</p>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={openEditModal} className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition text-sm font-medium border border-orange-200">
                <Edit size={16} /> Edit
              </button>
              <button onClick={openDeleteModal} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium border border-red-200">
                <Trash2 size={16} /> Delete
              </button>
              <button onClick={() => setIsViewOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition text-sm font-medium">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Event">
        <div className="text-center space-y-4">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="text-red-600" size={32} />
          </div>
          <div>
            <p className="font-medium text-slate-800">Are you sure you want to delete this event?</p>
            <p className="text-sm text-slate-500 mt-1">This action cannot be undone.</p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition font-medium">
              Cancel
            </button>
            <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium shadow-lg shadow-red-200">
              Delete
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Schedule;
