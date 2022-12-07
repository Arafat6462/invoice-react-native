import { Text, StyleSheet, SafeAreaView } from "react-native";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Profile</Text>
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
});

export default Profile;
