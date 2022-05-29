import React, { useState } from 'react';
import { View } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { useFormik } from "formik";
import * as Yup from "yup";
import { formStyles } from '../../styles/Index';
import { registerAPI } from "../../api/user";
import Toast from "react-native-root-toast";

export default function RegisterForm(props){
    const { changeForm } = props;
    const [ loading, setLoading ] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try{
                await registerAPI(formData);
                changeForm();
            }catch(e){
                setLoading(false);
                Toast.show("Something went wrong. Please try again.", {
                    position: Toast.positions.CENTER,
                });
            }
        },
    });

    return (
        <View style={formStyles.form}>
            <TextInput label="Username" activeUnderlineColor="#000000" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("username", text)} value={formik.values.username} error={formik.errors.username}/>
            <TextInput label="Email" activeUnderlineColor="#000000" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("email", text)} value={formik.values.email} error={formik.errors.email}/>
            <TextInput label="Password" activeUnderlineColor="#000000" secureTextEntry style={formStyles.input} onChangeText={(text) => formik.setFieldValue("password", text)} value={formik.values.password} error={formik.errors.password}/>
            <TextInput label="Repeat password" activeUnderlineColor="#000000" secureTextEntry style={formStyles.input} onChangeText={(text) => formik.setFieldValue("repeatPassword", text)} value={formik.values.repeatPassword} error={formik.errors.repeatPassword}/>
            <Button mode="container" color="#ffffff" style={formStyles.btn} onPress={formik.handleSubmit} loading={loading}>Sign Up</Button>
            <Button color="#000000" style={formStyles.textBtn} onPress={changeForm}> Sign In</Button>
        </View>
    );
}

function initialValues(){
    return {
        email: "",
        username: "",
        password: "",
        repeatPassword: ""
    }
}

function validationSchema(){
    return {
        email: Yup.string(true).email(true).required(true),
        username: Yup.string(true).required(true),
        password: Yup.string(true).required(true),
        repeatPassword: Yup.string(true).required(true).oneOf([Yup.ref("password")], true)
    }
}