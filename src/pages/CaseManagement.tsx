import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  SmartToy as BotIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

interface Case {
  id: string;
  title: string;
  type: string;
  status: string;
  priority: string;
  clientId: string;
  clientName: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

interface CaseHistory {
  id: string;
  message: string;
  from: string;
  fromType: 'client' | 'agent' | 'technician' | 'system';
  timestamp: string;
  metadata?: any;
}

const CaseManagement: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([
    {
      id: '1',
      title: 'Camera offline - Entrance',
      type: 'camera_offline',
      status: 'in_progress',
      priority: 'high',
      clientId: 'CLI123456789',
      clientName: 'Restaurant ABC',
      assignedTo: 'Tech-001',
      createdAt: '2024-01-15T09:30:00Z',
      updatedAt: '2024-01-15T10:15:00Z',
      description: 'Camera at main entrance showing no signal',
    },
    {
      id: '2',
      title: 'Alarm system false trigger',
      type: 'alarm_issue',
      status: 'pending',
      priority: 'medium',
      clientId: 'CLI987654321',
      clientName: 'Bar XYZ',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      description: 'Motion sensor triggering false alarms in zone 3',
    },
  ]);

  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [caseHistory, setCaseHistory] = useState<CaseHistory[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [generateDialogOpen, setGenerateDialogOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 250 },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value.replace('_', ' ')} 
          size="small" 
          variant="outlined"
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small"
          color={getStatusColor(params.value)}
        />
      ),
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 100,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small"
          color={getPriorityColor(params.value)}
        />
      ),
    },
    { field: 'clientName', headerName: 'Client', width: 180 },
    { field: 'assignedTo', headerName: 'Assigned To', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          size="small"
          startIcon={<ViewIcon />}
          onClick={() => handleViewCase(params.row)}
        >
          View
        </Button>
      ),
    },
  ];

  const getStatusColor = (status: string): any => {
    switch (status) {
      case 'resolved': return 'success';
      case 'in_progress': return 'info';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string): any => {
    switch (priority) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const handleViewCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
    // Mock case history
    setCaseHistory([
      {
        id: '1',
        message: 'Case created automatically by system',
        from: 'System',
        fromType: 'system',
        timestamp: caseItem.createdAt,
      },
      {
        id: '2',
        message: 'Client confirmed camera issue via WhatsApp',
        from: 'Client Agent',
        fromType: 'agent',
        timestamp: '2024-01-15T09:35:00Z',
      },
      {
        id: '3',
        message: 'Case assigned to technician based on location and availability',
        from: 'Decision Agent',
        fromType: 'agent',
        timestamp: '2024-01-15T09:40:00Z',
      },
      {
        id: '4',
        message: 'Technician en route to location',
        from: 'Tech-001',
        fromType: 'technician',
        timestamp: '2024-01-15T10:15:00Z',
      },
    ]);
    setDetailsOpen(true);
  };

  const handleGenerateCase = () => {
    setGenerateDialogOpen(true);
  };

  const getTimelineIcon = (fromType: string) => {
    switch (fromType) {
      case 'client':
        return <PersonIcon />;
      case 'agent':
        return <BotIcon />;
      case 'technician':
        return <AssignmentIcon />;
      case 'system':
        return <CheckCircleIcon />;
      default:
        return <CheckCircleIcon />;
    }
  };

  const getTimelineColor = (fromType: string): any => {
    switch (fromType) {
      case 'client':
        return 'primary';
      case 'agent':
        return 'secondary';
      case 'technician':
        return 'success';
      case 'system':
        return 'info';
      default:
        return 'grey';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Case Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor and manage support cases across your system
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleGenerateCase}
        >
          Generate Test Case
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={cases}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Case Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          Case Details: {selectedCase?.title}
        </DialogTitle>
        <DialogContent>
          {selectedCase && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Case Information
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Status
                      </Typography>
                      <Chip 
                        label={selectedCase.status} 
                        color={getStatusColor(selectedCase.status)}
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Priority
                      </Typography>
                      <Chip 
                        label={selectedCase.priority} 
                        color={getPriorityColor(selectedCase.priority)}
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Client
                      </Typography>
                      <Typography variant="body1">
                        {selectedCase.clientName} ({selectedCase.clientId})
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Description
                      </Typography>
                      <Typography variant="body1">
                        {selectedCase.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Case History
                    </Typography>
                    <Timeline>
                      {caseHistory.map((item, index) => (
                        <TimelineItem key={item.id}>
                          <TimelineSeparator>
                            <TimelineDot color={getTimelineColor(item.fromType)}>
                              {getTimelineIcon(item.fromType)}
                            </TimelineDot>
                            {index < caseHistory.length - 1 && <TimelineConnector />}
                          </TimelineSeparator>
                          <TimelineContent>
                            <Paper elevation={1} sx={{ p: 2, mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {item.from}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                {item.message}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(item.timestamp).toLocaleString()}
                              </Typography>
                            </Paper>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
          <Button variant="contained">Update Case</Button>
        </DialogActions>
      </Dialog>

      {/* Generate Case Dialog */}
      <Dialog 
        open={generateDialogOpen} 
        onClose={() => setGenerateDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>Generate Test Case</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Case Type</InputLabel>
              <Select label="Case Type" defaultValue="">
                <MenuItem value="camera_offline">Camera Offline</MenuItem>
                <MenuItem value="alarm_issue">Alarm Issue</MenuItem>
                <MenuItem value="access_control">Access Control</MenuItem>
                <MenuItem value="intercom">Intercom</MenuItem>
                <MenuItem value="network">Network</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select label="Priority" defaultValue="medium">
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Client ID"
              placeholder="CLI123456789"
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGenerateDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Generate Case</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CaseManagement;
