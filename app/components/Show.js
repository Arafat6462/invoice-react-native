import React, { useState } from "react";
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

const Show = ({ navigation }) => {
  const [tableHead, setTableHead] = useState([
    "Head",
    "Head2",
    "Head3",
    "Head4",
    "Head",
    "Head2",
    "Head3",
    "Head4",
    "Head",
    "Head2",
    "Head3",
    "Head4",
  ]);
  const [tableData, setTableData] = useState([
    ["1", "2", "3", "4", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["1", "2", "3", "4", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
    ["a", "b", "c", "d", "1", "2", "3", "4", "1", "2", "3", "4"],
  ]);

  const alertIndex = (index) => {
    Alert.alert(`This is row ${index + 1}`);
  };

  const element = (data, index) => (
    <TouchableOpacity onPress={() => alertIndex(index)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>button</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <ScrollView vertical={true}>
          <Table borderStyle={{ borderColor: "transparent" }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            {tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={
                      cellIndex === 11 ? element(cellData, index) : cellData
                    }
                    textStyle={styles.text}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
        </ScrollView>
      </ScrollView>
      {/* <Text style={styles.text}>Show Item</Text>
      <Button
        onPress={() => navigation.navigate("Update")}
        title="Move to Update screen"
      /> */}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#000",
//   },
// });

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#808B97" },
  text: { margin: 6 },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
  btn: { width: 58, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
  btnText: { textAlign: "center", color: "#fff" },
});
export default Show;
