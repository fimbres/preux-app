import { View, Text, StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import { TextInput, Button } from 'react-native-paper'
import formStyles from '../../styles/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getMyAPI, updateUserAPI } from '../../api/user';
import useAuth from '../../hooks/useAuth';
import Toast from 'react-native-root-toast';

export default function ChangeName() {
    const [ loading, setLoading ] = useState(false);
    const { auth } = useAuth();
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try{
                await updateUserAPI(auth, formData);
                navigation.goBack();
            }
            catch(err){
                Toast.show("Something went wrong!", {
                    position: Toast.positions.CENTER
                });
                setLoading(false);
            }
        }
    });

useFocusEffect( 
    useCallback(() => {
        (async () => {
            const response = await getMyAPI(auth.token);
            console.log(response);
            if(response.name && response.lastname){
                await formik.setFieldValue("name", response.name);
                await formik.setFieldValue("lastname", response.lastname);
            }
        })()
    }, [])
)

  return (
    <View style={styles.container}>
      <TextInput activeUnderlineColor="#000000" label="Name" style={formStyles.input} onChangeText={(text) => {formik.setFieldValue("name", text)}} value={formik.values.name} error={formik.errors.name}/>
      <TextInput activeUnderlineColor="#000000" label="Lastname" style={formStyles.input} onChangeText={(text) => {formik.setFieldValue("lastname", text)}} value={formik.values.lastname} error={formik.errors.name}/>
      <Button mode="contained" style={formStyles.btn} onPress={formik.handleSubmit} loading={loading}>Update my account</Button>
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
        name: "",
        lasname: "",
    }
}

function validationSchema(){
    return {
        name: Yup.string(true).required(true),
        lastname: Yup.string(true).required(true)
    }
}