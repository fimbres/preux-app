import { View, Text } from 'react-native';
import React, { useState, useCallback } from 'react';
import StatusBarCustom from '../../components/StatusBar';
import { useFocusEffect } from '@react-navigation/native'
import Colors from '../../styles/Colors';
import LayoutStyle from '../../styles/Layout';
import useAuth from '../../hooks/useAuth';
import { getMyAPI } from '../../api/user';
import ScreenLoading from '../../components/ScreenLoading'
import UserInfo from '../../components/Account/UserInfo';
import Menu from '../../components/Account/Menu';

export default function Account() {
  const [user, setUser] = useState(null);
  const { auth } = useAuth();

  useFocusEffect( useCallback(() => {
    (async () => {
      const response = await getMyAPI(auth.token);
        setUser(response);
    })();
  }, []));

  return (
    <>
      <StatusBarCustom BackgroundColor={Colors.black} barStyle="light-content"/>
      <View style={LayoutStyle.containerB}>
        {!user ? <ScreenLoading/> : 
        <>
          <UserInfo user={user}/>
          <Menu/>
        </>}
      </View>
    </>
  );
}
