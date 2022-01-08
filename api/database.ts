import { database } from "../firebase";

//returns a promise
export async function getTasks(frequency: string) {
  const dbRef = database.ref();

  return await dbRef
    .child("tasks/")
    .orderByChild("frequency")
    .equalTo(frequency)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
