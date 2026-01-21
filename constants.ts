
import { Province, IssueCategory, EvidenceDocument } from './types';

export const PROVINCES: Province[] = ['Punjab', 'Sindh', 'KP', 'Balochistan', 'GB', 'AJK', 'ICT'];

export const CATEGORIES: IssueCategory[] = ['Infrastructure', 'Teachers', 'WASH', 'Security', 'Supplies'];

export const COLORS = {
  unicefBlue: '#0083ca',
  unicefLightBlue: '#e6f3fa',
  urgent: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981'
};

export const INITIAL_REPORTS: any[] = [
  {
    id: '1',
    schoolName: 'Govt High School No. 1',
    emisCode: '35210001',
    province: 'Punjab',
    district: 'Lahore',
    category: 'WASH',
    urgency: 'Critical',
    description: 'No clean drinking water available for 800 students for 3 days.',
    reporterName: 'Ahmed Ali',
    role: 'Principal',
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    schoolName: 'Public Primary School Ziarat',
    emisCode: '12450092',
    province: 'Balochistan',
    district: 'Ziarat',
    category: 'Infrastructure',
    urgency: 'High',
    description: 'Roof collapse in Grade 3 classroom due to heavy snow.',
    reporterName: 'Sara Khan',
    role: 'Teacher',
    timestamp: new Date().toISOString()
  },
  {
    id: '3',
    schoolName: 'Sindh Model School',
    emisCode: '42200115',
    province: 'Sindh',
    district: 'Karachi Central',
    category: 'Teachers',
    urgency: 'Medium',
    description: 'Shortage of mathematics teacher for senior classes.',
    reporterName: 'Imran Shah',
    role: 'Parent',
    timestamp: new Date().toISOString()
  }
];

export const INITIAL_DOCUMENTS: EvidenceDocument[] = [
  {
    id: 'doc1',
    title: 'WASH Assessment Report - Swat',
    description: 'Detailed technical survey of water facilities in Swat district schools.',
    fileType: 'pdf',
    url: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=400&auto=format&fit=crop',
    province: 'KP',
    uploadedBy: 'Field Team Alpha',
    timestamp: '2024-03-10T10:00:00Z'
  },
  {
    id: 'doc2',
    title: 'School Damage Photos - Ziarat',
    description: 'Visual evidence of roof collapse after extreme weather events.',
    fileType: 'image',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop',
    province: 'Balochistan',
    uploadedBy: 'Sara Khan',
    timestamp: '2024-03-12T14:30:00Z'
  }
];
