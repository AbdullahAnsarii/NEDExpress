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
import { windowHeight, windowWidth } from '../utils/Dimensions';

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
        placeholderText="Email   "
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
      <Text style={{ marginTop: 5 ,marginBottom:5,color: COLORS.darkgray, ...FONTS.body3 }}>OR</Text>
      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={{ marginTop: 5 ,color: COLORS.darkgray, ...FONTS.body3 }}>
          Don't have an acount? <Text style={{color: COLORS.primary ,textDecorationLine: "underline"}}>Create here</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    paddingTop: windowHeight/12,
    flex: 1
  },
  logo: {
    width: windowWidth/1.5,
    height: windowHeight/4,
    resizeMode: 'stretch',
  },
  text: {
    fontSize: windowHeight/30 ,
    fontFamily: FONTS.h1.fontFamily,
    marginBottom: 10,
    color: COLORS.black,
  },
  navButton: {
    marginTop: 10,
  }
  
});