import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import AuthModal from "./Authentication/AuthModal";
import { CryptoState } from "../CryptoContext";
import HeaderMenu from "./HeaderMenu";
import LogoIcon from "../asset/logoicon.png";
import LogoWord from "../asset/logoword.png";
import UserSidebar from "./UserSidebar";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "#fcc7f4",
    fontWeight: "bold",
    alignItems: "start",
  },
  navigations: {
    display: "flex",
    color: "white",
    fontFamily: "VT323",
    fontSize: "25px",
    width: "300px ",
    justifyContent: "space-around",
    cursor: "pointer",
  },
  navButton: {
    "&:hover": {
      color: "#FFE227",
    },
  },
}));

function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const { currency, setCurrency, user, setOpen } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: { main: "#fff" },
      type: "dark",
    },
  });

  const handleResize = () => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const selectMenu = (
    <Select
      variant="outlined"
      style={{ width: 100, height: 40, margin: 15 }}
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
    >
      <MenuItem value={"USD"}> USD </MenuItem>
      <MenuItem value={"MYR"}> MYR </MenuItem>
      <MenuItem value={"EUR"}> EUR </MenuItem>
      <MenuItem value={"JPY"}> JPY </MenuItem>
      <MenuItem value={"GBP"}> GBP </MenuItem>
      <MenuItem value={"AUD"}> AUD </MenuItem>
      <MenuItem value={"CAD"}> CAD </MenuItem>
    </Select>
  );

  const navigations = (
    <div className={classes.navigations}>
      <div
        className={classes.navButton}
        onClick={() => {
          user ? navigate("/portfolio") : setOpen(true);
        }}
      >
        Portfolio
      </div>
      <div
        className={classes.navButton}
        onClick={() => {
          navigate("/coinList");
        }}
      >
        Coins
      </div>
      <div
        className={classes.navButton}
        onClick={() => {
          navigate("/");
        }}
      >
        News
      </div>
      <div
        className={classes.navButton}
        onClick={() => {
          navigate("/trade");
        }}
      >
        Trade
      </div>
    </div>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar style={{ background: "#212121" }} position="sticky">
        <Container>
          <Toolbar>
            <Typography className={classes.title}>
              {isMobile && (
                <img
                  src={LogoIcon}
                  height="30"
                  onClick={() => navigate("/homepage")}
                  style={{ cursor: "pointer" }}
                />
              )}
              {!isMobile && (
                <img
                  src={LogoWord}
                  height="30"
                  onClick={() => navigate("/homepage")}
                  style={{ cursor: "pointer" }}
                />
              )}
            </Typography>

            {!isMobile && navigations}

            {!isMobile && selectMenu}
            {user ? <UserSidebar /> : <AuthModal />}
            {isMobile && (
              <HeaderMenu selectMenu={selectMenu} isMobile={isMobile} />
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
