import { Image, MoreVertical, Filter, Download } from 'lucide-react';

const Photos = () => {
  const photos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600', title: 'Site Overview', project: 'Skyline Tower', date: 'Feb 10, 2026', uploader: 'Mike Ross' },
    { id: 2, url: 'https://images.unsplash.com/photo-1590644365607-1c5a38fc43a0?auto=format&fit=crop&q=80&w=600', title: 'Foundation Work', project: 'Riverfront Park', date: 'Feb 09, 2026', uploader: 'Sarah Smith' },
    { id: 3, url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=600', title: 'Structure Lvl 1', project: 'Skyline Tower', date: 'Feb 08, 2026', uploader: 'John Doe' },
    { id: 4, url: 'https://images.unsplash.com/photo-1581094794329-cd1196532882?auto=format&fit=crop&q=80&w=600', title: 'Electrical Panel', project: 'City Center', date: 'Feb 08, 2026', uploader: 'Technician A' },
    { id: 5, url: 'https://images.unsplash.com/photo-1535732820275-9ffd998cac22?auto=format&fit=crop&q=80&w=600', title: 'Material Delivery', project: 'Skyline Tower', date: 'Feb 07, 2026', uploader: 'Logistics Team' },
    { id: 6, url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600', title: 'Safety Meeting', project: 'General', date: 'Feb 05, 2026', uploader: 'Admin' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Site Photos</h1>
          <p className="text-slate-500 text-sm">Centralized gallery for all project documentation.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50">
            <Filter size={18} /> Filter
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200">
            Upload New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition">
            <div className="aspect-square relative overflow-hidden bg-slate-100">
              <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white/90 p-2 rounded-full text-slate-800 hover:text-blue-600 font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition">
                  <Download size={20} />
                </button>
              </div>
            </div>
            <div className="p-3">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-slate-800 text-sm truncate pr-2">{photo.title}</h4>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical size={16} />
                </button>
              </div>
              <p className="text-xs text-blue-600 font-medium">{photo.project}</p>
              <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
                <span>{photo.date}</span>
                <span>by {photo.uploader}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
