import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  SmartToy as AgentIcon,
  Assignment as CaseIcon,
  People as ClientIcon,
  Support as HitlIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Agent Configuration', icon: <AgentIcon />, path: '/agents' },
  { text: 'Case Management', icon: <CaseIcon />, path: '/cases' },
  { text: 'Client Management', icon: <ClientIcon />, path: '/clients' },
  { text: 'HITL Management', icon: <HitlIcon />, path: '/hitl' },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'primary.main',
          color: 'white',
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <SecurityIcon sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Security Support
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Multi-Agent Platform
        </Typography>
      </Box>
      
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
      
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
