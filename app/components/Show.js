import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
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
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

const Show = ({ navigation }) => {
  const [allInvoice, setAllInvoice] = useState([]);

  useEffect(() => {
    const getInvoice = async () => {
      const data = await getDocs(collection(db, "invoice"));
      setAllInvoice(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getInvoice();
  }, []);

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

  const alertIndex = (index) => {
    Alert.alert(`This is row ${index + 1}`);
  };

  const element = (data, index) => (
    <TouchableOpacity onPress={() => alertIndex(data)}>
      <View style={styles.btn}>
        <Text style={styles.btnTextDelete}>Delete</Text>
        <Text style={styles.btnTextUpdate}>Update</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <ScrollView vertical={true}>
          <Table borderStyle={{ borderColor: "blue", borderWidth: 0.5 }}>
            <Row
              data={tableHead}
              width={140}
              style={styles.head}
              textStyle={styles.text}
            />
            {allInvoice.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {columnName.map((cellData, cellIndex) => (
                  <Cell
                    width={140}
                    key={cellIndex}
                    data={
                      cellIndex === 19
                        ? element(cellData, index)
                        : rowData[`${cellData}`]
                    }
                    textStyle={styles.text}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 60, backgroundColor: "#808B97" },
  text: { margin: 6, textAlign: "center" },
  row: { flexDirection: "row", backgroundColor: "#F0F1C1" },
  btn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    // marginLeft: 20,
    // width: 58,
    // height: 18,
    backgroundColor: "#78B7BB",
    borderRadius: 2,
  },
  btnTextDelete: { textAlign: "center", color: "#f44" },
  btnTextUpdate: { textAlign: "center", color: "#4fa" },
});
export default Show;
