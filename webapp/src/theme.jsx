import { createTheme } from "@mui/material/styles";
import { palette } from "@mui/system";

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
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&.Mui-checked': {
            color: '#942bc4', // Customize the color of the checked checkbox
          },
          '&.Mui-checked:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    TextField: {
      styleOverrides: {
        root: {

        }
      }
    },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       '& fieldset': {
    //         borderColor: '#FFFFFF', // Set the outline color to white
    //       },
    //     },
    //   },
    MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#FFFFFF', // Set the label color to white
          },
        },
     // },
    },
    // MenuItem: {
    //   root: {
    //     color: '#333333'
    //   },
    //   '&:hover': {
    //     backgroundColor: 'transparent',
    //   },
    //   '& .MuiInputBase-root': {
    //     backgroundColor: `transparent`,
    //   },
    //   '& .MuiMenuItem-root:hover': {
    //     backgroundColor: `transparent`,
    //   },
    // }

  }
})