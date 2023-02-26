import React from "react";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";

import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import FlexBetween from "./FlexBetween";

import profileImage from "../assets/profileImage.png";
import logo from "../assets/logo.png";

const navItems = [
  {
    text: "Dashboard",
    navigateText: "dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Veículos",
    icon: null,
  },
  {
    text: "Listar Veículos",
    navigateText: "vehicle",
    icon: <TableRowsOutlinedIcon />,
  },
  {
    text: "Cadastrar Veículo",
    navigateText: "createvehicle",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Contratos",
    icon: null,
  },
  {
    text: "Listar Contratos",
    navigateText: "contract",
    icon: <TableRowsOutlinedIcon />,
  },
  {
    text: "Cadastrar Contrato",
    navigateText: "createcontract",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Visão Consumo",
    navigateText: "overview",
    icon: <LocalGasStationIcon />,
  },
  {
    text: "Visão gasto",
    navigateText: "overviewvalue",
    icon: <AttachMoneyOutlinedIcon />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  user,
}) => {
  
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const themeMode = theme.palette.mode



 /*  useEffect(() => {
    setActive(navigateText);
  }, [pathname]); */

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[300],
              fontWeight: "bold",
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                  sx={{
                    "& img": {
                      objectFit: "contain",
                    },
                  }}
                >
                  <img alt="logo" src={logo} width="100px" />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ icon, text, navigateText }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{
                        m: "2.25rem 0 1rem 3rem",
                        color:
                         themeMode === "light" ? 
                         theme.palette.grey[900] : theme.palette.secondary[200],
                      }}
                    >
                      {text}
                    </Typography>
                  );
                }

                const lcText = text.toLocaleLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${navigateText}`);
                        setActive(navigateText);
                      }}
                      sx={{
                        backgroundColor:
                          active === navigateText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === navigateText
                            ? theme.palette.primary[800]
                            : themeMode === "light" ? theme.palette.grey[800] : theme.palette.grey[100]
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === navigateText
                              ? themeMode === "light" ? theme.palette.grey[900] : theme.palette.primary[100]
                              : themeMode === "light" ? theme.palette.grey[900] : theme.palette.secondary[100],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box /* position="absolute" */ bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "corver" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.grey[100] }}
                >
                Conterp
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.grey[200] }}
                >
                Dashboard
                </Typography>
              </Box>

              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;