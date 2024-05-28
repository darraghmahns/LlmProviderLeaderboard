import React from 'react';
import { Box, Typography } from '@mui/material';

const SectionHeader = ({ title }) => (
  <Box textAlign="center" position="fixed" top="60px" left="0px" width="100%" p={1} style={{ backgroundColor: '#ffffff' }}>
    <Typography variant="h4">{title}</Typography>
  </Box>
);

export default SectionHeader;
