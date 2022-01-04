import { createTheme } from '@mui/material/styles';
import { blue, deepOrange, red, teal } from '@mui/material/colors';
import { Components } from '@mui/material/styles';

const densityComponents: Components = {
  MuiButton: {
    defaultProps: {
      size: 'small',
    },
  },
  MuiFilledInput: {
    defaultProps: {
      margin: 'dense',
      size: 'small',
    },
  },
  MuiFormControl: {
    defaultProps: {
      margin: 'dense',
      size: 'small',
    },
  },
  MuiFormHelperText: {
    defaultProps: {
      margin: 'dense',
    },
  },
  MuiIconButton: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      sizeSmall: {
        // Adjust spacing to reach minimal touch target hitbox
        marginLeft: 4,
        marginRight: 4,
        padding: 12,
      },
    },
  },
  MuiInputBase: {
    defaultProps: {
      margin: 'dense',
      size: 'small',
    },
  },
  MuiInputLabel: {
    defaultProps: {
      margin: 'dense',
    },
  },
  MuiListItem: {
    defaultProps: {
      dense: true,
    },
  },
  MuiOutlinedInput: {
    defaultProps: {
      margin: 'dense',
      size: 'small',
    },
  },
  MuiFab: {
    defaultProps: {
      size: 'small',
    },
  },
  MuiTable: {
    defaultProps: {
      size: 'small',
    },
  },
  MuiTextField: {
    defaultProps: {
      margin: 'dense',
      size: 'small',
    },
  },
  MuiToolbar: {
    defaultProps: {
      variant: 'dense',
    },
  },
}

// Create a theme instance.
const theme = createTheme({
  components: densityComponents,
  palette: {
    primary: deepOrange,
    secondary: red,
  },
});

export default theme;
