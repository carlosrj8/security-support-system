import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Badge,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Visibility as ViewIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  AccessTime as PendingIcon,
  Person as PersonIcon,
  SmartToy as BotIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

interface HitlRequest {
  id: string;
  title: string;
  type: string;
  status: string;
  requestingAgent: string;
  requestingAgentId: string;
  relatedCaseId?: string;
  relatedClientId?: string;
  description: string;
  proposedAction: {
    action: string;
    parameters: any;
    reasoning: string;
  };
  suggestions: string[];
  createdAt: string;
  expiresAt: string;
  humanResponse?: string;
  humanDecision?: {
    approved: boolean;
    modifications?: any;
    feedback: string;
    decidedBy: string;
    decidedAt: string;
  };
}

const HitlManagement: React.FC = () => {
  const [requests, setRequests] = useState<HitlRequest[]>([
    {
      id: '1',
      title: 'Manual intervention required for complex case',
      type: 'escalation',
      status: 'pending',
      requestingAgent: 'system',
      requestingAgentId: 'agent-001',
      relatedCaseId: 'case-123',
      relatedClientId: 'CLI123456789',
      description: 'Client reported multiple camera failures simultaneously. System unable to determine root cause automatically.',
      proposedAction: {
        action: 'dispatch_senior_technician',
        parameters: {
          priority: 'high',
          specialization: 'network_infrastructure',
          estimatedTime: 120,
        },
        reasoning: 'Multiple simultaneous failures suggest network infrastructure issue requiring specialized expertise.',
      },
      suggestions: [
        'Check network switch status',
        'Verify power supply to camera rack',
        'Test network connectivity to each camera',
      ],
      createdAt: '2024-01-15T10:30:00Z',
      expiresAt: '2024-01-16T10:30:00Z',
    },
    {
      id: '2',
      title: 'Configuration change approval needed',
      type: 'configuration_change',
      status: 'pending',
      requestingAgent: 'system',
      requestingAgentId: 'agent-002',
      description: 'Agent suggests updating response timeout from 15 minutes to 30 minutes based on recent performance data.',
      proposedAction: {
        action: 'update_configuration',
        parameters: {
          module: 'client_agent',
          parameter: 'response_timeout',
          currentValue: 900,
          proposedValue: 1800,
        },
        reasoning: 'Analysis shows 23% of cases require more than 15 minutes for proper client communication.',
      },
      suggestions: [
        'Monitor impact on customer satisfaction',
        'Consider different timeouts for different case types',
        'Implement gradual rollout',
      ],
      createdAt: '2024-01-15T09:45:00Z',
      expiresAt: '2024-01-16T09:45:00Z',
    },
    {
      id: '3',
      title: 'Decision approval for high-cost repair',
      type: 'decision_approval',
      status: 'approved',
      requestingAgent: 'technician',
      requestingAgentId: 'tech-001',
      relatedCaseId: 'case-456',
      description: 'Technician recommends replacing entire camera system due to obsolete hardware.',
      proposedAction: {
        action: 'approve_equipment_replacement',
        parameters: {
          estimatedCost: 5000,
          equipmentType: 'camera_system',
          clientId: 'CLI987654321',
        },
        reasoning: 'Current system is 8 years old, parts unavailable, frequent failures causing service disruption.',
      },
      suggestions: [
        'Negotiate bulk discount with supplier',
        'Schedule installation during off-hours',
        'Provide temporary monitoring solution',
      ],
      createdAt: '2024-01-15T08:15:00Z',
      expiresAt: '2024-01-16T08:15:00Z',
      humanDecision: {
        approved: true,
        feedback: 'Approved with condition to get 3 quotes from different suppliers',
        decidedBy: 'Manager John',
        decidedAt: '2024-01-15T09:30:00Z',
        modifications: {
          requireMultipleQuotes: true,
          maxBudget: 4500,
        },
      },
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<HitlRequest | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [response, setResponse] = useState('');
  const [decision, setDecision] = useState<'approve' | 'reject' | ''>('');

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'title', headerName: 'Title', width: 300 },
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
          icon={getStatusIcon(params.value)}
        />
      ),
    },
    { field: 'requestingAgent', headerName: 'Requesting Agent', width: 150 },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: 'expiresAt',
      headerName: 'Expires',
      width: 150,
      renderCell: (params) => {
        const isExpired = new Date(params.value) < new Date();
        return (
          <Typography 
            variant="body2" 
            color={isExpired ? 'error' : 'text.primary'}
          >
            {new Date(params.value).toLocaleString()}
          </Typography>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            size="small"
            startIcon={<ViewIcon />}
            onClick={() => handleViewRequest(params.row)}
            sx={{ mr: 1 }}
          >
            View
          </Button>
          {params.row.status === 'pending' && (
            <Button
              size="small"
              variant="contained"
              onClick={() => handleRespondToRequest(params.row)}
            >
              Respond
            </Button>
          )}
        </Box>
      ),
    },
  ];

  const getStatusColor = (status: string): any => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      case 'expired': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <ApproveIcon />;
      case 'rejected': return <RejectIcon />;
      case 'pending': return <PendingIcon />;
      case 'expired': return <WarningIcon />;
      default: return <InfoIcon />;
    }
  };

  const handleViewRequest = (request: HitlRequest) => {
    setSelectedRequest(request);
    setDetailsOpen(true);
  };

  const handleRespondToRequest = (request: HitlRequest) => {
    setSelectedRequest(request);
    setResponse('');
    setDecision('');
    setResponseDialogOpen(true);
  };

  const handleSubmitResponse = () => {
    if (selectedRequest && decision && response) {
      // TODO: Submit response to backend
      console.log('Submitting response:', {
        requestId: selectedRequest.id,
        decision,
        response,
      });
      setResponseDialogOpen(false);
      setSelectedRequest(null);
    }
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            HITL Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Human-in-the-Loop requests requiring manual intervention
          </Typography>
        </Box>
        <Badge badgeContent={pendingCount} color="error">
          <Button variant="outlined" startIcon={<PendingIcon />}>
            Pending Requests
          </Button>
        </Badge>
      </Box>

      {pendingCount > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          You have {pendingCount} pending HITL requests that require your attention.
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={requests}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>

      {/* Request Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          HITL Request Details
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 3, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {selectedRequest.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={selectedRequest.status} 
                      color={getStatusColor(selectedRequest.status)}
                      icon={getStatusIcon(selectedRequest.status)}
                      sx={{ mr: 1 }}
                    />
                    <Chip 
                      label={selectedRequest.type.replace('_', ' ')} 
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedRequest.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Requested by: {selectedRequest.requestingAgent} ({selectedRequest.requestingAgentId})
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Proposed Action
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Action
                    </Typography>
                    <Typography variant="body1">
                      {selectedRequest.proposedAction.action.replace('_', ' ')}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Reasoning
                    </Typography>
                    <Typography variant="body1">
                      {selectedRequest.proposedAction.reasoning}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Parameters
                    </Typography>
                    <pre style={{ fontSize: '0.8rem', background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
                      {JSON.stringify(selectedRequest.proposedAction.parameters, null, 2)}
                    </pre>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    AI Suggestions
                  </Typography>
                  <List>
                    {selectedRequest.suggestions.map((suggestion, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={suggestion} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              {selectedRequest.humanDecision && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, bgcolor: selectedRequest.humanDecision.approved ? 'success.light' : 'error.light' }}>
                    <Typography variant="h6" gutterBottom>
                      Human Decision
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={selectedRequest.humanDecision.approved ? 'APPROVED' : 'REJECTED'}
                        color={selectedRequest.humanDecision.approved ? 'success' : 'error'}
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2" component="span">
                        by {selectedRequest.humanDecision.decidedBy} on{' '}
                        {new Date(selectedRequest.humanDecision.decidedAt).toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <strong>Feedback:</strong> {selectedRequest.humanDecision.feedback}
                    </Typography>
                    {selectedRequest.humanDecision.modifications && (
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Modifications:
                        </Typography>
                        <pre style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.7)', padding: '8px', borderRadius: '4px' }}>
                          {JSON.stringify(selectedRequest.humanDecision.modifications, null, 2)}
                        </pre>
                      </Box>
                    )}
                  </Paper>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
          {selectedRequest?.status === 'pending' && (
            <Button 
              variant="contained" 
              onClick={() => handleRespondToRequest(selectedRequest)}
            >
              Respond
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Response Dialog */}
      <Dialog 
        open={responseDialogOpen} 
        onClose={() => setResponseDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>
          Respond to HITL Request
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Decision</InputLabel>
              <Select
                value={decision}
                label="Decision"
                onChange={(e) => setDecision(e.target.value as 'approve' | 'reject')}
              >
                <MenuItem value="approve">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ApproveIcon sx={{ mr: 1, color: 'success.main' }} />
                    Approve
                  </Box>
                </MenuItem>
                <MenuItem value="reject">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <RejectIcon sx={{ mr: 1, color: 'error.main' }} />
                    Reject
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Feedback/Comments"
              multiline
              rows={4}
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Provide detailed feedback about your decision..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResponseDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitResponse}
            variant="contained"
            disabled={!decision || !response}
          >
            Submit Response
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HitlManagement;
