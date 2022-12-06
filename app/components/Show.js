import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable,
  SafeAreaView,
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "./config";

const Show = ({ navigation }) => {
  const [allInvoice, setAllInvoice] = useState([]);

  const getInvoice = async () => {
    const data = await getDocs(collection(db, "invoice"));
    setAllInvoice(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // refresh page data on navigation change
  React.useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      // Alert.alert("Refreshed");
      getInvoice();
    });
    return focusHandler;
  }, [navigation]);

  const [columnName, setColumnName] = useState([
    "date",
    "invoice_no",
    "name",
    "address",
    "email",
    "mobile",
    "qty",
    "product",
    "product_price",
    "advance",
    "update",
    "delivery_charge",
    "delivery_company",
    "remark",
    "first_followup",
    "second_followup",
    "third_followup",
    "bkash_cost",
    "other",
    "deposit_to_account",
    "Action",
  ]);

  const [tableHead, setTableHead] = useState([
    "Date",
    "Invoice No",
    "Name",
    "Address",
    "Email",
    "Mobile",
    "QTY",
    "Product",
    "Product Price",
    "Advance",
    "Order Update",
    "Delivery Charge",
    "Delivery Company",
    "Remarks",
    "1st Followup",
    "2nd Followup",
    "3rd Followup",
    "bKash Cost",
    "Others (VAT, TAX, etc.)",
    "Deposit to Accounts",
    "Action",
  ]);

  const alertIndex = (index, id) => {
    Alert.alert(`This is row ${index + id}`);
  };

  const deleteInvoice = (id) => {
    console.log("delete : " + id);
    deleteDoc(doc(db, "invoice", id));
    getInvoice();
  };

  const element = (id, index) => (
    <View>
      <Pressable style={styles.button}>
        <Text
          style={styles.textUpdate}
          onPress={() => navigation.navigate("Update", { id: id })}
        >
          {"Update"}
        </Text>
        <Text style={styles.textDelete} onPress={() => deleteInvoice(id)}>
          {"Delete"}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={true}>
        <ScrollView
          vertical={true}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <Table borderStyle={{ borderColor: "blue", borderWidth: 0.5 }}>
            <Row
              data={tableHead}
              width={140}
              textStyle={styles.head}
              style={{ backgroundColor: "#367588" }}
            />
            {allInvoice.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {columnName.map((cellData, cellIndex) => (
                  <Cell
                    textStyle={styles.cell}
                    width={140}
                    key={cellIndex}
                    data={
                      cellIndex === 20
                        ? element(rowData[`${"id"}`], index)
                        : rowData[`${cellData}`]
                    }
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 16,
    // paddingTop: 30,
    // color: "#93c47d",
    backgroundColor: "#fff",
    // marginBottom: "25%",
    // margin: 5,
  },
  head: {
    margin: 6,
    // backgroundColor: "#367588",
    alignSelf: "center",
    textAlignVertical: "center",
    color: "white",
  },
  cell: { margin: 8, textAlign: "center" },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },

  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textUpdate: {
    borderRadius: 6,
    elevation: 6,
    shadowColor: "purple",
    color: "white",
    backgroundColor: "#1a22f7",
    margin: 8,
    padding: 8,
  },
  textDelete: {
    borderRadius: 6,
    elevation: 6,
    shadowColor: "red",
    color: "white",
    backgroundColor: "orange",
    margin: 8,
    padding: 8,
  },
});
export default Show;
// #332b6300
