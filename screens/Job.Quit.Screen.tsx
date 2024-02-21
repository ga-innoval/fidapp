import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { HeaderText } from "../components/Header.Text";

import { Colors, Spacing } from "../Theme";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import { getSurvey, storeSurvey } from "../utils/Storage";
import { PrimaryButton } from "../components/Primary.Button";
import { JOB_QUIT_REASONS } from "../constants/Job.Quit.Reasons";

const reasons = [
  { key: JOB_QUIT_REASONS.pagos, text: JOB_QUIT_REASONS.pagos },
  { key: JOB_QUIT_REASONS.comedor, text: JOB_QUIT_REASONS.comedor },
  { key: JOB_QUIT_REASONS.tienda, text: JOB_QUIT_REASONS.tienda },
  { key: JOB_QUIT_REASONS.social, text: JOB_QUIT_REASONS.social },
  { key: JOB_QUIT_REASONS.medicos, text: JOB_QUIT_REASONS.medicos },
  { key: JOB_QUIT_REASONS.tratoPersonal, text: JOB_QUIT_REASONS.tratoPersonal },
  { key: JOB_QUIT_REASONS.dentista, text: JOB_QUIT_REASONS.dentista },
  { key: JOB_QUIT_REASONS.others, text: JOB_QUIT_REASONS.others },
];

export function JobQuitScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [employeeId, setEmployeeId] = useState("");
  const [otherReasons, setOtherReasons] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { category, campo, offlineMode } = route.params;

  const reset = () => {
    setEmployeeId("");
    setSelectedItems([]);
  };

  const handleItemPress = (item: string) => {
    const itemIndex = selectedItems.indexOf(item);
    if (itemIndex === -1) {
      setSelectedItems([...selectedItems, item]);
      return;
    }
    setSelectedItems((prev) => {
      prev.splice(itemIndex, 1);
      return [...prev];
    });
  };

  const sendSurveyOffline = async () => {
    setIsSending(true);
    try {
      const newSurveys = selectedItems.map((item) => ({
        actividad: category,
        campo: campo,
        calificacion: item,
        id_empleado: "E99",
        fecha: new Date(), //convertUTCDateToLocalDate(new Date()),
        comentario: item === JOB_QUIT_REASONS.others ? otherReasons : "",
        not_user_empleado: employeeId,
      }));
      const surveyList = await getSurvey();

      storeSurvey([...surveyList, ...newSurveys]);
      setIsSending(false);
      reset();
      ToastAndroid.show(
        "¡La encuesta ha sido guardada con éxito!",
        ToastAndroid.SHORT
      );
    } catch (error) {
      ToastAndroid.show("No se pudo guardar la encuesta", ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable
        delayLongPress={2000}
        onPress={() => console.log("press")}
        onLongPress={() => {
          navigation.goBack();
        }}
      >
        <HeaderText style={{ color: Colors.light.darkColor }}>
          ¿Por qué motivo renuncias?
        </HeaderText>
      </Pressable>

      {/* <Text style={styles.subtitle}>Por motivos de:</Text> */}
      <View style={styles.itemsContainer}>
        {reasons.map((item, index) => {
          const isSelected = selectedItems.includes(item.key);
          return (
            <Pressable
              key={index}
              onPress={() => handleItemPress(item.key)}
              style={[
                styles.item,
                isSelected
                  ? { backgroundColor: Colors.light.text }
                  : { borderWidth: 3, borderColor: Colors.light.text },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  { color: isSelected ? "#ffff" : Colors.light.text },
                ]}
              >
                {item.text}
              </Text>
              {isSelected && <Icons name="check" color={"#ffff"} size={20} />}
            </Pressable>
          );
        })}
      </View>
      {selectedItems.includes(JOB_QUIT_REASONS.others) && (
        <TextInput
          onChangeText={(text) => setOtherReasons(text)}
          value={otherReasons}
          style={styles.textInput}
          placeholder="Ingresa otro motivo"
        />
      )}

      <TextInput
        onChangeText={(text) => setEmployeeId(text)}
        value={employeeId}
        style={styles.textInput}
        placeholder="Número de nómina"
      />

      {employeeId.length > 3 && selectedItems.length > 0 && !isSending && (
        <PrimaryButton label="Enviar encuesta" onPress={sendSurveyOffline} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: "#CBCBCB",
    fontWeight: "normal",
    fontSize: 28,
    marginBottom: Spacing.lg,
  },
  text: {
    fontSize: 18,
    marginHorizontal: Spacing.lg * 2,
  },
  container: {
    flexGrow: 1,
    padding: Spacing.md,
    alignItems: "center",
    paddingHorizontal: Spacing.lg * 2,
  },
  itemsContainer: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  item: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: 100,
    flexDirection: "row",
    margin: Spacing.md,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    borderBottomWidth: 3,
    fontSize: 18,
    paddingBottom: Spacing.lg,
    width: "100%",
    marginVertical: Spacing.lg,
    borderColor: "#CBCBCB",
  },
});
