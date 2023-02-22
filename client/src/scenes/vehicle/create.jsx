import React from 'react';
import { Formik } from 'formik'
import * as yup from 'yup'
import { Box , Button , TextField, useTheme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header'

const CreateVehicle = () => {

    const theme = useTheme()

    const initialValues = {
        plate: "",
        type: "",
        model: "",
        contractId: "",
        manufacturer: "",
        color: "",
        Year: "",
        tankCapacity: "",
    }

    const vechileSchema = yup.object().shape({
        plate: yup.string().required("required"),
        type: yup.string().required("required"),
        model: yup.string().required("required"),
        contractId: yup.string().required("required"),
        manufacturer: yup.string().required("required"),
        color: yup.string().required("required"),
        year: yup.string().required("required"),
        tankCapacity: yup.string().required("required"),
    })

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <Box m="1.5rem 2rem">
            <Header title="CADASTRAR VEÍCULO" subtitle="Cadastre um novo veículo"/>

            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={yup.object().shape({
                    name: yup.string().required(),
                })}
            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <Box 
                            display="grid"
                            padding="20px"
                            backgroundColor={theme.palette.primary[500]}
                            gap="30px" 
                            gridTemplateColumns="4, minmax(0, 1fr)"
                            sx={{
                                "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                                "& .MuiInputBase-root": {
                                    borderColor: "black",
                                  },
                            }}
                            >
                                <TextField
                                    fullWidth
                                    variant='filled'
                                    type="text"
                                    label="Placa"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.plate}
                                    name="plate"
                                    error={!!touched.plate && !!errors.plate}
                                    helperText={touched.plate && errors.plate}
                                    sx={{
                                        gridColumn: "span 2"
                                    }}
                                />

                        </Box>
                    </form>
                )}



            </Formik>
        </Box>
    )
}

export default CreateVehicle;