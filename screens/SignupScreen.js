import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';
import { COLORS, SIZES, FONTS } from '../constants';
import {windowHeight} from '../utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignupScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    rollno: '',
    contactno: '',
    isValidName: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidContactNo: true,
    isValidRollNo: true
  });
  const [errors, setErrors] = useState(null);
  const handleValidName = (val) => {
    if( val.trim().length >= 4 ) {
        setUser({
            ...user,
            isValidName: true
        });
        setErrors(null)
    } else {
        setUser({
            ...user,
            isValidName: false
        });
        setErrors(true)
    }
}
const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const handleValidEmail = (val) => {
  if( re.test(val) === true) {
      setUser({
          ...user,
          isValidEmail: true
      });
      setErrors(null)
  } else {
      setUser({
          ...user,
          isValidEmail: false
      });
      setErrors(true)
  }
}
const handleValidContactNo = (val) => {
  if( val.trim().startsWith("03") && val.trim().length == 11) {
      setUser({
          ...user,
          isValidContactNo: true
      });
      setErrors(null)
  } else {
      setUser({
          ...user,
          isValidContactNo: false
      });
      setErrors(true)
  }
}
const handleValidRollNo = (val) => {
  if( val.trim().startsWith("1") && val.trim().length == 5) {
      setUser({
          ...user,
          isValidRollNo: true
      });
      setErrors(null)
  } else {
      setUser({
          ...user,
          isValidRollNo: false
      });
      setErrors(true)
  }
}
const handleValidPassword = (val) => {
  if( val.trim().length >= 6 ) {
      setUser({
          ...user,
          isValidPassword: true
      });
      setErrors(null)
  } else {
      setUser({
          ...user,
          isValidPassword: false
      });
      setErrors(true)
  }
}
const { register, googleSignup } = useContext(AuthContext);
const registerHandle = (name, email, password, rollno, department, contactno) => {

  if ( name.length == 0 || email.length == 0 || password.length == 0 || rollno.length == 0 || department.length == 0 || contactno.length == 0 ) {
      Alert.alert('NED Express', 'You cannot leave any field empty.');
      return;
  }
  
  register(name, email, password, rollno, department, contactno);
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      <FormInput
        labelValue={user.name}
        onChangeText={(userName) => setUser({ ...user, name: userName })}
        onEndEditing={(e)=>handleValidName(e.nativeEvent.text)}
        placeholderText="Name  "
        iconType="person-outline"
        autoCorrect={false}
      />
      {user.isValidName ? null : 
        <Text style={styles.errorMsg}>Name is too small</Text>
        }
      <FormInput
        labelValue={user.email}
        onChangeText={(userEmail) => setUser({ ...user, email: userEmail })}
        onEndEditing={(e)=>handleValidEmail(e.nativeEvent.text)}
        placeholderText="Email"
        iconType="at"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {user.isValidEmail ? null : 
        <Text style={styles.errorMsg}>Email address is badly formatted</Text>
        }
      <FormInput
        labelValue={user.contactno}
        onChangeText={(userContactno) => setUser({ ...user, contactno: userContactno })}
        onEndEditing={(e)=>handleValidContactNo(e.nativeEvent.text)}
        placeholderText="Contact no.  "
        iconType="call-outline"
        keyboardType="numeric"
        maxLength={11}
        autoCorrect={false}
      />
      {user.isValidContactNo ? null : 
        <Text style={styles.errorMsg}>Contact No. is badly formatted</Text>
        }
      <FormInput
        labelValue={user.rollno}
        onChangeText={(userRollno) => setUser({ ...user, rollno: userRollno })}
        onEndEditing={(e)=>handleValidRollNo(e.nativeEvent.text)}
        placeholderText="Roll no. (1XXXX)   "
        keyboardType="numeric"
        maxLength={5}
        iconType="card-outline"
        autoCorrect={false}
      />
      {user.isValidRollNo ? null : 
        <Text style={styles.errorMsg}>Roll No. is badly formatted</Text>
        }
      <View style={styles.picker}>
      <View style={styles.iconStyle}>
        <Ionicons name={"book-outline"} size={25} color="#666" />
      </View>
      <Picker
        //selectedValue={"Department"}
        style={{ height: 20, width: 320, color: COLORS.darkgray}}
        onValueChange={(itemValue) => setUser({ ...user, department: itemValue })}
        dropdownIconColor={COLORS.secondary}
        mode={"dropdown"}
        
      >
        <Picker.name label="Department" value="" style={{color: COLORS.secondary}}/>
        <Picker.Item label="Computer Systems Engineering" value="CIS"style={{color: COLORS.black}} />
        <Picker.Item label="Electrical Engineering" value="EE"style={{color: COLORS.black}} />
        <Picker.Item label="Mechanical Engineering" value="ME"style={{color: COLORS.black}} />
        <Picker.Item label="Civil Engineering" value="CE"style={{color: COLORS.black}} />
      </Picker>
      </View>
      <FormInput
        labelValue={user.password}
        onChangeText={(userPassword) => setUser({ ...user, password: userPassword })}
        onEndEditing={(e)=>handleValidPassword(e.nativeEvent.text)}
        secureTextEntry={true}
        placeholderText="Password  "
        autoCapitalize="none"
        iconType="lock-closed-outline"
        autoCorrect={false}
      />
      { user.isValidPassword ? null : 
            <Text style={styles.errorMsg}>Password is too small</Text>}
      <FormInput
        labelValue={user.password}
        onChangeText={(userPassword) => setUser({ ...user, password: userPassword })}
        placeholderText="Confirm Password   "
        secureTextEntry={true}
        autoCapitalize="none"
        iconType="shield-outline"
        autoCorrect={false}
      />

      <FormButton
        buttonTitle="Register"
        onPress={errors ? () => Alert.alert("NED Express", "Please provide valid credential!") : () => registerHandle(user.name, user.email, user.password, user.rollno, user.department, user.contactno) }
      />
      <View style={styles.textPrivate}>
        <Text style={{ color: COLORS.darkgray, fontSize: 13.5, fontFamily: FONTS.body1.fontFamily, marginTop: 3 }}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={{ color: COLORS.primary, fontSize: 13.5, fontFamily: FONTS.body1.fontFamily }}>
            Terms of service
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{color: COLORS.darkgray, ...FONTS.body3 }}>OR</Text>
      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleSignup()}
          />
        </View>
      ) : null}
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  picker: {
    marginTop: 5,
    marginBottom: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: SIZES.radius,
    borderWidth: 1,
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    paddingBottom: 23
  },
  text: {
    marginTop: -55,
    fontFamily: FONTS.h1.fontFamily,
    fontSize: 32,
    marginBottom: 10,
    color: '#051d5f',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    fontFamily: FONTS.body1.fontFamily
},
});