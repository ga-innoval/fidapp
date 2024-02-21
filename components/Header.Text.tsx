import { StyleSheet, Text } from "react-native";
import React from "react";

import { Colors, fontXl, fontXxl } from "../Theme";

export type TextProps = Text["props"];

export const HeaderText = (props: TextProps) => {
  return (
    <Text style={[styles.headerText, styles.margins, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: fontXxl,
    fontWeight: "bold",
    color: Colors.light.primaryColor,
    textAlign: "center",
  },
  margins: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
});
