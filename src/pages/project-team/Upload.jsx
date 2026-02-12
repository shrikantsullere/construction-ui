import { useState } from 'react';
import { Camera, MapPin, Upload, X } from 'lucide-react';

const UploadPage = () => {
  const [captured, setCaptured] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <h2 className="font-bold text-xl text-slate-800 mb-4 px-2">Site Camera</h2>

      {!captured ? (
        <div className="flex-1 bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center">
          {/* Mock Camera View */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600')] bg-cover bg-center"></div>

          <div className="relative z-10 w-full h-full flex flex-col justify-between p-6">
            <div className="flex justify-between text-white/70">
              <span>HDR On</span>
              <span>4:3</span>
            </div>

            <div className="flex items-center justify-center gap-8 mb-8">
              <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Upload size={20} />
              </button>
              <button
                onClick={() => setCaptured(true)}
                className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-transparent active:bg-white/20 transition"
              >
                <div className="w-16 h-16 bg-white rounded-full"></div>
              </button>
              <button className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center overflow-hidden border border-white/20">
                <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5" className="w-full h-full object-cover" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col space-y-4">
          <div className="aspect-[4/3] bg-slate-200 rounded-xl overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5" className="w-full h-full object-cover" />
            <button
              onClick={() => setCaptured(false)}
              className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full"
            >
              <X size={16} />
            </button>
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <MapPin size={10} /> 40.7128° N, 74.0060° W
            </div>
          </div>

          <div className="space-y-3 px-1">
            <div>
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea
                className="w-full mt-1 p-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="What did you take a photo of?"
                rows={3}
              ></textarea>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Project</label>
              <select className="w-full mt-1 p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none">
                <option>Skyline Tower</option>
                <option>Riverfront Park</option>
              </select>
            </div>

            <button className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl mt-4 shadow-lg shadow-blue-200">
              Upload Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
