import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Picker,
  Alert
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';
import { icons, COLORS, SIZES, FONTS } from '../constants';
import DropDownPicker from 'react-native-dropdown-picker';
import {windowHeight, windowWidth} from '../utils/Dimensions';
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
  const [errors, setErrors] = useState(false);
  const handleValidName = (val) => {
    if( val.trim().length >= 4 ) {
        setUser({
            ...user,
            isValidName: true
        });
        setErrors(true)
    } else {
        setUser({
            ...user,
            isValidName: false
        });
        setErrors(false)
    }
}
const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const handleValidEmail = (val) => {
  if( re.test(val) === true) {
      setUser({
          ...user,
          isValidEmail: true
      });
      setErrors(true)
  } else {
      setUser({
          ...user,
          isValidEmail: false
      });
      setErrors(false)
  }
}
const handleValidContactNo = (val) => {
  if( val.trim().startsWith("03") && val.trim().length == 11) {
      setUser({
          ...user,
          isValidContactNo: true
      });
      setErrors(true)
  } else {
      setUser({
          ...user,
          isValidContactNo: false
      });
      setErrors(false)
  }
}
const handleValidRollNo = (val) => {
  if( val.trim().startsWith("1") && val.trim().length == 5) {
      setUser({
          ...user,
          isValidRollNo: true
      });
      setErrors(true)
  } else {
      setUser({
          ...user,
          isValidRollNo: false
      });
      setErrors(false)
  }
}
const handleValidPassword = (val) => {
  if( val.trim().length >= 6 ) {
      setUser({
          ...user,
          isValidPassword: true
      });
      setErrors(false)
  } else {
      setUser({
          ...user,
          isValidPassword: false
      });
      setErrors(false)
  }
}

  const { register } = useContext(AuthContext);

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
        selectedValue={"Department"}
        style={{ height: 30, width: 320,color: COLORS.darkgray,   }}
        onValueChange={(itemValue, itemIndex) => setUser({ ...user, department: itemValue })}
        
      >
        <Picker.Item label="Department" value="" />
        <Picker.Item label="Computer Systems Engineering" value="CIS" />
        <Picker.Item label="Electrical Engineering" value="EE" />
        <Picker.Item label="Mechanical Engineering" value="ME" />
        <Picker.Item label="Civil Engineering" value="CE" />
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
        onPress={errors ? () => Alert.alert("Invalid Credentials") : () => register(user.name, user.email, user.password, user.rollno, user.department, user.contactno) }
      />
      <View style={styles.textPrivate}>
        <Text style={{ color: COLORS.darkgray, fontSize: 13.5, fontFamily: FONTS.body1.fontFamily, marginTop: 14 }}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={{ color: COLORS.orange, fontSize: 13.5, fontFamily: FONTS.body1.fontFamily }}>
            Terms of service
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 50
  },
  text: {
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
},
});