import { StyleSheet, Text } from "react-native";
import React from "react";

import { Colors, fontXl } from "../Theme";

export type TextProps = Text["props"];

export const TitleText = (props: TextProps) => {
  return (
    <Text style={[styles.titleText, styles.margins, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: fontXl,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  margins: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
});
