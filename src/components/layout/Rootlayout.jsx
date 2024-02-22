import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './layout.css'
import { Outlet } from 'react-router-dom';
import Sidebar from '../../pages/sidebar/Sidebar';
const Rootlayout = () => {
  return (
    <div>
      <Box>
        <Grid container spacing={0}>
            <Grid item xs={1.5}>
                <Sidebar/>
            </Grid>
            <Grid item xs={10.5}>
                <Outlet/>
            </Grid>
        
        </Grid>
    </Box>
    </div>
  )
}

export default Rootlayout
