import React from "react";

import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Colors } from "../Theme";
import { SurveyOpinionType } from "../Types";
import { TitleText } from "./Title.Text";

type OpinionSelectorProps = {
  handleSelect: (opinion: SurveyOpinionType) => void;
  selectedOpinion: string;
  data: SurveyOpinionType[];
};

export const OpinionSelector = (props: OpinionSelectorProps) => {
  return (
    <View style={styles.opinionsContainer}>
      {props.data.map((opinion: SurveyOpinionType) => (
        <View style={{ alignItems: "center" }} key={Math.random()}>
          <View key={Math.random()} style={styles.opinionBg}>
            <TouchableOpacity
              onPress={() => {
                props.handleSelect(opinion);
              }}
              style={styles.opinionBg}
            >
              <View
                style={[
                  opinion.value !== props.selectedOpinion && { opacity: 0.4 },
                ]}
              >
                <Image source={opinion.icon} style={styles.opinionImg} />
              </View>
            </TouchableOpacity>
          </View>
          <TitleText
            style={[
              opinion.value !== props.selectedOpinion && { opacity: 0.4 },
            ]}
          >
            {opinion.value}
          </TitleText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  opinionImg: {
    height: 180,
    width: 180,
  },

  opinionBg: {
    borderRadius: 300,
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: Colors.light.secondaryColor,
  },
  opinionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
