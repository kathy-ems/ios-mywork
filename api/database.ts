import { database } from "../firebase";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from 'date-fns'
import  { userEmail, dateFormat } from "../global";

function trimEmail(email: string) {
  return email.substring(0, email.indexOf("@"));
}

export async function createTransaction(taskId: string) {
  const dbRef = database.ref();
  const userId = trimEmail(userEmail);
  const newId = dbRef.child('transactions/' + userId ).push().key;

  const transaction = {
    date: format(Date.now(), dateFormat),
    id: newId,
    taskId: taskId,
    userEmail: userEmail
  };

  var update: any = {};
  update['/transactions/' + userId + "/" + newId] = transaction;
  
  return taskId && userEmail && await dbRef.update(update).catch((error) => {
    console.error(error);
  });

}

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
        console.log("No frequency data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}


//returns a promise
export async function getTransactions(frequency: string) {
  const dbRef = database.ref();
  const userId = trimEmail(userEmail);
  let startAt, endAt;

  switch(frequency){
    case "weekly":
      startAt = format(startOfWeek(Date.now(), { weekStartsOn:  0}), dateFormat);
      endAt = format(endOfWeek(Date.now(), { weekStartsOn: 0 }), dateFormat);
    break;
    case "monthly":
      startAt = format(startOfMonth(Date.now()), dateFormat);
      endAt = format(endOfMonth(Date.now()), dateFormat);
    break;
    default: //daily
      startAt = format(Date.now(), dateFormat);
      endAt = format(Date.now(), dateFormat);
  }

  return await dbRef
    .child("transactions/" + userId + "/")
    .orderByChild("date")
    .startAt(startAt)
    .endAt(endAt)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No user data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
