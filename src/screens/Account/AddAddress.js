import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import formStyles from '../../styles/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addAddressAPI, getAddressAPI, updateAddressAPI } from '../../api/address';
import Toast from 'react-native-root-toast';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

export default function AddAddress(props) {
    const { route: { params } } = props;
    const { auth } = useAuth();
    const  [ add, setAdd ] = useState(true);
    const [ loading, setLoading ] = useState(false);
    const navigation = useNavigation();
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                if(add){
                    const response = await addAddressAPI(auth, formData);
                    console.log(response);
                    navigation.goBack();
                }
                else{
                    const response = await updateAddressAPI(auth, formData);
                    console.log(response);
                    navigation.goBack();
                }
            } catch (error) {
                Toast.show("Something went wrong",
                {position: Toast.positions.CENTER})
                setLoading(false);
            }
        }
    });

    useEffect(() => {
        (async () => {
            if(params?.idAddress){
                setAdd(false);
                const response = await getAddressAPI(auth, params.idAddress);
                await formik.setFieldValue("_id", response._id);
                await formik.setFieldValue("title", response.title);
                await formik.setFieldValue("name_lastname", response.name_lastname);
                await formik.setFieldValue("address", response.address);
                await formik.setFieldValue("postal_code", response.postal_code);
                await formik.setFieldValue("city", response.city);
                await formik.setFieldValue("state", response.state);
                await formik.setFieldValue("country", response.country);
                await formik.setFieldValue("phone", response.phone);
            }
        })();
    }, [params]);

  return (
    <KeyboardAwareScrollView extraScrollHeight={25} endFillColor="#ddd">
      <View style={styles.container}>
        {add ? <Text style={styles.title}>New Address</Text> : <Text style={styles.title}>Edit Address</Text>}
        <TextInput style={formStyles.input} activeUnderlineColor="#000000" label="Title" onChangeText={(text) => {formik.setFieldValue("title",text)}} value={formik.values.title} error={formik.errors.title}/>
        <TextInput style={formStyles.input} activeUnderlineColor="#000000" label="Name and lastname" onChangeText={(text) => {formik.setFieldValue("name_lastname",text)}} value={formik.values.name_lastname} error={formik.errors.name_lastname}/>
        <TextInput style={formStyles.input} activeUnderlineColor="#000000" label="Address" onChangeText={(text) => {formik.setFieldValue("address",text)}} value={formik.values.address} error={formik.errors.address}/>
        <TextInput style={formStyles.input} activeUnderlineColor="#000000" label="Zip code" onChangeText={(text) => {formik.setFieldValue("postal_code",text)}} value={formik.values.postal_code} error={formik.errors.postal_code}/>
        <TextInput style={formStyles.input} activeUnderlineColor="#000000" label="City" onChangeText={(text) => {formik.setFieldValue("city",text)}} value={formik.values.city} error={formik.errors.city}/>
        <TextInput style={formStyles.input} activeUnderlineColor="#000000" label="State" onChangeText={(text) => {formik.setFieldValue("state",text)}} value={formik.values.state} error={formik.errors.state}/>
        <TextInput style={formStyles.input} activeUnderlineColor="#000000" label="Country" onChangeText={(text) => {formik.setFieldValue("country",text)}} value={formik.values.country} error={formik.errors.country}/>
        <TextInput style={formStyles.input} activeUnderlineColor="#000000" label="Phone number" onChangeText={(text) => {formik.setFieldValue("phone",text)}} value={formik.values.phone} error={formik.errors.phone}/>
        {add ? <Button mode="contained" style={formStyles.btn} onPress={formik.handleSubmit} loading={loading}>Add new address</Button> : <Button mode="contained" style={formStyles.btn} onPress={formik.handleSubmit} loading={loading}>Edit address</Button>}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16
    }
});

function initialValues(){
    return {
        title: '',
        name_lastname: '',
        address: '',
        postal_code: '',
        city: '',
        state: '',
        country: '',
        phone: '',
    };
}

function validationSchema(){
    return {
        title: Yup.string(true).required(true),
        name_lastname: Yup.string(true).required(true),
        address: Yup.string(true).required(true),
        postal_code: Yup.string(true).required(true),
        city: Yup.string(true).required(true),
        state: Yup.string(true).required(true),
        country: Yup.string(true).required(true),
        phone: Yup.string(true).required(true),
    };
}