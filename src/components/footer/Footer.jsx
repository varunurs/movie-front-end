import React from "react";
import { StyledFooter, FooterText } from "./Footer.styled";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <StyledFooter>
      <FooterText>Copyrights &copy; {year}</FooterText>
    </StyledFooter>
  );
}
