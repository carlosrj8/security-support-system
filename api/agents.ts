import { VercelRequest, VercelResponse } from '@vercel/node';

// Mock data for agents
const agents = [
  {
    id: '1',
    name: 'Security Monitor Agent',
    type: 'MONITORING',
    status: 'ACTIVE',
    description: 'Monitors security systems and alerts',
    capabilities: ['monitoring', 'alerting', 'reporting'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Maintenance Agent',
    type: 'MAINTENANCE',
    status: 'ACTIVE',
    description: 'Handles maintenance scheduling and execution',
    capabilities: ['scheduling', 'maintenance', 'diagnostics'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Customer Support Agent',
    type: 'SUPPORT',
    status: 'ACTIVE',
    description: 'Provides customer support and assistance',
    capabilities: ['support', 'communication', 'problem-solving'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Analytics Agent',
    type: 'ANALYTICS',
    status: 'ACTIVE',
    description: 'Analyzes data and generates insights',
    capabilities: ['analytics', 'reporting', 'insights'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Emergency Response Agent',
    type: 'EMERGENCY',
    status: 'ACTIVE',
    description: 'Handles emergency situations and responses',
    capabilities: ['emergency-response', 'alerting', 'coordination'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      data: agents,
      message: 'Agents retrieved successfully'
    });
  } else if (req.method === 'POST') {
    const newAgent = {
      id: String(agents.length + 1),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    agents.push(newAgent);
    res.status(201).json({
      success: true,
      data: newAgent,
      message: 'Agent created successfully'
    });
  } else {
    res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }
}
