import { StyleSheet, View, Text } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import formStyles from '../../styles/Form';
import { getMyAPI, updateUserAPI } from '../../api/user';
import useAuth from '../../hooks/useAuth';
import Toast from 'react-native-root-toast';
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ChangeEmail() {
    const { auth } = useAuth();
    const [ loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useFocusEffect( useCallback(() => {
        (async () => {
            const response = await getMyAPI(auth.token);
            if(response.email){
                await formik.setFieldValue("email", response.email);
            }
        })();
    }, [])
    );

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try{
                const response = await updateUserAPI(auth, formData);
                if(response.statusCode) throw "The email already exists!";
                navigation.goBack();
            }
            catch(err) {
                Toast.show("Something went wrong",
                {position: Toast.positions.CENTER});
                setLoading(false);
                formik.setFieldError("email", true);
            }
        }
    })

  return (
    <View style={styles.container}>
      <TextInput label="Email" activeUnderlineColor="#000000" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("email", text)} value={formik.values.email} error={formik.errors.email}/>
      <Button mode="contained" style={formStyles.btn} onPress={formik.handleSubmit} loading={loading}>Update my email</Button>
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
        email: "",
    }
}

function validationSchema(){
    return {
        email: Yup.string(true).email(true).required(true)
    }
}