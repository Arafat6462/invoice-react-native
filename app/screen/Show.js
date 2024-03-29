import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable,
  SafeAreaView,
  RefreshControl,
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
  startAfter,
  getDocs,
  orderBy,
  limit,
  where,
  query,
} from "firebase/firestore";

import { db } from "../components/config";
// expo add expo-file-system expo-sharing xlsx
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import DropDownPicker from "react-native-dropdown-picker";
import { async } from "@firebase/util";

const Show = ({ navigation }) => {
  const [allInvoice, setAllInvoice] = useState([]);
  const [filterInvoice, setFilterInvoice] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchField, setSearchField] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [postPerLoad] = useState(100);
  const [startQueryAfter, setStartQueryAfter] = useState(Object);

  // dropdown picker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("invoice_no");
  const [items, setItems] = useState([
    { label: "Invoice", value: "invoice_no" },
    { label: "Name", value: "name" },
    { label: "Date", value: "date" },
    { label: "Email", value: "email" },
    { label: "Mobile", value: "mobile" },
    { label: "Product", value: "product" },
    { label: "Address", value: "address" },
    { label: "Update", value: "update" },
  ]);

  // Filter order inside table
  useEffect(() => {
    if (searchField == "") setSearchField("invoice_no"); // in first load default search field
    if (searchInput == "") setFilterInvoice(allInvoice);
    else {
      setFilterInvoice(
        allInvoice.filter((invoice) => {
          return invoice[`${searchField}`]
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        })
      );
    }
  }, [searchInput, searchField]);

  // get all data from firebase order by time_stamp
  const getInvoice = async () => {
    const data = await getDocs(
      query(
        collection(db, "invoice"),
        orderBy("time_stamp", "desc"),
        limit(postPerLoad)
      )
    );
    // getting last item from limit query
    const lastVisibleOrder = data.docs[data.docs.length - 1];
    setStartQueryAfter(lastVisibleOrder);

    setAllInvoice(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setFilterInvoice(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Getting more order on scroll
  const getMoreOrder = async () => {
    const data = await getDocs(
      query(
        collection(db, "invoice"),
        orderBy("time_stamp", "desc"),
        startAfter(startQueryAfter),
        limit(postPerLoad)
      )
    );
    // getting last item from limit query
    const lastVisibleOrder = data.docs[data.docs.length - 1];
    setStartQueryAfter(lastVisibleOrder);

    setAllInvoice([
      ...allInvoice,
      ...data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    ]);
    setFilterInvoice([
      ...filterInvoice,
      ...data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    ]);
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

  // Delete by ID
  const deleteInvoice = (id) => {
    // console.log("delete : " + id);
    deleteDoc(doc(db, "invoice", id));
    getInvoice(); // to refresh table
  };

  const deleteAlert = (id) => {
    Alert.alert(
      "Alert",
      "Do you want to delete ?",
      [{ text: "No" }, { text: "Yes", onPress: () => deleteInvoice(id) }],
      { cancelable: true }
    );
  };

  // Download as Xlsx
  const downloadDataAsXlsx = () => {
    // console.log(allInvoice);
    // console.log("inside Xlsx");

    let wb = XLSX.utils.book_new();
    let ws2 = XLSX.utils.json_to_sheet(allInvoice);
    XLSX.utils.book_append_sheet(wb, ws2, "MySecondSheet");
    const base64 = XLSX.write(wb, { type: "base64" });
    const filename = FileSystem.documentDirectory + "Order.xlsx";

    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      Sharing.shareAsync(filename);
    });
  };

  // scroll view reach to last
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 2;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  // Refresh
  const refreshTable = () => {
    getInvoice();
  };

  // Update,Delete button
  const element = (id, index) => (
    <View>
      <Pressable style={styles.button}>
        <Text
          style={styles.textUpdate}
          onPress={() => navigation.navigate("Update", { id: id })}
        >
          {"Update"}
        </Text>
        <Text style={styles.textDelete} onPress={() => deleteAlert(id)}>
          {"Delete"}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchInput}
          placeholder="Search"
        />

        <DropDownPicker
          style={{
            backgroundColor: "orange",
            borderRadius: 0,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            borderWidth: 0,
          }}
          containerStyle={{
            width: 105,
            borderRadius: 0,
          }}
          selectedItemContainerStyle={{
            backgroundColor: "#f0f0f0",
          }}
          listItemLabelStyle={{
            color: "black",
          }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onSelectItem={(item) => {
            console.log(item.value);
            setSearchField(item.value);
          }}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.downloadOpacity}
          onPress={downloadDataAsXlsx}
        >
          <Text style={styles.downloadText}>{"Download"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.refreshImg} onPress={refreshTable}>
          <Image
            style={styles.refreshImg}
            source={require("../../assets/refresh.png")}
          />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={true}>
        <ScrollView
          vertical={true}
          contentContainerStyle={{ paddingBottom: 100 }}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent) && startQueryAfter) {
              getMoreOrder();
            }
          }}
          scrollEventThrottle={400}
        >
          <Table borderStyle={{ borderColor: "#32CD32", borderWidth: 0.4 }}>
            <Row
              data={tableHead}
              width={140}
              textStyle={styles.head}
              style={{ backgroundColor: "#3CB371" }}
            />
            {filterInvoice.map((rowData, index) => (
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
  topView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 10,
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

  searchInput: {
    flex: 1,
    fontSize: 16,
    height: 50,
    backgroundColor: "#eff1f9",
    marginLeft: 10,
    textAlign: "center",
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    color: "blue",
  },
  refreshImg: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
});
export default Show;
// #332b6300
