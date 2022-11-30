import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "./Btn";
import InputItem from "./InputItem";
const Create = ({ navigation }) => {
  const [inputs, setInputs] = useState({});
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  console.log(inputs);
  console.log("and name is : " + inputs.name);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textCreate}>Create</Text>
        <View style={{ marginVertical: 20 }}>
          {/* all design value goes to InputItem through props and apply inside input field */}
          <InputItem
            label="Date"
            placeholder="2022-10-27"
            onChangeText={(text) => handleOnChange(text, "date")}
          /> 
          <InputItem
            label="Invoice No"
            placeholder="6"
            keyboardType="numeric"
            onChangeText={(text) => handleOnChange(text, "invoice_no")}
          />
          <InputItem
            label="Name"
            placeholder="Arafat hossain"
            onChangeText={(text) => handleOnChange(text, "name")}
          />
          <InputItem
            label="Address"
            placeholder="Gulshan-1, Dhaka"
            onChangeText={(text) => handleOnChange(text, "address")}
          />
          <InputItem
            label="Email"
            placeholder="abc@gmail.com"
            onChangeText={(text) => handleOnChange(text, "email")}
          />
          <InputItem
            label="Mobile"
            keyboardType="numeric"
            placeholder="0177776666555"
            onChangeText={(text) => handleOnChange(text, "mobile")}
          />
          <InputItem
            label="QTY"
            placeholder="3"
            keyboardType="numeric"
            onChangeText={(text) => handleOnChange(text, "qty")}
          />
          <InputItem
            label="Product"
            placeholder="Head Phone"
            onChangeText={(text) => handleOnChange(text, "product")}
          />
          <InputItem
            label="Product Price"
            placeholder="1020"
            keyboardType="numeric"
            onChangeText={(text) => handleOnChange(text, "product_price")}
          />
          <InputItem
            label="Advance"
            placeholder="500"
            keyboardType="numeric"
            onChangeText={(text) => handleOnChange(text, "advance")}
          />
          <InputItem
            label="Order Update"
            placeholder="Delivered"
            onChangeText={(text) => handleOnChange(text, "order_update")}
          />
          <InputItem
            label="Delivery Charge"
            placeholder="75"
            keyboardType="numeric"
            onChangeText={(text) => handleOnChange(text, "delivery_charge")}
          />
          <InputItem
            label="Delivery Company"
            placeholder="RedX"
            onChangeText={(text) => handleOnChange(text, "delivery_company")}
          />
          <InputItem
            label="Remarks"
            placeholder="Nothing"
            onChangeText={(text) => handleOnChange(text, "remark")}
          />
          <InputItem
            label="1st Followup"
            placeholder="Processing"
            onChangeText={(text) => handleOnChange(text, "first_followup")}
          />
          <InputItem
            label="2nd Followup"
            placeholder="N/A"
            onChangeText={(text) => handleOnChange(text, "second_followup")}
          />
          <InputItem
            label="3rd Followup"
            placeholder="N/A"
            onChangeText={(text) => handleOnChange(text, "third_followup")}
          />
          <InputItem
            label="bKash Cost"
            placeholder="20"
            keyboardType="numeric"
            onChangeText={(text) => handleOnChange(text, "bkash_cost")}
          />
          <InputItem
            label="Others (VAT, TAX, etc.)"
            placeholder="10"
            keyboardType="numeric"
            onChangeText={(text) => handleOnChange(text, "other")}
          />
          <InputItem
            label="Deposit to Accounts"
            placeholder="800"
            keyboardType="numeric"
            onChangeText={(text) => handleOnChange(text, "deposit_to_account")}
          />
          <Btn title="Create" onPress={() => navigation.navigate("Show")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  scrollView: {
    // paddingTop: 50,
    paddingHorizontal: 20,
  },
  textCreate: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Create;
