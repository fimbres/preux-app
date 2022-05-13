import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import formStyles from '../../styles/Form';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { updateUserAPI } from '../../api/user';
import Toast from 'react-native-root-toast';

export default function ChangePassword() {
    const { auth, logout } = useAuth();
    const [ loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try{
                const response = await updateUserAPI(auth, formData);
                if(response.statusCode) throw "Something went wrong";
                logout();
            }
            catch{
                Toast.show("Something went wrong",
                {position: Toast.positions.CENTER});
                setLoading(false);
            }
        }
    });

  return (
    <View  style={styles.container}>
      <TextInput label="Password" activeUnderlineColor="#000000" secureTextEntry style={formStyles.input} onChangeText={(text) => {formik.setFieldValue("password", text)}} value={formik.values.password} error={formik.errors.password}/>
      <TextInput label="Repeat the password" activeUnderlineColor="#000000" secureTextEntry style={formStyles.input} onChangeText={(text) => {formik.setFieldValue("repeatpassword", text)}} value={formik.values.repeatpassword} error={formik.errors.repeatpassword}/>
      <Button mode="contained" style={formStyles.btn} onPress={formik.handleSubmit} loading={loading}>Update your password</Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})

function initialValues(){
    return {
        password: "",
        repeatpassword: "",
    }
}

function validationSchema(){
    return {
        password: Yup.string(true).required(true),
        repeatpassword: Yup.string(true).required(true).oneOf([Yup.ref("password")], true)
    }
}