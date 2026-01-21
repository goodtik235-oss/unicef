
import React, { useState } from 'react';
import { EvidenceDocument, Province } from '../types';
import { PROVINCES } from '../constants';

interface DocumentGalleryProps {
  documents: EvidenceDocument[];
  onUpload: (doc: Omit<EvidenceDocument, 'id' | 'timestamp'>) => void;
  isUrdu: boolean;
}

const DocumentGallery: React.FC<DocumentGalleryProps> = ({ documents, onUpload, isUrdu }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [newDoc, setNewDoc] = useState({
    title: '',
    description: '',
    province: 'Punjab' as Province,
    fileType: 'image' as any,
    uploadedBy: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpload({
      ...newDoc,
      url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=400&auto=format&fit=crop' // Placeholder
    });
    setNewDoc({ title: '', description: '', province: 'Punjab', fileType: 'image', uploadedBy: '' });
    setShowUpload(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{isUrdu ? 'دستاویزی گیلری' : 'Evidence Gallery'}</h2>
          <p className="text-gray-500">{isUrdu ? 'اسکولوں کے معائنے کی تصاویر اور رپورٹس' : 'Visual evidence and official documentation'}</p>
        </div>
        <button 
          onClick={() => setShowUpload(!showUpload)}
          className="bg-[#0083ca] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          {isUrdu ? 'اپ لوڈ کریں' : 'Upload Evidence'}
        </button>
      </div>

      {showUpload && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                <input 
                  required
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  value={newDoc.title}
                  onChange={e => setNewDoc({...newDoc, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  value={newDoc.province}
                  onChange={e => setNewDoc({...newDoc, province: e.target.value as Province})}
                >
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  value={newDoc.fileType}
                  onChange={e => setNewDoc({...newDoc, fileType: e.target.value as any})}
                >
                  <option value="image">Image / Photo</option>
                  <option value="pdf">PDF Document</option>
                  <option value="doc">Word / Text File</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <textarea 
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  value={newDoc.description}
                  onChange={e => setNewDoc({...newDoc, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reporter Name</label>
                <input 
                  required
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  value={newDoc.uploadedBy}
                  onChange={e => setNewDoc({...newDoc, uploadedBy: e.target.value})}
                />
              </div>
              <div className="pt-2">
                 <button 
                  type="submit"
                  className="w-full bg-[#0083ca] text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md mt-4"
                >
                  Confirm Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {documents.map(doc => (
          <div key={doc.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="h-48 bg-gray-100 relative overflow-hidden">
              <img src={doc.url} alt={doc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-[10px] font-bold rounded-md shadow-sm ${
                  doc.fileType === 'pdf' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {doc.fileType.toUpperCase()}
                </span>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="px-2 py-1 text-[10px] font-bold bg-white/90 backdrop-blur rounded-md text-gray-700">
                  {doc.province}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-900 truncate mb-1">{doc.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3 h-8">{doc.description}</p>
              <div className="flex justify-between items-center text-[10px] text-gray-400 font-medium">
                <span>By {doc.uploadedBy}</span>
                <span>{new Date(doc.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="px-4 pb-4">
               <button className="w-full py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-[#0083ca] hover:bg-blue-50 transition-colors">
                 View Document
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentGallery;
