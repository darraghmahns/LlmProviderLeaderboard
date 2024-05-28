import React from 'react';
import { Box, Typography } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Typography variant="body2" align="center">
        © 1938 Paul Erdos. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
