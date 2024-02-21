import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SurveyScreen } from "./screens/Survey.Screen";
import { SettingScreen } from "./screens/Settings.Screen";
import { MenuScreen } from "./screens/Menu.Screen";
import { UploadScreen } from "./screens/Upload.Screen";

import { Platform, UIManager } from "react-native";
import { backend } from "./Backend";
import {
  getSurvey,
  clearAll,
  getRequestKey,
  removeRequestKey,
} from "./utils/Storage";
import { JobQuitScreen } from "./screens/Job.Quit.Screen";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Stack = createNativeStackNavigator();

export default function App() {
  React.useEffect(() => {
    setInterval(async () => {
      const requestKey: any = await getRequestKey();
      const surveys = await getSurvey();

      await backend
        .put("satisfaccion_usuario/satisfaccion_atomic/", surveys, {
          headers: {
            "Request-type": "surveysync",
            "Request-key": requestKey,
          },
        })
        .then(() => {
          console.log("Data uploaded from auto sync");
          clearAll();
          removeRequestKey();
        })
        .catch((error) => {
          console.log(error);
        });
    }, 60000 * 15);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerShadowVisible: false,
            headerTitle: "",
            orientation: "all",
          }}
        >
          <Stack.Screen name="Inicio" component={MenuScreen} />
          <Stack.Screen name="JobQuit" component={JobQuitScreen} />
          <Stack.Screen
            name="Settings"
            component={SettingScreen}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Survey"
            component={SurveyScreen}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Upload"
            component={UploadScreen}
            options={{
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
