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
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Tab,
  Tabs,
  Paper,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Business as BusinessIcon,
  Restaurant as RestaurantIcon,
  Store as StoreIcon,
  Home as HomeIcon,
  Camera as CameraIcon,
  Security as SecurityIcon,
  NetworkWifi as NetworkIcon,
} from '@mui/icons-material';

interface Client {
  id: string;
  clientId: string;
  name: string;
  type: string;
  status: string;
  email: string;
  phone: string;
  address: string;
  contractLevel: string;
  totalCases: number;
  activeCases: number;
  lastVisit?: string;
  equipment: Equipment[];
}

interface Equipment {
  id: string;
  type: string;
  description: string;
  location: string;
  status: string;
  installDate: string;
  lastMaintenance?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const ClientManagement: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      clientId: 'CLI123456789',
      name: 'Restaurant ABC',
      type: 'restaurant',
      status: 'active',
      email: 'contact@restaurantabc.com',
      phone: '+55 11 99999-9999',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      contractLevel: 'premium',
      totalCases: 15,
      activeCases: 2,
      lastVisit: '2024-01-10T14:30:00Z',
      equipment: [
        {
          id: '1',
          type: 'camera',
          description: 'IP Camera 4MP',
          location: 'Main Entrance',
          status: 'active',
          installDate: '2023-06-15T00:00:00Z',
          lastMaintenance: '2024-01-05T00:00:00Z',
        },
        {
          id: '2',
          type: 'alarm',
          description: 'Motion Sensor',
          location: 'Kitchen Area',
          status: 'active',
          installDate: '2023-06-15T00:00:00Z',
        },
      ],
    },
    {
      id: '2',
      clientId: 'CLI987654321',
      name: 'Bar XYZ',
      type: 'bar',
      status: 'active',
      email: 'info@barxyz.com',
      phone: '+55 11 88888-8888',
      address: 'Av. Paulista, 456 - São Paulo, SP',
      contractLevel: 'basic',
      totalCases: 8,
      activeCases: 1,
      equipment: [
        {
          id: '3',
          type: 'camera',
          description: 'IP Camera 2MP',
          location: 'Bar Counter',
          status: 'maintenance',
          installDate: '2023-08-20T00:00:00Z',
        },
      ],
    },
  ]);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const columns: GridColDef[] = [
    { field: 'clientId', headerName: 'Client ID', width: 130 },
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'type',
      headerName: 'Type',
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small" 
          variant="outlined"
          icon={getTypeIcon(params.value)}
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small"
          color={params.value === 'active' ? 'success' : 'default'}
        />
      ),
    },
    {
      field: 'contractLevel',
      headerName: 'Contract',
      width: 100,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small"
          color={getContractColor(params.value)}
        />
      ),
    },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'activeCases', headerName: 'Active Cases', width: 120, type: 'number' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          size="small"
          startIcon={<ViewIcon />}
          onClick={() => handleViewClient(params.row)}
        >
          View
        </Button>
      ),
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return <RestaurantIcon />;
      case 'bar': return <BusinessIcon />;
      case 'store': return <StoreIcon />;
      case 'condominium': return <HomeIcon />;
      default: return <BusinessIcon />;
    }
  };

  const getContractColor = (level: string): any => {
    switch (level) {
      case 'enterprise': return 'error';
      case 'premium': return 'warning';
      case 'basic': return 'info';
      default: return 'default';
    }
  };

  const getEquipmentIcon = (type: string) => {
    switch (type) {
      case 'camera': return <CameraIcon />;
      case 'alarm': return <SecurityIcon />;
      case 'network': return <NetworkIcon />;
      default: return <SecurityIcon />;
    }
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setDetailsOpen(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Client Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your security system clients and their installations
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddDialogOpen(true)}
        >
          Add Client
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={clients}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>

      {/* Client Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)} 
        maxWidth="lg" 
        fullWidth
      >
        <DialogTitle>
          Client Details: {selectedClient?.name}
        </DialogTitle>
        <DialogContent>
          {selectedClient && (
            <Box>
              <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
                <Tab label="General Information" />
                <Tab label="Equipment" />
                <Tab label="Technical Record" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Contact Information
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Client ID
                        </Typography>
                        <Typography variant="body1">
                          {selectedClient.clientId}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Email
                        </Typography>
                        <Typography variant="body1">
                          {selectedClient.email}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Phone
                        </Typography>
                        <Typography variant="body1">
                          {selectedClient.phone}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Address
                        </Typography>
                        <Typography variant="body1">
                          {selectedClient.address}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Service Information
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Contract Level
                        </Typography>
                        <Chip 
                          label={selectedClient.contractLevel} 
                          color={getContractColor(selectedClient.contractLevel)}
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Total Cases
                        </Typography>
                        <Typography variant="h4">
                          {selectedClient.totalCases}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Active Cases
                        </Typography>
                        <Typography variant="h4" color="warning.main">
                          {selectedClient.activeCases}
                        </Typography>
                      </Box>
                      {selectedClient.lastVisit && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Last Visit
                          </Typography>
                          <Typography variant="body1">
                            {new Date(selectedClient.lastVisit).toLocaleDateString()}
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>
                  Installed Equipment
                </Typography>
                <List>
                  {selectedClient.equipment.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            {getEquipmentIcon(item.type)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${item.description} - ${item.location}`}
                          secondary={
                            <Box>
                              <Typography variant="body2" component="span">
                                Installed: {new Date(item.installDate).toLocaleDateString()}
                              </Typography>
                              {item.lastMaintenance && (
                                <Typography variant="body2" component="span" sx={{ ml: 2 }}>
                                  Last Maintenance: {new Date(item.lastMaintenance).toLocaleDateString()}
                                </Typography>
                              )}
                              <Box sx={{ mt: 1 }}>
                                <Chip 
                                  label={item.status} 
                                  size="small"
                                  color={item.status === 'active' ? 'success' : 'warning'}
                                />
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < selectedClient.equipment.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  Technical Record
                </Typography>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    This section would contain the client's technical history, including:
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Installation notes and configurations" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Common issues and resolutions" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Maintenance history" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Technician notes and recommendations" />
                    </ListItem>
                  </List>
                </Paper>
              </TabPanel>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
          <Button variant="contained">Edit Client</Button>
        </DialogActions>
      </Dialog>

      {/* Add Client Dialog */}
      <Dialog 
        open={addDialogOpen} 
        onClose={() => setAddDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Client Name" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Client Type" select>
                <option value="restaurant">Restaurant</option>
                <option value="bar">Bar</option>
                <option value="store">Store</option>
                <option value="condominium">Condominium</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" type="email" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phone" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" multiline rows={2} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Add Client</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientManagement;
