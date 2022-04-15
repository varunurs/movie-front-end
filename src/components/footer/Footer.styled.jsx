import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const StyledFooter = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  background: theme.palette.primary.main,
  width: "100%",
  height: "10vh",
  color: theme.palette.text.white,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const FooterText = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
}));
