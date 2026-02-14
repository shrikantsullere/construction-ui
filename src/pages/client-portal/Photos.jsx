import { Image, X } from 'lucide-react';
import { useState } from 'react';

const Photos = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = [
    { id: 1, src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&auto=format&fit=crop', title: 'Foundation Work', date: 'Feb 10, 2026' },
    { id: 2, src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&auto=format&fit=crop', title: 'Framing Progress', date: 'Feb 15, 2026' },
    { id: 3, src: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=500&auto=format&fit=crop', title: 'Kitchen Layout', date: 'Feb 18, 2026' },
    { id: 4, src: 'https://images.unsplash.com/photo-1621252179027-94459d27d3ee?w=500&auto=format&fit=crop', title: 'Roofing Details', date: 'Feb 20, 2026' },
    { id: 5, src: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop', title: 'Plumbing Rough-in', date: 'Feb 22, 2026' },
    { id: 6, src: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=500&auto=format&fit=crop', title: 'Electrical Wiring', date: 'Feb 25, 2026' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Project Photos</h1>
        <p className="text-slate-500 text-sm">Visual progress of your ongoing construction.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="aspect-video w-full overflow-hidden bg-slate-100">
              <img
                src={photo.src}
                alt={photo.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                {photo.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
                <Image size={12} /> {photo.date}
              </p>
            </div>
            {/* Hover Overlay Icon */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/10 group-hover:opacity-100 pointer-events-none">
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300 animate-fade-in" onClick={() => setSelectedPhoto(null)}>
          <button
            className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedPhoto(null)}
          >
            <X size={32} />
          </button>
          <div className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-h-[85vh] w-auto object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 className="text-xl font-bold">{selectedPhoto.title}</h3>
              <p className="text-sm opacity-80">{selectedPhoto.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
