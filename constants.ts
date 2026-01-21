
import { Province, IssueCategory } from './types';

export const PROVINCES: Province[] = ['Punjab', 'Sindh', 'KP', 'Balochistan', 'GB', 'AJK', 'ICT'];

export const CATEGORIES: IssueCategory[] = ['Infrastructure', 'Teachers', 'WASH', 'Security', 'Supplies'];

export const COLORS = {
  unicefBlue: '#0083ca',
  unicefLightBlue: '#e6f3fa',
  urgent: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981'
};

export const INITIAL_REPORTS = [
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
