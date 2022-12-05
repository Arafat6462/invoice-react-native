import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "./Btn";
import InputItem from "./InputItem";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./config";

const Create = ({ navigation }) => {
  const [date, setDate] = useState("");
  const [invoiceNo, setInvoiceNo] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(0);
  const [qty, setQty] = useState(0);
  const [product, setProduct] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [orderUpdate, setOrderUpdate] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [deliveryCompany, setDeliveryCompany] = useState("");
  const [remark, setRemark] = useState("");
  const [first_followup, setFirst_followup] = useState("");
  const [second_followup, setSecond_followupId] = useState("");
  const [third_followup, setThird_followup] = useState("");
  const [bkashCost, setBkashCost] = useState(0);
  const [other, setOther] = useState(0);
  const [depositToAccount, setDepositToAccount] = useState(0);

  // Add a new document in collection "invoice"
  function createInvoice() {
    addDoc(collection(db, "invoice"), {
      date: date,
      invoice_no: invoiceNo,
      name: name,
      address: address,
      email: email,
      mobile: mobile,
      qty: qty,
      product: product,
      product_price: productPrice,
      advance: advance,
      orderUpdate: orderUpdate,
      delivery_charge: deliveryCharge,
      delivery_company: deliveryCompany,
      remark: remark,
      first_followup: first_followup,
      second_followup: second_followup,
      third_followup: third_followup,
      bkash_cost: bkashCost,
      other: other,
      deposit_to_account: depositToAccount,
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

  // console.log("and name is : " + inputs.name);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textCreate}>Create</Text>
        <View style={{ marginVertical: 20 }}>
          {/* all design value goes to InputItem through props and apply inside input field */}
          <InputItem
            label="Date"
            placeholder="2022-10-27"
            onChangeText={(text) => setDate(text)}
          />
          <InputItem
            label="Invoice No"
            placeholder="6"
            keyboardType="numeric"
            onChangeText={(text) => setInvoiceNo(text)}
          />
          <InputItem
            label="Name"
            placeholder="Arafat hossain"
            onChangeText={(text) => setName(text)}
          />
          <InputItem
            label="Address"
            placeholder="Gulshan-1, Dhaka"
            onChangeText={(text) => setAddress(text)}
          />
          <InputItem
            label="Email"
            placeholder="abc@gmail.com"
            onChangeText={(text) => setEmail(text)}
          />
          <InputItem
            label="Mobile"
            keyboardType="numeric"
            placeholder="0177776666555"
            onChangeText={(text) => setMobile(text)}
          />
          <InputItem
            label="QTY"
            placeholder="3"
            keyboardType="numeric"
            onChangeText={(text) => setQty(text)}
          />
          <InputItem
            label="Product"
            placeholder="Head Phone"
            onChangeText={(text) => setProduct(text)}
          />
          <InputItem
            label="Product Price"
            placeholder="1020"
            keyboardType="numeric"
            onChangeText={(text) => setProductPrice(text)}
          />
          <InputItem
            label="Advance"
            placeholder="500"
            keyboardType="numeric"
            onChangeText={(text) => setAdvance(text)}
          />
          <InputItem
            label="Order Update"
            placeholder="Delivered"
            onChangeText={(text) => setOrderUpdate(text)}
          />
          <InputItem
            label="Delivery Charge"
            placeholder="75"
            keyboardType="numeric"
            onChangeText={(text) => setDeliveryCharge(text)}
          />
          <InputItem
            label="Delivery Company"
            placeholder="RedX"
            onChangeText={(text) => setDeliveryCompany(text)}
          />
          <InputItem
            label="Remarks"
            placeholder="Nothing"
            onChangeText={(text) => setRemark(text)}
          />
          <InputItem
            label="1st Followup"
            placeholder="Processing"
            onChangeText={(text) => setFirst_followup(text)}
          />
          <InputItem
            label="2nd Followup"
            placeholder="N/A"
            onChangeText={(text) => setSecond_followupId(text)}
          />
          <InputItem
            label="3rd Followup"
            placeholder="N/A"
            onChangeText={(text) => setThird_followup(text)}
          />
          <InputItem
            label="bKash Cost"
            placeholder="20"
            keyboardType="numeric"
            onChangeText={(text) => setBkashCost(text)}
          />
          <InputItem
            label="Others (VAT, TAX, etc.)"
            placeholder="10"
            keyboardType="numeric"
            onChangeText={(text) => setOther(text)}
          />
          <InputItem
            label="Deposit to Accounts"
            placeholder="800"
            keyboardType="numeric"
            onChangeText={(text) => setDepositToAccount(text)}
          />
          <Btn title="Create" onPress={createInvoice} />
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
