import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { TitleText } from "./Title.Text";

import { fontMd, Colors } from "../Theme";

type DesignSelectorProps = {
  onSelectDesign: (design: string) => void;
  selectedDesign: string;
};

export const DesignSelector = (props: DesignSelectorProps) => {
  return (
    <View style={styles.design}>
      <View style={styles.designOptions}>
        {props.selectedDesign === "hands" ? null : (
          <TouchableOpacity
            style={styles.option}
            onPress={() => props.onSelectDesign("faces")}
          >
            <Image
              source={require("../assets/good.png")}
              style={[
                styles.designImg,
                props.selectedDesign === "faces" && { opacity: 1 },
              ]}
            />
          </TouchableOpacity>
        )}
        {props.selectedDesign === "faces" ? null : (
          <TouchableOpacity
            style={styles.option}
            onPress={() => props.onSelectDesign("hands")}
          >
            <Image
              source={require("../assets/like.png")}
              style={[
                styles.designImg,
                props.selectedDesign === "hands" && { opacity: 1 },
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
      <TitleText
        style={{
          fontWeight: "normal",
          fontSize: fontMd,
        }}
      >
        Selecciona un diseño
      </TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  designImg: {
    height: 80,
    width: 80,
    opacity: 0.5,
  },
  design: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  option: {
    backgroundColor: Colors.light.secondaryColor,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
  },
  designOptions: {
    flexDirection: "row",
  },
});
