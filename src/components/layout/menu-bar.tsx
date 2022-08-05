import { Grid, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CustomTextField from '../custom-ui/CustomTextField';


export default function MenuBar() {
  return (
    <Box>
      <AppBar position="fixed">
        <Grid container sx={{ m: 'auto' }} maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }} >
            <Typography variant="h5" href="/" component="a" sx={{ flexGrow: 1, textAlign: 'left', alignItems: 'center', color: "inherit", textDecoration: 'none' }}>
              U.S Stock Exchange
            </Typography>
            <Stack spacing={4} direction="row" justifyContent="flex-end" alignItems='center'>
            </Stack>
          </Toolbar>
        </Grid>
      </AppBar>
      {/*  */}
    </Box>
  );
}
