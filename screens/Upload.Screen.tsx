import React, { useEffect } from "react";

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  LayoutAnimation,
} from "react-native";

import { TitleText } from "../components/Title.Text";

import { Colors, fontMd } from "../Theme";
import {
  getSurvey,
  clearAll,
  getRequestKey,
  removeRequestKey,
} from "../utils/Storage";
import { backend } from "../Backend";
import { surveyList } from "../Types";
import axios, { AxiosError } from "axios";

const icons = [
  require("../assets/files.png"),
  require("../assets/upload_files.png"),
  require("../assets/error.png"),
  require("../assets/success.png"),
];

export const UploadScreen = ({ navigation }: any) => {
  const [icon, setIcon] = React.useState(icons[0]);
  const [survey, setSurvey] = React.useState<surveyList>([]);
  const [message, setMessage] = React.useState("Leyendo datos...");
  const [buttonShown, setButtonShown] = React.useState(false);

  const fetchSurveys = async () => {
    const surveys = await getSurvey();

    setSurvey([...surveys]);
    setMessage(
      surveys.length === 1
        ? "Hay 1 opinión registrada."
        : "Hay " + surveys.length + " opiniones registradas."
    );

    if (surveys.length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setButtonShown(true);
    }
  };

  const uploadData = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setButtonShown(false);
    setIcon(icons[1]);
    setMessage("Subiendo datos...");

    let requestKey: any = await getRequestKey();

    try {
      const res = await backend.put(
        "satisfaccion_usuario/satisfaccion_atomic/",
        survey,
        {
          headers: {
            "Request-type": "surveysync",
            "Request-key": requestKey,
          },
        }
      );
      clearAll();
      removeRequestKey();
      setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setIcon(icons[3]);
        setMessage("Datos enviados correctamente.");
        setTimeout(() => {
          navigation.goBack();
        }, 1200);
      }, 500);
    } catch (error: any | AxiosError) {
      let errorCode = axios.isAxiosError(error)
        ? error?.response?.status
        : "unknown";
      removeRequestKey();
      setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setButtonShown(true);
        setIcon(icons[2]);
        setMessage(`Error al subir datos (Código: ${errorCode})`);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={icon} />

      <TitleText>{message}</TitleText>

      <View style={styles.menu}>
        {buttonShown && (
          <TouchableOpacity onPress={uploadData} style={styles.btn}>
            <Text style={styles.text}>Subir datos</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    height: 220,
    resizeMode: "contain",
  },
  menu: {
    flexDirection: "row",
  },
  text: { fontSize: fontMd, color: Colors.light.text },
  btn: {
    backgroundColor: Colors.light.secondaryColor,
    paddingVertical: 20,
    paddingHorizontal: 30,
    margin: 10,
    borderRadius: 10,
  },
});
