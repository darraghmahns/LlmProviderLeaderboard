import React from 'react';
import { List, ListItem, ListItemText, Box } from '@mui/material';

const Sidebar = ({ metrics, onMetricClick }) => {
  const handleMetricClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onMetricClick(id);
  };

  return (
    <Box
      sx={{
        width: '10%',
        position: 'fixed',
        top: '0px',
        left: '0px',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        paddingTop: '130px',
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0)',
        overflowY: 'auto',
      }}
    >
      <List>
        {metrics.map((metric) => (
          <ListItem button key={metric.id} onClick={() => handleMetricClick(metric.id)}>
            <ListItemText primary={metric.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
