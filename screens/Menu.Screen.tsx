import React from "react";

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";

import { TitleText } from "../components/Title.Text";

import { Colors, fontMd } from "../Theme";
import { backend } from "../Backend";
import {
  getMenuCategories,
  storeMenuCampos,
  storeMenuCategories,
  getMenuCampos,
  removeMenuCampos,
} from "../utils/Storage";

import NetInfo from "@react-native-community/netinfo";

export const MenuScreen = ({ navigation }: any) => {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [lista_campos, setListaCampos] = React.useState<string[]>([]);
  const [isConnected, setIsConnected] = React.useState<boolean | null>(false);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);

  const fetchDataOnline = async () => {
    backend
      .get("satisfaccion_usuario/lista_categorias/")
      .then((res) => {
        setCategories([...res.data]);
        storeMenuCategories([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    backend
      .get("campos/api/lista_campos/")
      .then((res) => {
        setListaCampos([...res.data]);
        storeMenuCampos([...res.data]);
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDataOffline = async () => {
    console.log("Fetching data offline");

    const categories = await getMenuCategories();
    setCategories(categories);
    const campos = await getMenuCampos();
    setListaCampos(campos);
    setIsFetching(false);
  };

  React.useEffect(() => {
    removeMenuCampos();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        fetchDataOnline();
      } else {
        fetchDataOffline();
      }
    });

    return unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={require("../assets/human.png")} />
      <TitleText>Encuestas de satisfacción</TitleText>
      {isFetching ? (
        <ActivityIndicator size="large" color={Colors.light.darkColor} />
      ) : (
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Settings", {
                campo_list: lista_campos,
                category_list: categories,
              });
            }}
            style={styles.btn}
          >
            <Text style={styles.text}>Crear encuesta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Upload");
            }}
            style={styles.btn}
          >
            <Text style={styles.text}>Sincronizar datos</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text>
        Versión 1.2.0
        {isConnected ? " (Modo con conexión) " : " (Modo sin conexión) "} © GA
        Innoval
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  icon: {
    height: 310,
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
    marginHorizontal: 10,
    borderRadius: 10,
  },
});
