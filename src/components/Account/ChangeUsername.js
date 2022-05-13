import { View, StyleSheet } from 'react-native';
import React, { useCallback , useState} from 'react';
import { TextInput, Button} from 'react-native-paper';
import formStyles from '../../styles/Form';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import useAuth from '../../hooks/useAuth';
import { getMyAPI, updateUserAPI } from '../../api/user';
import Toast from 'react-native-root-toast';

export default function ChangeUsername() {
    const { auth } = useAuth();
    const [ loading, setLoading ] = useState(false);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
                (async () => {
                    const response = await getMyAPI(auth.token);
                    if(response.username){
                        await formik.setFieldValue("username", response.username);
                    }
                })();
        }, [])
    );

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await updateUserAPI(auth, formData);
                if(response.statusCode) throw "The Username already exists";
                navigation.goBack();
            }
            catch (err) {
                Toast.show("Something went wrong",
                {position: Toast.positions.CENTER});
                setLoading(false);
            }
        }
    });

  return (
    <View style={styles.container}>
      <TextInput label="Username" activeUnderlineColor="#000000" style={formStyles.input} onChangeText={(text) => {formik.setFieldValue("username", text)}} value={formik.values.username} error={formik.errors.username}/>
      <Button style={formStyles.btn} mode="contained" onPress={formik.handleSubmit} loading={loading}>Update username</Button>
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
        username: ""
    }
}

function validationSchema(){
    return {
        username: Yup.string(true).required(true)
    }
}