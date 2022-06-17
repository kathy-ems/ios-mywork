import AsyncStorage from "@react-native-async-storage/async-storage"

export async function getDataStore(key: string) {

    try {
        return await AsyncStorage.getItem(key);
      } catch(e) {
            console.error(e);
      }

}

export async function storeData(key: string, value: string) {

    try {
        await AsyncStorage.setItem(key, value)
        } catch (e) {
            console.error(e);
        }
}
