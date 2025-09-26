import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  SmartToy as AgentIcon,
  Assignment as CaseIcon,
  People as ClientIcon,
  Support as HitlIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

interface DashboardStats {
  totalAgents: number;
  activeAgents: number;
  totalCases: number;
  pendingCases: number;
  totalClients: number;
  activeClients: number;
  pendingHitlRequests: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalAgents: 5,
    activeAgents: 4,
    totalCases: 23,
    pendingCases: 7,
    totalClients: 45,
    activeClients: 42,
    pendingHitlRequests: 3,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Fetch real data from API
    setLoading(false);
  }, []);

  const StatCard: React.FC<{
    title: string;
    value: number;
    subtitle?: string;
    icon: React.ReactNode;
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    progress?: number;
  }> = ({ title, value, subtitle, icon, color, progress }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ color: `${color}.main`, mr: 2 }}>
            {icon}
          </Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        {progress !== undefined && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              color={color}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {progress}% efficiency
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Monitor your multi-agent security support system
      </Typography>

      {stats.pendingHitlRequests > 0 && (
        <Alert 
          severity="warning" 
          icon={<WarningIcon />}
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small">
              Review
            </Button>
          }
        >
          You have {stats.pendingHitlRequests} pending HITL requests requiring human attention
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Agents"
            value={stats.activeAgents}
            subtitle={`${stats.totalAgents} total agents`}
            icon={<AgentIcon fontSize="large" />}
            color="primary"
            progress={Math.round((stats.activeAgents / stats.totalAgents) * 100)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Cases"
            value={stats.pendingCases}
            subtitle={`${stats.totalCases} total cases`}
            icon={<CaseIcon fontSize="large" />}
            color="warning"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Clients"
            value={stats.activeClients}
            subtitle={`${stats.totalClients} total clients`}
            icon={<ClientIcon fontSize="large" />}
            color="success"
            progress={Math.round((stats.activeClients / stats.totalClients) * 100)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="HITL Requests"
            value={stats.pendingHitlRequests}
            subtitle="Pending review"
            icon={<HitlIcon fontSize="large" />}
            color="error"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  { time: '2 min ago', message: 'Agent processed camera offline case for Client CLI123456789', type: 'success' },
                  { time: '5 min ago', message: 'HITL request created for manual intervention', type: 'warning' },
                  { time: '12 min ago', message: 'New client registered: Restaurant ABC', type: 'info' },
                  { time: '18 min ago', message: 'Case resolved: Alarm system maintenance', type: 'success' },
                ].map((activity, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label={activity.time} 
                      size="small" 
                      sx={{ mr: 2, minWidth: 80 }}
                      color={activity.type as any}
                      variant="outlined"
                    />
                    <Typography variant="body2">
                      {activity.message}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">View All Activity</Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Status
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2">Case Generator</Typography>
                  <Chip label="Active" color="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2">Client Module</Typography>
                  <Chip label="Active" color="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2">Agent Module</Typography>
                  <Chip label="Active" color="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2">Technician Module</Typography>
                  <Chip label="Maintenance" color="warning" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2">Validator Module</Typography>
                  <Chip label="Active" color="success" size="small" />
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" startIcon={<TrendingUpIcon />}>
                View Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
