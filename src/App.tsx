import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { store } from './data-manage/store';
import { theme } from './utils/customtheme';
import Home from './views/home';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth={false} disableGutters={true}>
          <Provider store={store}>
            <Home />
          </Provider>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
