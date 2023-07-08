import { createTheme } from "@mui/material/styles";

export const globalTheme = createTheme({
  palette: {
    primary: {
      main: `#942bc4`,
    },
    background: {
      default: '#333333', // Set the default background color to a darker grey
    },
    text: {
      primary: '#FFFFFF', // Set the font color to white
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          '&:focus': {
            backgroundColor: 'transparent', // Remove focus background color
          },
        },
        select: {
          '&:focus': {
            backgroundColor: 'transparent', // Remove focus background color
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#942bc4', // Set the background color of the selected MenuItem
            color: '#FFFFFF', // Set the text color of the selected MenuItem
          },
          '&:hover': {
            backgroundColor: '#942bc4', // Set the background color of the MenuItem on hover
            color: '#FFFFFF', // Set the text color of the MenuItem on hover
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // Set the label color to white
        },
      },
    },
  },
});
