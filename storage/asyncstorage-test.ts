import AsyncStorage from "@react-native-community/async-storage";

let STORAGE_KEY: string = "testXP";

export const updateXP = async (delta: number) => {
  try {
    await fetchXP().then((value) =>
      AsyncStorage.setItem(STORAGE_KEY, (value + delta).toString())
    );
  } catch (error) {
    // Error saving data
  }
};

export const fetchXP = async () => {
  try {
    let value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      console.log(value);
      return parseInt(value);
    }
  } catch (error) {
    console.log("error!");
  }
  return 0;
};
