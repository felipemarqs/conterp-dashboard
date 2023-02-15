import React from 'react';
import { Formik } from 'formik'
import * as yup from 'yup'
import { Box , Button , TextField } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header'

const CreateContract = () => {

    const initialValues = {
        name: "",
        isActive: true
    }

    const contractSchema = yup.object().shape({
        name: yup.string().required("required")
    })

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <Box m="1.5rem 2rem">
            <Header title="CADASTRAR CONTRATO" subtitle="Cadastre um novo contrato"/>

            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={yup.object().shape({
                    name: yup.string().required(),
                })}
            >



            </Formik>
        </Box>
    )
}

export default CreateContract;