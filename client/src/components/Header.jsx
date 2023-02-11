import React from "react";
import { Typography, Box, useTheme } from "@mui/material";


const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.primary[700]}
        fontWeight="bold"
        sx={{mb: "5px"}}
      >
        {title}
      </Typography>

      <Typography
      variant="h5"
      color={theme.palette.primary[600]}
      fontStyle="italic"
      >
        {subtitle}
      </Typography>
    </Box>
  );
};
export default Header;