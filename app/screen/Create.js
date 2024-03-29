import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "../components/Btn";
import InputItem from "../components/InputItem";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../components/config";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Create = ({ navigation }) => {
  const [date, setDate] = useState(new Date().toDateString());
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

  const [error, setError] = useState({
    Invoice: true,
    Name: true,
    Mobile: true,
    QTY: true,
  });
  let requiredFlag = true;
  const [requiredStatus, setRequiredStatus] = useState("");

  // Date picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setDate(date.toDateString());
    hideDatePicker();
  };

  // Add a new document in collection "invoice"
  function createInvoice() {
    // check all required input field.
    for (let value in error) {
      console.log(error[value]);
      if (error[value]) {
        requiredFlag = false;
        setError((prevState) => ({
          ...prevState,
          [value]: value + " can't be empty.",
        }));
        setRequiredStatus("* Required field can't be empty.");
      }
    }

    if (requiredFlag) {
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
        update: orderUpdate,
        delivery_charge: deliveryCharge,
        delivery_company: deliveryCompany,
        remark: remark,
        first_followup: first_followup,
        second_followup: second_followup,
        third_followup: third_followup,
        bkash_cost: bkashCost,
        other: other,
        deposit_to_account: depositToAccount,
        time_stamp: serverTimestamp(),
      })
        .then(() => {
          //Data save Successfully
          console.log("data submitted");
        })
        .catch((error) => {
          //Failed
          console.log(error);
        });
      // back to show Invoice
      navigation.navigate("Show Item");
    }
  }

  // required input field check
  const handleError = (inputText, field) => {
    if (inputText == "") {
      setError((prevState) => ({
        ...prevState,
        [field]: field + " can't be empty.",
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        [field]: false,
      }));
    }
    setRequiredStatus("");
  };

  // console.log("and name is : " + inputs.name);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textCreate}>Create</Text>
        <View style={{ marginVertical: 20 }}>
          {/* all design value goes to InputItem through props and apply inside input field */}
          <InputItem
            label="Date"
            value={date}
            placeholder="2022-10-27"
            placeholderTextColor="#80808040"
            // onChangeText={(text) => setDate(text)}
            onFocus={showDatePicker}
          />

          {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <InputItem
            label="Invoice No *"
            placeholder="6"
            placeholderTextColor="#80808040"
            keyboardType="numeric"
            onChangeText={(text) => {
              setInvoiceNo(text), handleError(text, "Invoice");
            }}
            error={error.Invoice}
          />
          <InputItem
            label="Name *"
            placeholder="Arafat hossain"
            placeholderTextColor="#80808040"
            onChangeText={(text) => {
              setName(text), handleError(text, "Name");
            }}
            error={error.Name}
          />
          <InputItem
            label="Address"
            placeholder="Gulshan-1, Dhaka"
            placeholderTextColor="#80808040"
            onChangeText={(text) => setAddress(text)}
          />
          <InputItem
            label="Email"
            placeholder="abc@gmail.com"
            placeholderTextColor="#80808040"
            onChangeText={(text) => setEmail(text)}
          />
          <InputItem
            label="Mobile *"
            keyboardType="numeric"
            placeholder="0177776666555"
            placeholderTextColor="#80808040"
            onChangeText={(text) => {
              setMobile(text), handleError(text, "Mobile");
            }}
            error={error.Mobile}
          />
          <InputItem
            label="QTY *"
            placeholder="3"
            placeholderTextColor="#80808040"
            keyboardType="numeric"
            onChangeText={(text) => {
              setQty(text), handleError(text, "QTY");
            }}
            error={error.QTY}
          />
          <InputItem
            label="Product"
            placeholder="Head Phone"
            placeholderTextColor="#80808040"
            onChangeText={(text) => setProduct(text)}
          />
          <InputItem
            label="Product Price"
            placeholder="1020"
            placeholderTextColor="#80808040"
            keyboardType="numeric"
            onChangeText={(text) => setProductPrice(text)}
          />
          <InputItem
            label="Advance"
            placeholder="500"
            placeholderTextColor="#80808040"
            keyboardType="numeric"
            onChangeText={(text) => setAdvance(text)}
          />
          <InputItem
            label="Order Update"
            placeholder="Delivered"
            placeholderTextColor="#80808040"
            onChangeText={(text) => setOrderUpdate(text)}
          />
          <InputItem
            label="Delivery Charge"
            placeholder="75"
            placeholderTextColor="#80808040"
            keyboardType="numeric"
            onChangeText={(text) => setDeliveryCharge(text)}
          />
          <InputItem
            label="Delivery Company"
            placeholder="RedX"
            placeholderTextColor="#80808040"
            onChangeText={(text) => setDeliveryCompany(text)}
          />
          <InputItem
            label="Remarks"
            placeholder="Nothing"
            placeholderTextColor="#80808040"
            onChangeText={(text) => setRemark(text)}
          />
          <InputItem
            label="1st Followup"
            placeholder="Processing"
            placeholderTextColor="#80808040"
            onChangeText={(text) => setFirst_followup(text)}
          />
          <InputItem
            label="2nd Followup"
            placeholder="N/A"
            placeholderTextColor="#80808040"
            onChangeText={(text) => setSecond_followupId(text)}
          />
          <InputItem
            label="3rd Followup"
            placeholder="N/A"
            placeholderTextColor="#80808040"
            onChangeText={(text) => setThird_followup(text)}
          />
          <InputItem
            label="bKash Cost"
            placeholder="20"
            placeholderTextColor="#80808040"
            keyboardType="numeric"
            onChangeText={(text) => setBkashCost(text)}
          />
          <InputItem
            label="Others (VAT, TAX, etc.)"
            placeholder="10"
            placeholderTextColor="#80808040"
            keyboardType="numeric"
            onChangeText={(text) => setOther(text)}
          />
          <InputItem
            label="Deposit to Accounts"
            placeholder="800"
            placeholderTextColor="#80808040"
            keyboardType="numeric"
            onChangeText={(text) => setDepositToAccount(text)}
          />

          <Text style={{ marginTop: 7, color: "#ff0000", fontSize: 12 }}>
            {requiredStatus}
          </Text>
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
