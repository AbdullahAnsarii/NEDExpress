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
import { Picker } from '@react-native-picker/picker';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';
import { COLORS, SIZES, FONTS } from '../constants';
import { windowHeight } from '../utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignupScreen = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
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
    if (val.trim().length >= 4) {
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
    if (re.test(val) === true) {
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
    if (val.trim().startsWith("03") && val.trim().length == 11) {
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
    if (val.trim().startsWith("1") && val.trim().length == 5) {
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
    if (val.trim().length >= 6) {
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
  const registerHandle = (name, email, password, cpassword, rollno, department, contactno) => {
    if (password !== cpassword) {
      Alert.alert('NED Express', 'Your passwords do not match');
      return;
    }
    if (name.length == 0 || email.length == 0 || password.length == 0 || rollno.length == 0 || department.length == 0 || contactno.length == 0 || cpassword.length == 0) {
      Alert.alert('NED Express', 'You cannot leave any field empty.');
      return;
    }
    else {
      register(name, email, password, rollno, department, contactno);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      <FormInput
        labelValue={user.name}
        onChangeText={(userName) => setUser({ ...user, name: userName })}
        onEndEditing={(e) => handleValidName(e.nativeEvent.text)}
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
        onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
        placeholderText="Email   "
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
        onEndEditing={(e) => handleValidContactNo(e.nativeEvent.text)}
        placeholderText="Contact no.    "
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
        onEndEditing={(e) => handleValidRollNo(e.nativeEvent.text)}
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
          style={{ height: windowHeight/15, width: "86%", color: COLORS.darkgray }}
          onValueChange={(itemValue) => setUser({ ...user, department: itemValue })}
          dropdownIconColor={COLORS.primary}
          mode={"dropdown"}

        >
          <Picker.name label="Department" value="" style={{ color: COLORS.secondary }} />
          <Picker.Item label="1) Computer Systems Engineering" value="CIS" style={{ color: COLORS.black }} />
          <Picker.Item label="2) Electrical Engineering" value="EE" style={{ color: COLORS.black }} />
          <Picker.Item label="3) Electronic Engineering" value="EL" style={{ color: COLORS.black }} />
          <Picker.Item label="4) Mechanical Engineering" value="ME" style={{ color: COLORS.black }} />
          <Picker.Item label="5) Textile Engineering" value="TE" style={{ color: COLORS.black }} />
          <Picker.Item label="6) Industrial & Manufacturing Engineering" value="IM" style={{ color: COLORS.black }} />
          <Picker.Item label="7) Civil Engineering" value="CE" style={{ color: COLORS.black }} />
          <Picker.Item label="8) Software Engineering" value="SE" style={{ color: COLORS.black }} />
          <Picker.Item label="9) Computer Science and Info. Technology" value="BCIT" style={{ color: COLORS.black }} />
          <Picker.Item label="10) Chemical Engineering" value="CH" style={{ color: COLORS.black }} />
          <Picker.Item label="11) Petroleum Engineering" value="PE" style={{ color: COLORS.black }} />
          <Picker.Item label="12) Urban Engineering" value="UE" style={{ color: COLORS.black }} />
          <Picker.Item label="13) Polymer & Petrochemical Engineering" value="PP" style={{ color: COLORS.black }} />
          <Picker.Item label="14) Industrial Chemistry" value="IC" style={{ color: COLORS.black }} />
          <Picker.Item label="15) Textile Sciences" value="TS" style={{ color: COLORS.black }} />

        </Picker>
      </View>
      <FormInput
        labelValue={user.password}
        onChangeText={(userPassword) => setUser({ ...user, password: userPassword })}
        onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
        secureTextEntry={true}
        placeholderText="Password  "
        autoCapitalize="none"
        iconType="lock-closed-outline"
        autoCorrect={false}
      />
      {user.isValidPassword ? null :
        <Text style={styles.errorMsg}>Password is too small</Text>}
      <FormInput
        labelValue={user.cpassword}
        onChangeText={(txt) => setUser({ ...user, cpassword: txt })}
        placeholderText="Confirm Password   "
        secureTextEntry={true}
        autoCapitalize="none"
        iconType="shield-outline"
        autoCorrect={false}
      />

      <FormButton
        buttonTitle="Register"
        onPress={errors ? () => Alert.alert("NED Express", "Please provide valid credentials!") : () => registerHandle(user.name, user.email, user.password, user.cpassword, user.rollno, user.department, user.contactno)}
      />
      <View style={{alignItems: "flex-start"}}>
        <Text style={{ color: COLORS.darkgray, fontSize: 13.5, fontFamily: FONTS.body1.fontFamily, marginTop: 3 }}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => Alert.alert('Terms of Service', `1. You must create an account in order to use NED Express, use of any personal information you provide to us during the account creation process is governed by our Privacy Policy. You must keep your password confidential and you are solely responsible for maintaining the confidentiality and security of your account, all changes and updates submitted through your account, and all activities that occur in connection with your account.\n\n2. NED Express uses third party authentication(i.e Firebase Auth) to store your password, hereby NED Express has no access to the password you use to create an account. \n\n 3. You are also responsible for all activities that occur in your account. You agree to notify us immediately of any unauthorized use of your account in order to enable us to take necessary corrective action. You also agree that you will not allow any third party to use your NED Express account for any purpose and that you will be liable for such unauthorized access. \n\n4. You acknowledge and agree that if NED Express disables access to your account, you may be prevented from accessing the Services, your account details or any files or other content, which is contained in your account. \n\n5. You hereby represent and warrant that you are at least eighteen (18) years of age or above and are fully able and competent to understand and agree the terms, conditions, obligations, affirmations, representations, and warranties set forth in these Terms. \n\n6. You are in compliance with all laws and regulations of Pakistan when you access and use the NED Express. You agree to use the NED Express only in compliance with these Terms and applicable law, and in a manner that does not violate our legal rights or those of any third party(ies). \n\n7. Under no circumstances shall NED Express team be liable for any direct, indirect; special, incidental or consequential damages, including, but not limited to, loss of data or profit; arising out of the use, or the inability to use, the materials on this application, even if NED Express team or an authorized representative has been advised of the possibility of such damages.\n\n8. NED Express may vary or amend or change or update these Terms, from time to time entirely at its own discretion. NED Express will not be responsible for any outcome that may occur during the course of usage of our resources. We reserve the rights to change prices and revise the resources usage policy in any moment.\n\n 9. You acknowledge that the brand NED Express, it's name and it's logo is a private property owned by the creator of NED Express, hereby NED Express does not belong to the institution of "NED University".\n\nThank you for installing NED Express. For any questions or concerns regarding our policies, you may contact us using the following details:\nnedexpress.helpcenter@gmail.com\n+923012216771\n\nRegards,\nAbdullah Ansari\nCreator, NED Express\n`)}>
          <Text style={{textDecorationLine: "underline", color: COLORS.primary, fontSize: 13.5, fontFamily: FONTS.body1.fontFamily }}>
            Terms of service
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ color: COLORS.darkgray, ...FONTS.body3 }}>OR</Text>
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
    alignItems: "center",
    backgroundColor: "#fff",
    height: windowHeight / 15,
    width: SIZES.width * 0.9,
    borderColor: '#ccc',
    borderRadius: SIZES.radius,
    borderWidth: 1,
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    paddingTop: 72,
    backgroundColor: "#fff",

  },
  text: {
    marginTop:-60,
    fontSize: windowHeight/30,
    fontFamily: FONTS.h1.fontFamily,
    marginBottom: 10,
    color: COLORS.black,
  },
  iconStyle: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: "14%",
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    fontFamily: FONTS.body1.fontFamily
  },
});