import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import { icons, COLORS, SIZES, FONTS } from '../constants'
const FormButton = ({ buttonTitle, ...rest}) => {
    return (
        <TouchableOpacity
            style={{
                width: SIZES.width * 0.9,
                height: windowHeight / 15,
                padding: SIZES.padding,
                marginBottom:windowHeight/100,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                borderRadius: SIZES.radius
            }}
            {...rest}
        >
            <Text style={{ color: COLORS.white,fontSize: windowHeight/40 , fontFamily: FONTS.h2.fontFamily, fontWeight: "bold" }}>{buttonTitle}</Text>
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
