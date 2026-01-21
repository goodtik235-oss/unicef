
export type Province = 'Punjab' | 'Sindh' | 'KP' | 'Balochistan' | 'GB' | 'AJK' | 'ICT';

export type IssueCategory = 'Infrastructure' | 'Teachers' | 'WASH' | 'Security' | 'Supplies';

export interface SchoolReport {
  id: string;
  schoolName: string;
  emisCode: string;
  province: Province;
  district: string;
  category: IssueCategory;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  reporterName: string;
  role: 'Principal' | 'Teacher' | 'Parent' | 'Student';
  timestamp: string;
}

export interface Feedback {
  id: string;
  message: string;
  rating: number;
  userType: string;
  timestamp: string;
}

export interface EvidenceDocument {
  id: string;
  title: string;
  description: string;
  fileType: 'image' | 'pdf' | 'doc';
  url: string;
  province: Province;
  uploadedBy: string;
  timestamp: string;
}
