import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'static',
  backgroundColor: theme.palette.primary.main,
}));

export const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

export const StyledTypography = styled(Typography)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));
