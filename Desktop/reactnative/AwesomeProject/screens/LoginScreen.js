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
import { icons, COLORS, SIZES, FONTS } from '../constants'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

const {login, googleLogin} = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={icons.nedexpressicon}
        style={styles.logo}
      />
      <Text style={styles.text}>WELCOME</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="at"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password."
        autoCapitalize="none"
        iconType="lock-closed-outline"
        secureTextEntry={true}
      />

      <FormButton 
        buttonTitle="Login"
        onPress={()=> alert("Login button pressed")}
        onPress={() => login(email, password)}
      />
      <Text style={{ marginTop: 5 ,color: COLORS.darkgray, ...FONTS.body3 }}>OR</Text>
      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => Alert.alert("NED Express", "This feature will be available soon!")}
            //onPress={() => fbLogin()}
          />

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
    padding: 20,
    paddingTop: 70
  },
  logo: {
    height: 180,
    width: 220,
    resizeMode: 'cover',
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