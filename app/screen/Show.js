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
  orderBy,
  where,
  query,
} from "firebase/firestore";

import { db } from "../components/config";
// expo add expo-file-system expo-sharing xlsx
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const Show = ({ navigation }) => {
  const [allInvoice, setAllInvoice] = useState([]);

  // get all data from firebase order by time_stamp
  const getInvoice = async () => {
    const data = await getDocs(
      query(collection(db, "invoice"), orderBy("time_stamp", "desc"))
    );
    setAllInvoice(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // where("name", "==", "Name")
  // orderBy("time_stamp")

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

  // Download as Xlsx
  const downloadDataAsXlsx = () => {
    console.log(allInvoice);
    console.log("inside Xlsx");

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet([
      ["odd", "even", "total"],
      [1, 2],
      [3, 4],
      [5, 6],
    ]);

    let ws2 = XLSX.utils.json_to_sheet(allInvoice);
    XLSX.utils.book_append_sheet(wb, ws2, "MySecondSheet");

    const base64 = XLSX.write(wb, { type: "base64" });
    const filename = FileSystem.documentDirectory + "MyExcel.xlsx";
    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      Sharing.shareAsync(filename);
    });
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
      <View style={styles.downloadView}>
        <TouchableOpacity
          activeOpacity={0.6}
          
          style={styles.downloadOpacity}
          onPress={downloadDataAsXlsx}
        >
          <Text style={styles.downloadText}>{"Download as XLSX"}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        <ScrollView
          vertical={true}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <Table borderStyle={{ borderColor: "#32CD32", borderWidth: 0.4 }}>
            <Row
              data={tableHead}
              width={140}
              textStyle={styles.head}
              style={{ backgroundColor: "#3CB371" }}
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
    marginBottom: "12%",
    // marginTop: "15%",
    // margin: 5,
  },
  head: {
    margin: 6,
    // backgroundColor: "#367588",
    alignSelf: "center",
    textAlignVertical: "center",
    color: "#000",
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
  downloadView: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  downloadOpacity: {
    borderRadius: 6,
    elevation: 8,
    shadowColor: "blue",
    backgroundColor: "#1E90FF",
    margin: 8,
    padding: 8,
  },
  downloadText: {
    color: "white",
  },
});
export default Show;
// #332b6300
