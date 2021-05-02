import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import { icons, COLORS, SIZES, FONTS } from '../constants'
const FormButton = ({ buttonTitle, ...rest}) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
};

export default FormButton;

const styles = StyleSheet.create({
    buttonContainer: {
      fontFamily: FONTS.body1.fontFamily,
      width: SIZES.width * 0.9,
      padding: SIZES.padding,
      backgroundColor: COLORS.primary,
      alignItems: 'center',
      borderRadius: SIZES.radius,
      marginTop: 10,
      width: '100%',
      height: windowHeight / 15,
      justifyContent: 'center',
    },
  });
