import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GoogleSignin } from '@react-native-community/google-signin';
import { COLORS } from '../constants';

const Stack = createStackNavigator();

const AuthStack = () => {
let routeName;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '292778080288-61c89v8nm1puk41rdp82hvqbls766qfh.apps.googleusercontent.com',
    });
  
  }, []);

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
             <Ionicons name={"arrow-back-circle"} size={43} style={{ marginTop: 0, marginLeft: 0 }} color={COLORS.secondary} onPress={() => navigation.goBack()} />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
