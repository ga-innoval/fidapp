import AsyncStorage from "@react-native-async-storage/async-storage";
import { surveyList } from "../Types";

const key = "@survey";

export const storeSurvey = async (value: surveyList) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch {}
};

export const getSurvey = async () => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return [];
  } catch {}
};

export const clearAll = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
};

const requestKey = "@request-key";

const setRequestKey = async (value: string) => {
  try {
    await AsyncStorage.setItem(requestKey, value);
  } catch {}
};

export const getRequestKey = async () => {
  try {
    const value = await AsyncStorage.getItem(requestKey);
    if (value) {
      return value;
    }
    const newKey = getUniqueCode(16);
    setRequestKey(newKey);
    return newKey;
  } catch {}
};

export const removeRequestKey = async () => {
  try {
    await AsyncStorage.removeItem(requestKey);
  } catch {}
};

const getUniqueCode = (length: number) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const menuCategoriesKey = "@menu-categories";

export const storeMenuCategories = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(menuCategoriesKey, jsonValue);
  } catch {}
};

export const getMenuCategories = async () => {
  try {
    const value = await AsyncStorage.getItem(menuCategoriesKey);
    if (value) {
      return JSON.parse(value);
    }
    return [];
  } catch {}
};

const menuCamposKey = "@menu-campos";

export const storeMenuCampos = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(menuCamposKey, jsonValue);
  } catch {}
};

export const getMenuCampos = async () => {
  try {
    const value = await AsyncStorage.getItem(menuCamposKey);
    if (value) {
      return JSON.parse(value);
    }
    return [];
  } catch {}
};

export const removeMenuCampos = async () => {
  try {
    await AsyncStorage.removeItem(menuCamposKey);
  } catch {}
};
