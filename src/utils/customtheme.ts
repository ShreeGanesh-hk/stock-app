import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#006DF3',
      dark:'#3A4BB7',
      light:'#8259CB'
    },
    secondary: {
      main: '#3C3C3D',
      dark:'#4BB73A',
      light:'#A2CB59'
    },

  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#fff',
          fontSize: '14px',
          textTransform: 'uppercase',
        },
        body: {
          fontSize: '12px'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#01579b'
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        displayedRows: {
          cursor: 'default',

        }
      }
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
          '&.Mui-active': {
            color: '#fff',
          },
          "&:hover": {
            color: "#ccc !important"
          },
          
        },
        icon :{
          color: "#fff !important",
        }
      },

    },
    MuiBackdrop:{
      styleOverrides: {
        root: {
          zIndex:'1401',
        }}

    },
    MuiSnackbar:{
      styleOverrides:{
        root:{
          position:'relative'
        }
      }
    }
  }
})