import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import AgentConfiguration from './pages/AgentConfiguration';
import CaseManagement from './pages/CaseManagement';
import ClientManagement from './pages/ClientManagement';
import HitlManagement from './pages/HitlManagement';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              p: 3,
              minHeight: '100vh',
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/agents" element={<AgentConfiguration />} />
              <Route path="/cases" element={<CaseManagement />} />
              <Route path="/clients" element={<ClientManagement />} />
              <Route path="/hitl" element={<HitlManagement />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
