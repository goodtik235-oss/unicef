
import React, { useState, useEffect } from 'react';
import { SchoolReport, Province, EvidenceDocument } from './types';
import { INITIAL_REPORTS, COLORS, INITIAL_DOCUMENTS } from './constants';
import Dashboard from './components/Dashboard';
import ReportForm from './components/ReportForm';
import DocumentGallery from './components/DocumentGallery';
import { getAIInsights } from './services/geminiService';

const App: React.FC = () => {
  const [reports, setReports] = useState<SchoolReport[]>(INITIAL_REPORTS);
  const [documents, setDocuments] = useState<EvidenceDocument[]>(INITIAL_DOCUMENTS);
  const [isUrdu, setIsUrdu] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'report' | 'gallery' | 'about'>('dashboard');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAddReport = (newReport: Omit<SchoolReport, 'id' | 'timestamp'>) => {
    const report: SchoolReport = {
      ...newReport,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    setReports([report, ...reports]);
  };

  const handleAddDocument = (newDoc: Omit<EvidenceDocument, 'id' | 'timestamp'>) => {
    const doc: EvidenceDocument = {
      ...newDoc,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    setDocuments([doc, ...documents]);
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    const insights = await getAIInsights(reports);
    setAiAnalysis(insights);
    setIsAnalyzing(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isUrdu ? 'text-right rtl' : 'text-left ltr'}`}>
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#0083ca] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#0083ca]">UNICEF</h1>
                <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">Pakistan Education Watch</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'dashboard' ? 'border-[#0083ca] text-[#0083ca]' : 'border-transparent text-gray-500 hover:text-[#0083ca]'}`}
              >
                {isUrdu ? 'ڈیش بورڈ' : 'Dashboard'}
              </button>
              <button 
                onClick={() => setActiveTab('report')}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'report' ? 'border-[#0083ca] text-[#0083ca]' : 'border-transparent text-gray-500 hover:text-[#0083ca]'}`}
              >
                {isUrdu ? 'رپورٹ کریں' : 'Report Issue'}
              </button>
              <button 
                onClick={() => setActiveTab('gallery')}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'gallery' ? 'border-[#0083ca] text-[#0083ca]' : 'border-transparent text-gray-500 hover:text-[#0083ca]'}`}
              >
                {isUrdu ? 'گیلری' : 'Gallery'}
              </button>
              <button 
                onClick={() => setActiveTab('about')}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'about' ? 'border-[#0083ca] text-[#0083ca]' : 'border-transparent text-gray-500 hover:text-[#0083ca]'}`}
              >
                {isUrdu ? 'اثرات' : 'Impact'}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsUrdu(!isUrdu)}
                className="px-4 py-1.5 rounded-full border border-gray-300 text-xs font-bold hover:bg-gray-100 transition-colors"
              >
                {isUrdu ? 'English' : 'اردو'}
              </button>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              {isUrdu 
                ? 'پاکستان کے ہر بچے کے لیے معیاری تعلیم کا تحفظ' 
                : 'Protecting Quality Education for Every Child in Pakistan'}
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              {isUrdu 
                ? 'اسکولوں کی سطح پر مسائل کی نشاندہی کریں اور تعلیم کی بہتری کے لیے یونیسیف کی مدد کریں۔'
                : 'Identify school-level gaps and help UNICEF coordinate data-driven responses for educational improvement.'}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab('report')}
                className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg"
              >
                {isUrdu ? 'مسئلہ رپورٹ کریں' : 'Report an Issue'}
              </button>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="bg-blue-800/30 backdrop-blur-md text-white border border-blue-400/30 px-6 py-3 rounded-xl font-bold hover:bg-blue-800/50 transition-all"
              >
                {isUrdu ? 'اعداد و شمار دیکھیں' : 'View Live Data'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-12">
            <section>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">National Education Dashboard</h2>
                  <p className="text-gray-500">Real-time gap analysis across all districts</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold text-sm">
                  {reports.length} Total Reports
                </div>
              </div>
              <Dashboard reports={reports} />
            </section>

            {/* AI Insights Section */}
            <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="bg-purple-100 p-2 rounded-lg">✨</span>
                    AI Smart Analytics
                  </h3>
                  <p className="text-gray-500 text-sm">Generative AI analysis of regional education trends</p>
                </div>
                <button 
                  onClick={runAnalysis}
                  disabled={isAnalyzing}
                  className={`px-6 py-2 rounded-xl text-white font-bold transition-all ${isAnalyzing ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg active:scale-95'}`}
                >
                  {isAnalyzing ? 'Analyzing Data...' : 'Generate AI Insights'}
                </button>
              </div>
              
              {aiAnalysis ? (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="prose prose-blue max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                      {aiAnalysis}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
                  <p className="text-gray-400 italic">Click the button above to synthesize regional reports using Gemini AI</p>
                </div>
              )}
            </section>

            {/* Recent Reports Table */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Reports Feed</h3>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School / Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reports.map(report => (
                      <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900">{report.schoolName}</div>
                          <div className="text-xs text-gray-500">{report.district}, {report.province}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {report.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            report.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
                            report.urgency === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {report.urgency}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {report.reporterName} ({report.role})
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="max-w-3xl mx-auto">
            <ReportForm onSubmit={handleAddReport} />
          </div>
        )}

        {activeTab === 'gallery' && (
          <DocumentGallery 
            documents={documents} 
            onUpload={handleAddDocument} 
            isUrdu={isUrdu}
          />
        )}

        {activeTab === 'about' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How Your Data Makes an Impact</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">1</div>
                  <div>
                    <h4 className="font-bold text-lg">Bottom-Up Reporting</h4>
                    <p className="text-gray-600">We give a voice to teachers and parents in rural areas where official data often misses school-level realities.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-xl">2</div>
                  <div>
                    <h4 className="font-bold text-lg">Resource Allocation</h4>
                    <p className="text-gray-600">UNICEF uses this data to prioritize WASH (Water, Sanitation, Hygiene) and reconstruction projects based on urgency.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xl">3</div>
                  <div>
                    <h4 className="font-bold text-lg">Government Accountability</h4>
                    <p className="text-gray-600">Aggregate dashboards are shared with provincial education departments to advocate for policy shifts and teacher appointments.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="https://picsum.photos/seed/unicef-pak/600/400" alt="Impact" className="rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-xs">
                <p className="text-sm font-medium text-gray-800 italic">"This platform helped us get safe water for 300 girls in our Swat school within 2 months of reporting."</p>
                <p className="text-xs text-blue-600 font-bold mt-2">— Secondary School Teacher</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <h4 className="text-white font-bold text-lg mb-4">UNICEF Pakistan - Education Watch</h4>
              <p className="text-sm max-w-md">The UNICEF Pakistan School Information Portal is a digital bridge connecting grassroots educational challenges with international support and government action. We believe every child deserves a safe, well-equipped learning environment.</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Regions</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Punjab Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sindh Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">KP & Balochistan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GB & AJK</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Resources</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">WASH Standards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Child Protection Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency Response</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs">© 2024 UNICEF Pakistan Education Monitoring Unit. All Rights Reserved.</p>
            <div className="flex gap-6 text-xs">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Contact Us</a>
              <a href="#" className="hover:text-white">Report Misconduct</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
