import React, { useState, useEffect } from "react";
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
import { useCreateVehicleMutation, useGetManufacturersQuery } from "../../state/api.js";

const CreateVehicle = () => {
  const [createVehicleMutation, data] = useCreateVehicleMutation();
  const [contractInput, setContractInput] = useState("");
  const [vehicleTypeInput, setVehicleTypeInput] = useState("")
  const [manufacturerInput, setManufacturerInput] = useState("")
  const [vehicleModelInput, setVehicleModelInput] = useState("")
  const [selectedManufacturer, setSelectedManufacurer] = useState()
  const { data: manufacturerData } = useGetManufacturersQuery()
  console.log(manufacturerData)
  console.log(manufacturerInput)

  const getManufacturer = (data) => {
   const result = data.find((element)=> {
      return element.name === manufacturerInput
    })
    return result
  }

 
  useEffect(()=> {
    setSelectedManufacurer(getManufacturer(manufacturerData))
  }, [manufacturerInput])

  console.log("====================",selectedManufacturer)
 

  const theme = useTheme();

  const handleFormSubmit = async (values) => {
    const vehicle = {
      ...values,
      contractName: contractInput,
    };
    await createVehicleMutation(vehicle);
  };

  const initialValues = {
    plate: "",
    type: "",
    model: "",
    contractName: "",
    manufacturer: "",
    color: "",
    year: "",
    tankCapacity: "",
  };

  const vechileSchema = yup.object().shape({
    plate: yup
      .string()
      .required("required")
      .min(7, "Placa inválida!")
      .max(7, "Placa inválida"),
    type: yup.string().required("required"),
    model: yup.string().required("required"),
    manufacturer: yup.string().required("required"),
    color: yup.string(),
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
              maxWidth={isNonMobile ? "1000px" : undefined}
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                "& .MuiInputBase-root": {
                  borderColor: "black",
                },
              }}
            >

              <Box display="flex"
                flexDirection="column"
                sx={{ gridColumn: "span 1" }}
              >
                <InputLabel sx={{ borderColor: "black" }}>Placa</InputLabel>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label=""
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

              </Box>


              <Box display="flex"
                flexDirection="column"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel sx={{ borderColor: "black" }}>Contrato</InputLabel>
                <Select
                  label="Contrato"
                  name="contractName"
                  value={contractInput}
                  onChange={(e) => setContractInput(e.target.value)}
                  sx={{
                    color: "white",
                    borderColor: theme.palette.primary[500],
                    width: "100%"
                  }}
                >
                  <MenuItem value="ADM GERAL">ADM Geral</MenuItem>
                  <MenuItem value="ATPN GERAL">ATPN Geral</MenuItem>
                  <MenuItem value="BRASKEM">Braskem</MenuItem>
                  <MenuItem value="CALDEIRARIA">Caldeiraria</MenuItem>
                  <MenuItem value="CAVALO MARINHO">Cavalo Marinho</MenuItem>
                  <MenuItem value="CIPO UMIP">CIPO UMIP</MenuItem>
                  <MenuItem value="COMP MANUT INT">Comp Manut Int</MenuItem>
                  <MenuItem value="DOW QUIMICA">DOW Quimica</MenuItem>
                  <MenuItem value="ESTACAO FLUIDO">Estacao Fluido</MenuItem>
                  <MenuItem value="INTEGRIDADE">Integridade</MenuItem>
                  <MenuItem value="LOGISTICA BA">Logistica BA</MenuItem>
                  <MenuItem value="LOGISTICA SE">Logistica SE</MenuItem>
                  <MenuItem value="OFICINA CATU">Oficina Catu</MenuItem>
                  <MenuItem value="ORIGEM">Origem</MenuItem>
                  <MenuItem value="PINTURA MACAE">Pintura Macae</MenuItem>
                  <MenuItem value="SE TERRA MAR">SE Terra Mar</MenuItem>
                  <MenuItem value="SESMT">SESMT</MenuItem>
                  <MenuItem value="SONOLOG">Sonolog</MenuItem>
                  <MenuItem value="SPT 115">SPT 115</MenuItem>
                  <MenuItem value="SPT 151">SPT 151</MenuItem>
                  <MenuItem value="SPT 60">SPT 60</MenuItem>
                  <MenuItem value="SPT 76">SPT 76</MenuItem>
                  <MenuItem value="SPT 88">SPT 88</MenuItem>
                  <MenuItem value="SPT 54">SPT 54</MenuItem>
                  <MenuItem value="USINAGEM">Usinagem</MenuItem>
                  <MenuItem value="COMP SONDAS">Comp Sondas</MenuItem>
                </Select>
              </Box>

              <Box display="flex"
                flexDirection="column"
                sx={{ gridColumn: "span 1" }}
              >
                <InputLabel sx={{ borderColor: "black" }}>Tipo do Veículo</InputLabel>
                <Select
                  label="Tipo do Veículo"
                  name="type"
                  value={vehicleTypeInput}
                  onChange={(e) => setVehicleTypeInput(e.target.value)}
                  sx={{
                    color: "white",
                    borderColor: theme.palette.primary[500],
                    gridColumn: "span 1",
                  }}
                >
                  <MenuItem value="LEVE">Leve</MenuItem>
                  <MenuItem value="CAMINHÕES">Caminhão</MenuItem>
                  <MenuItem value="MÁQUINAS/EQUIPAMENTOS">Máquinas/Equipamentos</MenuItem>
                  <MenuItem value="SONDA">Sonda</MenuItem>
                </Select>

              </Box>

              <Box display="flex"
                flexDirection="column"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel sx={{ borderColor: "black" }}>Fabricante</InputLabel>
                <Select
                  label="Fabricante do Veículo"
                  name="type"
                  value={manufacturerInput}
                  onChange={(e) => setManufacturerInput(e.target.value)}
                  sx={{
                    color: "white",
                    borderColor: theme.palette.primary[500],
                    gridColumn: "span 1",
                  }}
                >
                  {manufacturerData ?

                    manufacturerData.map((item) => (
                      <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                    )) :
                    <MenuItem> Carregando...</MenuItem>
                  }
                </Select>

              </Box>

              <Box display="flex"
                flexDirection="column"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel sx={{ borderColor: "black" }}>Modelo do Veículo</InputLabel>
                <Select
                  label="Modelo do Veículo"
                  name="type"
                  value={vehicleModelInput}
                  onChange={(e) => setVehicleModelInput(e.target.value)}
                  sx={{
                    color: "white",
                    borderColor: theme.palette.primary[500],
                    gridColumn: "span 2",
                  }}
                >
                  { selectedManufacturer ? selectedManufacturer.models.map(()=> (
                    <></>
                  )) : 
                  <MenuItem> Selecione um Fabricante</MenuItem>

                  }
                </Select>

              </Box>


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
            </Box>




            <Box display="flex"
              flexDirection="column"
              sx={{ gridColumn: "span 1" }}
            >
              <InputLabel sx={{ borderColor: "black" }}>Tipo do Veículo</InputLabel>
              <Select
                label="Tipo do Veículo"
                name="type"
                value={vehicleTypeInput}
                onChange={(e) => setVehicleTypeInput(e.target.value)}
                sx={{
                  color: "white",
                  borderColor: theme.palette.primary[500],
                  gridColumn: "span 1",
                }}
              >
                <MenuItem value="LEVE">Leve</MenuItem>
                <MenuItem value="CAMINHÕES">Caminhão</MenuItem>
                <MenuItem value="MÁQUINAS/EQUIPAMENTOS">Máquinas/Equipamentos</MenuItem>
                <MenuItem value="SONDA">Sonda</MenuItem>
              </Select>

            </Box>

            <Box
              display="flex"
              justifyContent={isNonMobile ? "center" : "end"}
              mt="1rem"
            >
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
