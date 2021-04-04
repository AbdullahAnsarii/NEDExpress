import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import { icons, COLORS, SIZES, FONTS } from '../constants'

const SignupScreen = ({navigation}) => {
    const [name, setName] = useState();
    const [department, setDepartment] = useState();
    const [rollno, setRollno] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [contactno, setContactno] = useState();

const {register} = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      <FormInput
        labelValue={name}
        onChangeText={(userName) => setName(userName)}
        placeholderText="Name"
        iconType="person-outline"
        autoCorrect={false}
      />
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
      labelValue={contactno}
      onChangeText={(userContactno) => setContactno(userContactno)}
      placeholderText="Contact no."
      iconType="call-outline"
      keyboardType="numeric"
      autoCorrect={false}
    />
      <FormInput
      labelValue={rollno}
      onChangeText={(userRollno) => setRollno(userRollno)}
      placeholderText="Roll no. (CS-XXXXX)."
      iconType="card-outline"
      autoCorrect={false}
    />
    <FormInput
        labelValue={department}
        onChangeText={(userDepartment) => setDepartment(userDepartment)}
        placeholderText="Department"
        iconType="book-outline"
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
      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Confirm Password."
        autoCapitalize="none"
        iconType="shield-outline"
        secureTextEntry={true}
      />

      <FormButton 
        buttonTitle="Register"
        onPress={() => register( name,email, password,rollno, department, contactno)}
      />
      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign Up with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            //onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            //onPress={() => googleLogin()}
          />
        </View>
      ) : null}
      <View style={styles.textPrivate}>
        <Text style={{ color: COLORS.darkgray, fontSize: 13.5, fontFamily: FONTS.body1.fontFamily, marginTop: 14 }}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={{ color: COLORS.orange, fontSize: 13.5, fontFamily: FONTS.body1.fontFamily}}>
            Terms of service
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  text: {
    fontFamily: FONTS.h1.fontFamily,
    fontSize: 32,
    marginBottom: 10,
    color: '#051d5f',
  },
});