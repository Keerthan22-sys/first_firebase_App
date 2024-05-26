import { equalTo, getDatabase, onValue, orderByChild, orderByPriority, push, ref, remove, set } from "firebase/database";
import { firebaseApp } from "../services/firebase";
import { limitToLast, query } from "firebase/firestore";

// initialise database
const db = getDatabase(firebaseApp);

// reference to database path
const tasksRef = ref(db, "tasks");

const filteredTasksRef= query(
    tasksRef,
    orderByChild("difficulty"),
    equalTo("easy"),
    limitToLast(4)
);

// basic write operation
export const addNewTask = (task, difficulty, setInput) => {

  // TODO: Modify code below to make use of the `set` function
    set(tasksRef, {
        task,
        difficulty,
    })

//   push(tasksRef, {
//     task,
//     difficulty,
//   })
    .then(() => {
      setInput({ task: "", difficulty: "easy" });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// read operation with observer
export const getData = () => {
  onValue(filteredTasksRef, (snapshot) => {
    const data = snapshot.val();
    console.log("Query snapshot: ", data);
  });
};

export const deleteRef = () => {
  remove(tasksRef).then(() => {
    console.log("location removed");
  });
}
