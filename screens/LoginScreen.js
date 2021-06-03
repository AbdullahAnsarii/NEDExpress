import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import { icons, COLORS, SIZES, FONTS, images } from '../constants'

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const {login, googleLogin} = useContext(AuthContext);
  const loginHandle = (email, password) => {

    if ( email.length == 0 || password.length == 0 ) {
        Alert.alert('NED Express', 'Email address or password field cannot be empty.');
        return;
    }
    
    login(email, password);
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={images.nedexpressicon}
        style={styles.logo}
        resizeMethod={'scale'}
      />
      <Text style={styles.text}>WELCOME</Text>

      <FormInput
        labelValue={user.email}
        onChangeText={(userEmail) => setUser({ ...user, email: userEmail })}
        placeholderText="Email"
        iconType="at"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={user.password}
        onChangeText={(userPassword) => setUser({ ...user, password: userPassword })}
        placeholderText="Password   "
        autoCapitalize="none"
        iconType="lock-closed-outline"
        secureTextEntry={true}
      />

      <FormButton 
        buttonTitle="Login"
        onPress={() => loginHandle(user.email, user.password)}
      />
      <Text style={{ marginTop: 5 ,color: COLORS.darkgray, ...FONTS.body3 }}>OR</Text>
      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={{ marginTop: 5 ,color: COLORS.darkgray, ...FONTS.body3 }}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 70,
    paddingBottom: 213
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'stretch',
  },
  text: {
    fontFamily: FONTS.h1.fontFamily,
    fontSize: 29,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 10,
  }
  
});