import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">Martian LLM Leaderboard Metrics</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
