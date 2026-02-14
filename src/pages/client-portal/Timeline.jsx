import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Timeline = () => {
  const events = [
    {
      id: 1,
      title: 'Foundation Poured',
      date: 'Feb 10, 2026',
      status: 'Completed',
      description: 'Concrete foundation pouring completed successfully.',
      icon: CheckCircle,
      color: 'text-emerald-500 bg-emerald-50 border-emerald-200'
    },
    {
      id: 2,
      title: 'Framing Inspection',
      date: 'Feb 15, 2026',
      status: 'Upcoming',
      description: 'Scheduled inspection for the structural framing.',
      icon: Clock,
      color: 'text-blue-500 bg-blue-50 border-blue-200'
    },
    {
      id: 3,
      title: 'Plumbing Rough-in',
      date: 'Feb 20, 2026',
      status: 'Pending',
      description: 'Plumbing rough-in to begin after framing approval.',
      icon: AlertCircle,
      color: 'text-orange-500 bg-orange-50 border-orange-200'
    },
    {
      id: 4,
      title: 'Electrical Walkthrough',
      date: 'Feb 25, 2026',
      status: 'Scheduled',
      description: 'Client walkthrough to confirm outlet locations.',
      icon: Calendar,
      color: 'text-purple-500 bg-purple-50 border-purple-200'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Project Timeline</h1>
        <p className="text-slate-500 text-sm">Track key milestones and upcoming events for your project.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="relative border-l-2 border-slate-100 ml-3 md:ml-6 space-y-8">
          {events.map((event, index) => (
            <div key={event.id} className="relative pl-8 md:pl-12">
              <span className={`absolute -left-[13px] md:-left-[17px] top-0 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border-4 border-white ${event.color} shadow-sm`}>
                <event.icon size={16} className="md:w-5 md:h-5" />
              </span>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1">
                <h3 className="text-lg font-bold text-slate-800">{event.title}</h3>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded inline-block w-fit mt-1 md:mt-0">{event.date}</span>
              </div>
              <p className="text-slate-600 text-sm mb-2">{event.description}</p>
              <span className={`text-xs font-bold px-2 py-1 rounded-full border ${event.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
