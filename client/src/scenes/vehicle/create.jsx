import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  useTheme,
  FormControl,
  Menu,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const CreateVehicle = () => {
  const [contract, setContract] = useState("");
  const theme = useTheme();

  

  const handleFormSubmit = (values) => {
    console.log(values);
    console.log("clicouy")
    window.alert(values)
  };

  const initialValues = {
    plate: "",
    type: "",
    model: "",
    contractName: contract,
    manufacturer: "",
    color: "",
    year: "",
    tankCapacity: "",
  };

  const vechileSchema = yup.object().shape({
    plate: yup.string().required("required"),
    type: yup.string().required("required"),
    model: yup.string().required("required"),
    manufacturer: yup.string().required("required"),
    color: yup.string().required("required"),
    year: yup.string().required("required"),
    tankCapacity: yup.string().required("required"),
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");



  return (
    <Box m="1.5rem 2rem">
      <Header title="CADASTRAR VEÍCULO" subtitle="Cadastre um novo veículo" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={vechileSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              padding="20px"
              backgroundColor={theme.palette.primary[500]}
              borderRadius="10px"
              margin="1rem  auto"
              maxWidth={isNonMobile ? "1000px" : undefined }
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                "& .MuiInputBase-root": {
                  borderColor: "black",
                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Placa"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.plate}
                name="plate"
                error={!!touched.plate && !!errors.plate}
                helperText={touched.plate && errors.plate}
                sx={{
                  gridColumn: "span 1",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tipo do Veículo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type}
                name="type"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Modelo do Veículo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.model}
                name="model"
                error={!!touched.model && !!errors.model}
                helperText={touched.model && errors.model}
                sx={{
                  gridColumn: "span 1",
                }}
              />

              <FormControl
                sx={{
                  gridColumn: "span 2",
                }}
              >
                <InputLabel sx={{ borderColor: "black" }}>Contrato</InputLabel>
                <Select
                  label="Contrato"
                  value={contract}
                  onChange={(e) => setContract(e.target.value)}
                  sx={{
                    color: "white",
                    borderColor: theme.palette.primary[500],
                  }}
                >
                  <MenuItem value="ADM Geral">ADM Geral</MenuItem>
                  <MenuItem value="ATPN Geral">ATPN Geral</MenuItem>
                  <MenuItem value="Braskem">Braskem</MenuItem>
                  <MenuItem value="Caldeiraria">Caldeiraria</MenuItem>
                  <MenuItem value="Cavalo Marinho">Cavalo Marinho</MenuItem>
                  <MenuItem value="CIPO UMIP">CIPO UMIP</MenuItem>
                  <MenuItem value="Comp Manut Int">Comp Manut Int</MenuItem>
                  <MenuItem value="DOW Quimica">DOW Quimica</MenuItem>
                  <MenuItem value="Estacao Fluido">Estacao Fluido</MenuItem>
                  <MenuItem value="Integridade">Integridade</MenuItem>
                  <MenuItem value="Logistica BA">Logistica BA</MenuItem>
                  <MenuItem value="Logistica SE">Logistica SE</MenuItem>
                  <MenuItem value="Oficina Catu">Oficina Catu</MenuItem>
                  <MenuItem value="Origem">Origem</MenuItem>
                  <MenuItem value="Pintura Macae">Pintura Macae</MenuItem>
                  <MenuItem value="SE Terra Mar">SE Terra Mar</MenuItem>
                  <MenuItem value="SESMT">SESMT</MenuItem>
                  <MenuItem value="Sonolog">Sonolog</MenuItem>
                  <MenuItem value="SPT 115">SPT 115</MenuItem>
                  <MenuItem value="SPT 151">SPT 151</MenuItem>
                  <MenuItem value="SPT 60">SPT 60</MenuItem>
                  <MenuItem value="SPT 76">SPT 76</MenuItem>
                  <MenuItem value="SPT 88">SPT 88</MenuItem>
                  <MenuItem value="SPT 54">SPT 54</MenuItem>
                  <MenuItem value="Usinagem">Usinagem</MenuItem>
                  <MenuItem value="Comp Sondas">Comp Sondas</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Fabricante do Veículo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.manufacturer}
                name="manufacturer"
                error={!!touched.manufacturer && !!errors.manufacturer}
                helperText={touched.manufacturer && errors.manufacturer}
                sx={{
                  gridColumn: "span 2",
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cor do Veículo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.color}
                name="color"
                error={!!touched.color && !!errors.color}
                helperText={touched.color && errors.color}
                sx={{
                  gridColumn: "span 2",
                }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ano do Veículo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.year}
                name="year"
                error={!!touched.year && !!errors.year}
                helperText={touched.year && errors.year}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Capacidade do Tanque"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tankCapacity}
                name="tankCapacity"
                error={!!touched.tankCapacity && !!errors.tankCapacity}
                helperText={touched.tankCapacity && errors.tankCapacity}
                sx={{
                  gridColumn: "span 2",
                }}
              />

             
            </Box>

            <Box display="flex" justifyContent={isNonMobile ? "center" : "end"} mt='1rem'>
                <Button type="submit" color="primary" variant="contained">
                    Cadastrar veículo
                </Button>
              </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateVehicle;
