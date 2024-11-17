import React from "react";
import { View, Text, StatusBar } from "react-native";
import { FlashList } from "@shopify/flash-list";
import styles from "./Style";

const DATA = [
  { name: "John Doe", department: "Information Management" },
  { name: "Jane Smith", department: "Computer Science" },
  { name: "Alice Brown", department: "Business Administration" },
  { name: "Mike Johnson", department: "Engineering" },
  { name: "Emily Davis", department: "Marketing" },
  { name: "Chris Wilson", department: "Finance" },
  { name: "Jessica Lee", department: "Human Resources" },
  { name: "Daniel Martinez", department: "Environmental Science" },
  { name: "Sarah Taylor", department: "Design" },
  { name: "Robert Anderson", department: "Law" },
  { name: "Laura Thomas", department: "Art and Design" },
  { name: "James White", department: "Psychology" },
  { name: "Patricia Harris", department: "Sociology" },
  { name: "Steven Clark", department: "Mathematics" },
  { name: "Mary Lewis", department: "Physics" },
  { name: "Paul Walker", department: "Chemistry" },
  { name: "Nancy Hall", department: "Biology" },
  { name: "Brian Young", department: "Statistics" },
  { name: "Lisa King", department: "Education" },
  { name: "Kevin Scott", department: "Political Science" }
];

function Team({navigation}) {
  return (
    <FlashList
      data={DATA}
      renderItem={({ item }) => <View style={styles.list}><Text style={{margin:30}}>{item.name}{'\n\nDepartment：'}{item.department}</Text></View>}
      estimatedItemSize={200}
    />
  );
}
  
  export default Team;