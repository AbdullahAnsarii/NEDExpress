import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import { icons, COLORS, SIZES, FONTS } from '../constants'


import Ionicons from 'react-native-vector-icons/Ionicons';

const FormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <Ionicons name={iconType} size={25} color="#666" />
      </View>
      <TextInput
        value={labelValue}
        style={{ color: COLORS.black, fontSize: 15, fontFamily: FONTS.body1.fontFamily }}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor={COLORS.darkgray}
        {...rest}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: SIZES.width * 0.9,
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: SIZES.radius,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  iconStyle: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: '14%',
  },
});