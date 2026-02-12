import { AlertCircle, CheckCircle, Clock, Filter, Plus } from 'lucide-react';

const Issues = () => {
  const issues = [
    { id: 1, title: 'Cracked Concrete Slab', project: 'Skyline Tower', priority: 'High', status: 'Open', assignee: 'Mike Ross', due: 'Feb 15' },
    { id: 2, title: 'Incorrect Wiring Gauge', project: 'City Center', priority: 'Critical', status: 'In Progress', assignee: 'Electrician Team', due: 'Feb 12' },
    { id: 3, title: 'Missing Safety Railing', project: 'Riverfront Park', priority: 'Medium', status: 'Open', assignee: 'Sarah Smith', due: 'Feb 18' },
    { id: 4, title: 'Paint Color Mismatch', project: 'Skyline Tower', priority: 'Low', status: 'Resolved', assignee: 'Painters Inc.', due: 'Feb 10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Issues & Snags</h1>
          <p className="text-slate-500 text-sm">Track and resolve on-site problems.</p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-lg shadow-red-200 flex items-center gap-2">
          <Plus size={18} /> Report Issue
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {/* Kanban Columns */}
        {['Open', 'In Progress', 'Resolved'].map((status) => (
          <div key={status} className="flex-1 min-w-[300px] bg-slate-100 rounded-xl p-4">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center justify-between">
              {status}
              <span className="bg-slate-200 text-slate-500 text-xs px-2 py-1 rounded-full">{issues.filter(i => i.status === status).length}</span>
            </h3>

            <div className="space-y-3">
              {issues.filter(i => i.status === status).map(issue => (
                <div key={issue.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold
                      ${issue.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                        issue.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'}`}>
                      {issue.priority}
                    </span>
                    <span className="text-xs text-slate-400">#{issue.id}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">{issue.title}</h4>
                  <p className="text-xs text-slate-500 mb-3">{issue.project}</p>

                  <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {issue.assignee.charAt(0)}
                      </div>
                      <span className="text-xs text-slate-500">{issue.assignee}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{issue.due}</span>
                  </div>
                </div>
              ))}
              {issues.filter(i => i.status === status).length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm italic">
                  No issues in this stage
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Issues;
