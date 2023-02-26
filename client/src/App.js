import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";

//Importação do Layout
import Layout from './scenes/layout'

//Importação das cenas
import Dashboard from './scenes/dashboard'
import Contract from './scenes/contract'
import CreateContract from './scenes/contract/create'
import CreateVehicle from './scenes/vehicle/create'
import Vehicle from './scenes/vehicle'
import Overview from "./scenes/overview";
import OverviewValue from "scenes/overviewValue";
//

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout/>}>
              <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/contract" element={<Contract/>}/>
              <Route path="/createcontract" element={<CreateContract/>}/>
              <Route path="/createvehicle" element={<CreateVehicle/>}/>                
              <Route path="/vehicle" element={<Vehicle/>}/>
              <Route path="/overview" element={<Overview/>}/>
              <Route path="/overviewvalue" element={<OverviewValue/>}/>


          </Route>
        </Routes>

      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
