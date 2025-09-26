import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  Psychology as PsychologyIcon,
  ExpandMore as ExpandMoreIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';

interface Agent {
  id: string;
  name: string;
  type: 'client' | 'technician' | 'validator' | 'hitl' | 'system';
  status: 'active' | 'inactive' | 'training' | 'maintenance';
  configuration: Record<string, any>;
  capabilities: string[];
  lastActive: string;
}

const AgentConfiguration: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Case Generator Agent',
      type: 'system',
      status: 'active',
      configuration: {
        caseTypes: ['camera_offline', 'alarm_issue', 'access_control'],
        generationInterval: 300,
        maxCasesPerHour: 10,
      },
      capabilities: ['case_generation', 'template_management'],
      lastActive: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      name: 'Client Interaction Agent',
      type: 'client',
      status: 'active',
      configuration: {
        responseTimeout: 900,
        maxQuestions: 3,
        supportedChannels: ['whatsapp', 'email', 'web'],
      },
      capabilities: ['client_communication', 'problem_identification', 'case_routing'],
      lastActive: '2024-01-15T10:25:00Z',
    },
    {
      id: '3',
      name: 'Main Decision Agent',
      type: 'system',
      status: 'active',
      configuration: {
        decisionTimeout: 600,
        escalationThreshold: 3,
        priorityMatrix: { critical: 1, high: 2, medium: 3, low: 4 },
      },
      capabilities: ['decision_making', 'case_analysis', 'technician_dispatch'],
      lastActive: '2024-01-15T10:28:00Z',
    },
  ]);

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setDialogOpen(true);
  };

  const handleConfigureAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setConfigDialogOpen(true);
  };

  const handleSaveAgent = () => {
    // TODO: Implement save logic
    setDialogOpen(false);
    setSelectedAgent(null);
  };

  const handleSaveConfiguration = () => {
    // TODO: Implement configuration save logic
    setConfigDialogOpen(false);
    setSelectedAgent(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'default';
      case 'training': return 'info';
      case 'maintenance': return 'warning';
      default: return 'default';
    }
  };

  const getAIInsight = (configKey: string, currentValue: any) => {
    // Mock AI insights - in real implementation, this would call an AI service
    const insights: Record<string, string> = {
      responseTimeout: `Current timeout of ${currentValue}s is optimal for client satisfaction. Consider reducing to 600s during peak hours.`,
      maxQuestions: `Limiting to ${currentValue} questions maintains efficiency. Consider dynamic adjustment based on case complexity.`,
      generationInterval: `${currentValue}s interval provides good test coverage. Increase to 600s for production environments.`,
      escalationThreshold: `Threshold of ${currentValue} attempts balances automation with human oversight. Monitor resolution rates.`,
    };
    
    return insights[configKey] || 'AI analysis suggests this configuration is within optimal parameters.';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Agent Configuration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure and manage your multi-agent system components
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedAgent(null);
            setDialogOpen(true);
          }}
        >
          Add Agent
        </Button>
      </Box>

      <Grid container spacing={3}>
        {agents.map((agent) => (
          <Grid item xs={12} md={6} lg={4} key={agent.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {agent.name}
                  </Typography>
                  <Chip 
                    label={agent.status} 
                    color={getStatusColor(agent.status) as any}
                    size="small"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Type: {agent.type.charAt(0).toUpperCase() + agent.type.slice(1)}
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Capabilities:</strong>
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {agent.capabilities.map((capability, index) => (
                    <Chip
                      key={index}
                      label={capability.replace('_', ' ')}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
                
                <Typography variant="caption" color="text.secondary">
                  Last active: {new Date(agent.lastActive).toLocaleString()}
                </Typography>
              </CardContent>
              
              <CardActions>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditAgent(agent)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  startIcon={<SettingsIcon />}
                  onClick={() => handleConfigureAgent(agent)}
                >
                  Configure
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Agent Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedAgent ? 'Edit Agent' : 'Add New Agent'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Agent Name"
              value={selectedAgent?.name || ''}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Agent Type</InputLabel>
              <Select
                value={selectedAgent?.type || ''}
                label="Agent Type"
              >
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="technician">Technician</MenuItem>
                <MenuItem value="validator">Validator</MenuItem>
                <MenuItem value="hitl">HITL</MenuItem>
                <MenuItem value="system">System</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedAgent?.status || 'active'}
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="training">Training</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveAgent} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Configuration Dialog */}
      <Dialog 
        open={configDialogOpen} 
        onClose={() => setConfigDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SettingsIcon sx={{ mr: 1 }} />
            Configure {selectedAgent?.name}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                Use the AI Insight button next to each configuration option to get intelligent suggestions 
                for optimizing your agent's performance.
              </Typography>
            </Alert>

            {selectedAgent && Object.entries(selectedAgent.configuration).map(([key, value]) => (
              <Accordion key={key} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Typography sx={{ flexGrow: 1 }}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Typography>
                    <Tooltip title="Get AI Insight">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Show AI insight
                        }}
                      >
                        <LightbulbIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <TextField
                      fullWidth
                      label="Value"
                      value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                      multiline={typeof value === 'object'}
                      rows={typeof value === 'object' ? 4 : 1}
                      sx={{ mb: 2 }}
                    />
                    <Alert severity="info" icon={<PsychologyIcon />}>
                      <Typography variant="body2">
                        <strong>AI Insight:</strong> {getAIInsight(key, value)}
                      </Typography>
                    </Alert>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfigDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveConfiguration} variant="contained">
            Save Configuration
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AgentConfiguration;
