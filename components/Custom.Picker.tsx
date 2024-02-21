import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Colors, fontMd } from "../Theme";

type CustomPickerProps = {
  onValueChange: (value: string) => void;
  selectedValue: string;
  data: string[];
  label: string;
};

const CustomPicker = (props: CustomPickerProps) => {
  return (
    <View style={styles.picker}>
      <Picker
        itemStyle={styles.pickerItem}
        selectedValue={props.selectedValue}
        onValueChange={(itemValue) => {
          props.onValueChange(itemValue);
        }}
      >
        <Picker.Item label={props.label} value="" />
        {props.data.map((item: string) => (
          <Picker.Item label={item} value={item} key={Math.random()} />
        ))}
      </Picker>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  picker: {
    backgroundColor: Colors.light.secondaryColor,
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
  },
  pickerItem: { fontSize: fontMd },
});
