import { AppBar } from "@mui/material";

import { styled } from "@mui/system";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.primary.main,
}));
