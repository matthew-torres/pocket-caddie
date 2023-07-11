import { createTheme } from "@mui/material/styles";

export const globalTheme = createTheme({
  palette: {
    primary: {
      main: `#6d2b94`,
    },
    background: {
      default: '#242424', // Set the default background color to a darker grey
      secondary: '#FFFFFF',
    },
    text: {
      primary: '#FFFFFF', // Set the font color to white
      secondary: '#606060'
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
            backgroundColor: '#6d2b94', // Set the background color of the selected MenuItem
            color: '#606060', // Set the text color of the selected MenuItem
          },
          '&:hover': {
            backgroundColor: '#6d2b94', // Set the background color of the MenuItem on hover
            color: '#606060', // Set the text color of the MenuItem on hover
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#606060', // Set the label color to white
        },
        '&:hover': {
          backgroundColor: '#6d2b94', // Set the background color of the MenuItem on hover
          color: '#6d2b94', // Set the text color of the MenuItem on hover
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#606060', // Set the color of the checkbox
          // '&.Mui-checked': {
          //   color: '#FFFFFF', // Set the color of the checked checkbox
          // },
        },
        checkbox: {
          '&.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
          },
        },
      },
    },
    // MuiDataGrid: {
    //   styleOverrides: {
    //     root: {
    //       // Custom styles for the DataGrid container
    //       backgroundColor: '606060',
    //     },
    //     header: {
    //       // Custom styles for the header cells
    //       backgroundColor: '606060',
    //       color: '606060',
    //     },
    //     cell: {
    //       // Custom styles for the data cells
    //       backgroundColor: '606060',
    //       color: '606060',
    //     },
    //     checkbox: {
    //       // Custom styles for the checkboxes
    //       color: '606060',
    //     },
    //   },
    // },
  },
});
