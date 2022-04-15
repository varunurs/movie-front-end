import { Box, Container } from "@mui/material";
import { styled } from "@mui/system";

export const HomeContainer = styled(Container)(({ theme }) => ({
  height: "80vh",
}));

export const HomeSection1 = styled(Box)(({ theme }) => ({
  height: "20%",
}));

export const HomeSection2 = styled(Box)(({ theme }) => ({
  height: "80%",
  background: theme.palette.grey["300"],
  display: "flex",
  flexDirection: "column",
}));
