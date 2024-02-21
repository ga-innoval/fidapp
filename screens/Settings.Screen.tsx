import React from "react";

import { StyleSheet, View, LayoutAnimation } from "react-native";
import { TitleText } from "../components/Title.Text";

import { PrimaryButton } from "../components/Primary.Button";

import { Colors, fontMd } from "../Theme";
import { DesignSelector } from "../components/Design.Selector";
import CustomPicker from "../components/Custom.Picker";

export const SettingScreen = ({ navigation, route }: any) => {
  const [category, setCategory] = React.useState("");
  const [campo, setCampo] = React.useState("");
  const [offlineMode, setOfflineMode] = React.useState<boolean>(true);
  const [selectedDesign, setSelectedDesign] = React.useState<string>("");

  const { category_list, campo_list } = route.params;

  const onSelectDesign = (design: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedDesign(design);
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TitleText>Configuración de encuesta de satisfacción</TitleText>

      <View style={styles.pickerContainer}>
        {/* Select category */}
        <CustomPicker
          onValueChange={(itemValue) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setCategory(itemValue);
          }}
          selectedValue={category}
          data={category_list}
          label="Selecciona una categoría"
        />

        {/* Select campo */}

        {category !== "" && (
          <CustomPicker
            onValueChange={(itemValue) => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
              setCampo(itemValue);
            }}
            selectedValue={campo}
            data={campo_list}
            label="Selecciona un campo"
          />
        )}
      </View>

      {/* Select design */}
      {campo !== "" && category !== "" && category !== "RENUNCIA" && (
        <DesignSelector
          onSelectDesign={onSelectDesign}
          selectedDesign={selectedDesign}
        />
      )}

      {/* create */}

      {category === "RENUNCIA" && campo !== "" && (
        <PrimaryButton
          label="Ir a encuesta"
          onPress={() => {
            navigation.navigate("JobQuit", {
              category: category,
              campo: campo,
              offlineMode: offlineMode,
            });
          }}
        />
      )}

      {category !== "" &&
        category !== "RENUNCIA" &&
        campo !== "" &&
        selectedDesign !== "" && (
          <PrimaryButton
            label="Ir a encuesta"
            onPress={() => {
              navigation.navigate("Survey", {
                category: category,
                campo: campo,
                offlineMode: offlineMode,
                design: selectedDesign,
              });
            }}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  pickerContainer: {
    width: "100%",
    marginVertical: 15,
  },
  icon: {
    height: 220,
    resizeMode: "contain",
  },
  connectionPicker: {
    flexDirection: "row",
    padding: 15,
    marginVertical: 30,
  },
  text: { fontSize: fontMd, color: Colors.light.text },
  connection: {
    backgroundColor: Colors.light.secondaryColor,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});
