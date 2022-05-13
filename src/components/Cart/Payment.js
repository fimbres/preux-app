import { StyleSheet, View, Text } from 'react-native';
import React, {useState} from 'react';
import { TextInput, Button } from 'react-native-paper';
import colors from '../../styles/Colors';
import formStyles from '../../styles/Form';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { STRIPE_PUBLISH_KEY } from '../../utils/constants';
import Toast from 'react-native-root-toast';
import { paymentCartAPI, deleteCartAPI } from '../../api/cart';
import useAuth from '../../hooks/useAuth';
import { size } from 'lodash';
const stripe = require('stripe-client')(STRIPE_PUBLISH_KEY);

export default function Payment(props) {
    const { products, selectedAddress, totalPayment } = props;
    const [ loading, setLoading ] = useState(false);
    const { auth } = useAuth();
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const result = await stripe.createToken({card: formData});
                if(result?.error){
                    setLoading(false);
                    Toast.show("Something went wrong", {position: Toast.positions.CENTER});
                }
                else{
                    const response = await paymentCartAPI(auth, result.id, products, selectedAddress);
                    if(size(response) > 0){
                        const response2 = await deleteCartAPI();
                        if(response2){
                            navigation.navigate("orders");
                        }
                        else{
                            Toast.show("Something went wrong", {position: Toast.positions.CENTER});
                        }
                    }
                    else{
                        Toast.show("Something went wrong", {position: Toast.positions.CENTER});
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method</Text>
      <TextInput label="Debit/Credit Card Name" style={formStyles.input} activeUnderlineColor={colors.black} onChangeText={(text) => formik.setFieldValue("name", text)} value={formik.values.name} error={formik.errors.name}/>
      <TextInput label="Debit/Credit Card Number" style={formStyles.input} activeUnderlineColor={colors.black} onChangeText={(text) => formik.setFieldValue("number", text)} value={formik.values.number} error={formik.errors.number}/>
      <View style={styles.containerInput}>
          <View style={styles.containerMY}>
            <TextInput label="Month" style={formStyles.inputDate} activeUnderlineColor={colors.black} onChangeText={(text) => formik.setFieldValue("exp_month", text)} value={formik.values.exp_month} error={formik.errors.exp_month}/>
            <TextInput label="Year" style={formStyles.inputDate} activeUnderlineColor={colors.black} onChangeText={(text) => formik.setFieldValue("exp_year", text)} value={formik.values.exp_year} error={formik.errors.exp_year}/>
          </View>
          <TextInput label="CVV/CVC" style={formStyles.inputCVV} activeUnderlineColor={colors.black} onChangeText={(text) => formik.setFieldValue("cvc", text)} value={formik.values.cvc} error={formik.errors.cvc}/>
      </View>
      <Button mode="contained" contentStyle={styles.btnContent} labelStyle={styles.btnLabel} onPress={!loading && formik.handleSubmit} loading={loading}>Proceed to payment</Button>
    </View>
  );
}

function initialValues(){
    return {
        number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
        name: "",
    };
}

function validationSchema(){
    return {
        number: Yup.string(true).min(16, true).max(16, true).required(true),
        exp_month: Yup.string(true).min(1,true).max(2, true).required(true),
        exp_year: Yup.string(true).min(2,true).max(2, true).required(true),
        cvc: Yup.string(true).min(3,true).max(3, true).required(true),
        name: Yup.string(true).min(1,true).required(true),
    };
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    title: {
        paddingBottom: 15,
        fontSize: 24,
        fontWeight: 'bold',
    },
    containerInput: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20
    },
    containerMY: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end'
    },
    inputDate: {
        width: 100,
        marginRight: 10
    },
    btnLabel: {
        fontSize: 16
    },
    btnContent: {
        paddingVertical: 4,
        backgroundColor: colors.black
    }
})