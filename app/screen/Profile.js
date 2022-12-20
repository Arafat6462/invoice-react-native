import { Text, StyleSheet, SafeAreaView } from "react-native";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>version 1.0.1</Text>
    </SafeAreaView>
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
    color: "gray",
  },
});

export default Profile;
