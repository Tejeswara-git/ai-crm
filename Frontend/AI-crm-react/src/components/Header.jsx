import { Typography } from "@mui/material";

function Header() {
  return (
    <>
      <Typography
        variant="h3"
        align="center"
        sx={{ fontWeight: "bold" }}
      >
        AI CRM
      </Typography>

      <Typography align="center">
        Healthcare Professional Module
      </Typography>
    </>
  );
}

export default Header;