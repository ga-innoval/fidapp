import React, { useState } from "react";

import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  LayoutAnimation,
} from "react-native";

import { TitleText } from "../components/Title.Text";
import { HeaderText } from "../components/Header.Text";
import { OpinionSelector } from "../components/Opinion.Selector";

import { fontMd } from "../Theme";
import { backend } from "../Backend";
import { storeSurvey, getSurvey } from "../utils/Storage";
import { SurveyOpinionType } from "../Types";

const faces = [
  { icon: require("../assets/good.png"), value: "Buena" },
  { icon: require("../assets/regular.png"), value: "Regular" },
  { icon: require("../assets/bad.png"), value: "Mala" },
];

const hands = [
  { icon: require("../assets/like.png"), value: "Buena" },
  { icon: require("../assets/dislike.png"), value: "Mala" },
];

const messages = [
  { topic: "Menu", text: "¿Cómo estuvo la comida de hoy?" },
  {
    topic: "Generic",
    text: "¿Cómo fue tu experiencia de hoy?",
  },
];

export const SurveyScreen = ({ navigation, route }: any) => {
  const { category, campo, offlineMode, design } = route.params;
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [surveySent, setSurveySent] = useState<boolean>(false);

  const sendSurveyOnline = (emoji: string) => {
    const data = {
      actividad: category,
      campo: campo,
      calificacion: emoji,
      id_empleado: "E99",
      not_user_empleado: null,
      comentario: null,
    };
    backend.put("/satisfaccion_usuario/satisfaccion/", data).catch(() => {});
    animateSelection(emoji);
  };

  const sendSurveyOffline = async (emoji: string) => {
    const survey = {
      actividad: category,
      campo: campo,
      calificacion: emoji,
      id_empleado: "E99",
      fecha: new Date(), //convertUTCDateToLocalDate(new Date()),
      not_user_empleado: null,
      comentario: null,
    };

    const surveyList = await getSurvey();
    surveyList.push(survey);
    storeSurvey(surveyList);

    animateSelection(emoji);
  };

  const animateSelection = (emoji: string) => {
    setSelectedEmoji(emoji);
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setSurveySent(true);
    }, 500);

    if (category === "COMEDOR") {
      setTimeout(() => {
        setSelectedEmoji("");
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setSurveySent(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setSelectedEmoji("");
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setSurveySent(false);
      }, 60000 * 1);
    }
  };

  return (
    <TouchableWithoutFeedback
      delayLongPress={2000}
      onLongPress={() => {
        navigation.goBack();
      }}
      onPress={() => {
        setSelectedEmoji("");
      }}
    >
      <View style={styles.container}>
        <View style={styles.title}>
          <HeaderText>
            {category === "COMEDOR" ? messages[0].text : messages[1].text}
          </HeaderText>
          <TitleText style={{ fontWeight: "400", textAlign: "center" }}>
            Recuerda que tu opinión es totalmente anónima
          </TitleText>
        </View>

        {surveySent ? (
          <View style={styles.done}>
            <Image
              source={require("../assets/done.png")}
              style={styles.doneImg}
            />
          </View>
        ) : design === "hands" ? (
          <OpinionSelector
            data={hands}
            handleSelect={(opinion: SurveyOpinionType) => {
              if (offlineMode) {
                sendSurveyOffline(opinion.value);
              } else {
                sendSurveyOnline(opinion.value);
              }
            }}
            selectedOpinion={selectedEmoji}
          />
        ) : (
          <OpinionSelector
            data={faces}
            handleSelect={(opinion: SurveyOpinionType) => {
              if (offlineMode) {
                sendSurveyOffline(opinion.value);
              } else {
                sendSurveyOnline(opinion.value);
              }
            }}
            selectedOpinion={selectedEmoji}
          />
        )}

        <TitleText
          style={{
            fontWeight: "normal",
            textAlign: "center",
            fontSize: fontMd,
          }}
        >
          *Presiona un icono para enviar tu opinión*
        </TitleText>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  title: {
    alignItems: "center",
  },
  done: { justifyContent: "center", alignItems: "center" },
  doneImg: {
    height: 180,
    width: 180,
  },
});
