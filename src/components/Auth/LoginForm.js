import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import formStyles from '../../styles/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginAPI } from "../../api/user"
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth"

export default function LoginForm(props) {
    const { changeForm } = props;
    const [ loading, setLoading ] = useState(false);
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try{
                const response = await loginAPI(formData);
                if(response.statusCode){
                    throw "Wrong credentials.";
                }
                else{
                    login(response);
                }
            }
            catch(e){
                setLoading(false);
                Toast.show("The credentials are incorrect. Please try again.", {
                    position: Toast.positions.CENTER,
                });
            }
        }
    })

    return (
        <View>
            <TextInput label="Email or Username" activeUnderlineColor="#000000" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("identifier", text)} value={formik.values.identifier} error={formik.errors.identifier}/>
            <TextInput label="Password" activeUnderlineColor="#000000" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("password", text)} value={formik.values.password} error={formik.errors.password}/>
            <Button mode="contained" style={formStyles.btn} secureTextEntry onPress={formik.handleSubmit} loading={loading}>Log In</Button>
            <Button mode="text" color="#000000" style={formStyles.textBtn} onPress={changeForm}>Sign Up</Button>
        </View>
    );
}

function initialValues() {
    return {
        identifier: "", 
        password: "",
    }
}

function validationSchema(){
    return{
        identifier: Yup.string(true).required(true),
        password: Yup.string(true).required(true)
    }
}