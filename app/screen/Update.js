import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "../components/Btn";
import InputItem from "../components/InputItem";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/config";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Update = ({ navigation, route }) => {
  const [id, setid] = useState(route.params.id);
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

  // making all false to accept if don't change anything.
  const [error, setError] = useState({
    Invoice: false,
    Name: false,
    Mobile: false,
    QTY: false,
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

  // get data from database to update
  useEffect(() => {
    const getInvoice = async () => {
      const docRef = doc(db, "invoice", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        setDate(docSnap.data().date);
        setInvoiceNo(docSnap.data().invoice_no);
        setName(docSnap.data().name);
        setAddress(docSnap.data().address);
        setEmail(docSnap.data().email);
        setMobile(docSnap.data().mobile);
        setQty(docSnap.data().qty);
        setProduct(docSnap.data().product);
        setProductPrice(docSnap.data().product_price);
        setAdvance(docSnap.data().advance);
        setOrderUpdate(docSnap.data().update);
        setDeliveryCharge(docSnap.data().delivery_charge);
        setDeliveryCompany(docSnap.data().delivery_company);
        setRemark(docSnap.data().remark);
        setFirst_followup(docSnap.data().first_followup);
        setSecond_followupId(docSnap.data().second_followup);
        setThird_followup(docSnap.data().third_followup);
        setBkashCost(docSnap.data().bkash_cost);
        setOther(docSnap.data().other);
        setDepositToAccount(docSnap.data().deposit_to_account);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getInvoice();
  }, []);

  // Add a new document in collection "invoice"
  const updateInvoice = async () => {
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
      updateDoc(doc(db, "invoice", id), {
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
  };

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
        <Text style={styles.textCreate}>Update</Text>
        <View style={{ marginVertical: 20 }}>
          {/* all design value goes to InputItem through props and apply inside input field */}
          <InputItem
            label="Date"
            value={date}
            // onChangeText={(text) => setDate(text)}
            onFocus={showDatePicker}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <InputItem
            label="Invoice No *"
            value={invoiceNo}
            keyboardType="numeric"
            onChangeText={(text) => {
              setInvoiceNo(text), handleError(text, "Invoice");
            }}
            error={error.Invoice}
          />
          <InputItem
            label="Name *"
            value={name}
            onChangeText={(text) => {
              setName(text), handleError(text, "Name");
            }}
            error={error.Name}
          />
          <InputItem
            label="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <InputItem
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <InputItem
            label="Mobile *"
            keyboardType="numeric"
            value={mobile}
            onChangeText={(text) => {
              setMobile(text), handleError(text, "Mobile");
            }}
            error={error.Mobile}
          />
          <InputItem
            label="QTY *"
            value={qty}
            keyboardType="numeric"
            onChangeText={(text) => {
              setQty(text), handleError(text, "QTY");
            }}
            error={error.QTY}
          />
          <InputItem
            label="Product"
            value={product}
            onChangeText={(text) => setProduct(text)}
          />
          <InputItem
            label="Product Price"
            value={productPrice}
            keyboardType="numeric"
            onChangeText={(text) => setProductPrice(text)}
          />
          <InputItem
            label="Advance"
            value={advance}
            keyboardType="numeric"
            onChangeText={(text) => setAdvance(text)}
          />
          <InputItem
            label="Order Update"
            value={orderUpdate}
            onChangeText={(text) => setOrderUpdate(text)}
          />
          <InputItem
            label="Delivery Charge"
            value={deliveryCharge}
            keyboardType="numeric"
            onChangeText={(text) => setDeliveryCharge(text)}
          />
          <InputItem
            label="Delivery Company"
            value={deliveryCompany}
            onChangeText={(text) => setDeliveryCompany(text)}
          />
          <InputItem
            label="Remarks"
            value={remark}
            onChangeText={(text) => setRemark(text)}
          />
          <InputItem
            label="1st Followup"
            value={first_followup}
            onChangeText={(text) => setFirst_followup(text)}
          />
          <InputItem
            label="2nd Followup"
            value={second_followup}
            onChangeText={(text) => setSecond_followupId(text)}
          />
          <InputItem
            label="3rd Followup"
            value={third_followup}
            onChangeText={(text) => setThird_followup(text)}
          />
          <InputItem
            label="bKash Cost"
            value={bkashCost}
            keyboardType="numeric"
            onChangeText={(text) => setBkashCost(text)}
          />
          <InputItem
            label="Others (VAT, TAX, etc.)"
            value={other}
            keyboardType="numeric"
            onChangeText={(text) => setOther(text)}
          />
          <InputItem
            label="Deposit to Accounts"
            value={depositToAccount}
            keyboardType="numeric"
            onChangeText={(text) => setDepositToAccount(text)}
          />
          <Text style={{ marginTop: 7, color: "#ff0000", fontSize: 12 }}>
            {requiredStatus}
          </Text>
          <Btn title="Update" onPress={updateInvoice} />
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

export default Update;
