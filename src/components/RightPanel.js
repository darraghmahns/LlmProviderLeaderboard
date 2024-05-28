import React from 'react';
import { Box, Typography } from '@mui/material';

const RightPanel = ({ metricDetails }) => {
  return (
    <Box
      sx={{
        width: '20%',
        position: 'fixed',
        top: '130px',
        right: '0px',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        paddingTop: '200px',
        padding: '20px',
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0)',
        overflowY: 'auto',
      }}
    >
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        {metricDetails.description}
      </Typography>
    </Box>
  );
};

export default RightPanel;
