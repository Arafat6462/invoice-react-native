import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "../components/Btn";
import InputItem from "../components/InputItem";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/config";

const Update = ({ navigation, route }) => {
  const [id, setid] = useState(route.params.id);
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

  // get data to update
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
    // Add a new document in collection "cities"
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
            onChangeText={(text) => setDate(text)}
          />
          <InputItem
            label="Invoice No"
            value={invoiceNo}
            keyboardType="numeric"
            onChangeText={(text) => setInvoiceNo(text)}
          />
          <InputItem
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
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
            label="Mobile"
            keyboardType="numeric"
            value={mobile}
            onChangeText={(text) => setMobile(text)}
          />
          <InputItem
            label="QTY"
            value={qty}
            keyboardType="numeric"
            onChangeText={(text) => setQty(text)}
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
