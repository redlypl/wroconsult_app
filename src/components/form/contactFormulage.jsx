import React from "react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import axios from "axios"
import {
    ContactFormulageWrapper,
    H2,
    Form,
    FormFlexWrapper,
    LeftCol,
    RightCol,
    Field,
    Input,
    Label,
    Textarea,
    LabelTextarea,
    Button,
    ErrorAlert,
} from "./contactFormulage.style"

const ContactFormulage = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            message: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Niepoprawny adres email').required('To pole jest wymagane'),
            name: Yup.string().required('To pole jest wymagane'),
            message: Yup.string().required('To pole jest wymagane'),
        }),
        onSubmit: values => {
            axios.post('https://1sysobpx3f.execute-api.eu-north-1.amazonaws.com/prod/contact', values)
            .then(response => {
                window.location.replace('/wyslano')
            })

        },
    })
    return(
        <ContactFormulageWrapper>
            <H2>Skontaktuj się z nami poprzez formularz kontaktowy</H2>
            <Form onSubmit={formik.handleSubmit}>
                <FormFlexWrapper>
                    <LeftCol>
                        {/* email field */}
                        <Field>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder=" "
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            <Label htmlFor="email">Adres Email</Label>
                        </Field>
                        {formik.touched.email && formik.errors.email ? (
                            <ErrorAlert>{formik.errors.email}</ErrorAlert>
                        ) : null}
                        {/* name field */}
                        <Field>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder=" "
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            <Label htmlFor="name">Nazwa Podmiotu</Label>
                        </Field>
                        {formik.touched.name && formik.errors.name ? (
                            <ErrorAlert>{formik.errors.name}</ErrorAlert>
                        ) : null}
                    </LeftCol>
                    {/* message field */}
                    <RightCol>
                        <Field>
                            <Textarea
                                name="message"
                                id="message"
                                placeholder=" "
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.message}
                            ></Textarea>
                            <LabelTextarea htmlFor="message">Treść wiadomości</LabelTextarea>
                        </Field>
                        {formik.touched.message && formik.errors.message ? (
                            <ErrorAlert>{formik.errors.message}</ErrorAlert>
                        ) : null}
                    </RightCol>
                </FormFlexWrapper>
                {/* submit button */}
                <Button>Wyślij</Button>
            </Form>
        </ContactFormulageWrapper>
    )
}

export default ContactFormulage