import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { icons, COLORS, SIZES, FONTS } from '../constants'

import Ionicons from 'react-native-vector-icons/Ionicons';

const SocialButton = ({
  buttonTitle,
  btnType,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={{
        width: SIZES.width * 0.9,
        height: windowHeight / 15,
        padding: SIZES.padding,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        backgroundColor: "#f5e7ea"
      }}
      {...rest}
    >
      <View style={styles.iconStyle}>
        <Ionicons name="logo-google" size={23} color="#de4d41" />
      </View>
      <Text style={styles.buttonText }>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    padding: 10,
    flexDirection: 'row',
    borderRadius: SIZES.radius,
  },
  iconStyle: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    width: '14%',
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FONTS.body1.fontFamily,
    fontSize: windowHeight/45,
    fontWeight: 'bold',
    color: "#de4d41"
  },
});