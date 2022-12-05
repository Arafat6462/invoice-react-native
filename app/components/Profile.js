import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./config";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  function create() {
    // console.log(userName + " : " + email);

    // Add a new document in collection "cities"
    setDoc(doc(db, "users ", "1"), {
      email: email,
      username: userName,
    })
      .then(() => {
        //Data save Successfully
        console.log("data submitted");
      })
      .catch((error) => {
        //Failed
        console.log(error);
      });
  }

  function newCollection() {
    // console.log(userName + " : " + email);

    // Add a new document in collection "cities"
    addDoc(collection(db, "users "), {
      email: email,
      username: userName,
    })
      .then(() => {
        //Data save Successfully
        console.log("data submitted");
      })
      .catch((error) => {
        //Failed
        console.log(error);
      });
  }

  function update() {
    // console.log(userName + " : " + email);

    // Add a new document in collection "cities"
    updateDoc(doc(db, "users ", "1"), {
      email: email,
      username: userName,
    })
      .then(() => {
        //Data save Successfully
        console.log("data submitted");
      })
      .catch((error) => {
        //Failed
        console.log(error);
      });
  }

  function deleteData() {
    console.log("delete");
    deleteDoc(doc(db, "users ", "1"));
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <TextInput
        style={styles.textBoxes}
        value={userName}
        onChangeText={(username) => {
          setUserName(username);
        }}
        placeholder="Username"
      ></TextInput>
      <TextInput
        style={styles.textBoxes}
        value={email}
        onChangeText={(email) => {
          setEmail(email);
        }}
        placeholder="Email"
      ></TextInput>

      <Button style={styles.btn} title="Submit" onPress={create} />
      <Button
        style={styles.btn}
        title="new collection"
        onPress={newCollection}
      />
      <Button style={styles.btn} title="Update" onPress={update} />
      <Button style={styles.btn} title="delete" onPress={deleteData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  textBoxes: {
    width: "90%",
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
    padding: 12,
  },
  btn: {
    color: "gray",
  },
});

export default Profile;
