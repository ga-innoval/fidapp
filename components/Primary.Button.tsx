import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, fontMd } from "../Theme";

type ButtonProps = {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
};

const colorSet = Colors.light;

export const PrimaryButton = (props: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorSet.darkColor,
    marginTop: 10,
  },
  text: { color: "white", fontSize: fontMd },
});
