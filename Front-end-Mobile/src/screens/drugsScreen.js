import { VStack,Heading,Input,Icon,NativeBaseProvider } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import CardDrug from "../../component/cardDrug";
import DrugList from "../../component/drugList";

const DrugScreen = ({ navigation }) => {
  const [textSeach, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://192.168.1.50:5000/api/drugs");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function onChangeSearch(text) {
    setSearch(text.substr(0, 20));
  }

  let filterDrugs = data.filter((item) => {
    return item.name.geneticName.indexOf(textSeach) !== -1;
  });

  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#F9F8FF",paddingTop:"10%" }}
    >
      <View style={{ flex: 1, alignItems: "center", margin: 20, width: "90%" }}>
      <NativeBaseProvider>
      <VStack w="100%"  alignSelf="center">
        <Input onChangeText={(text) => onChangeSearch(text)}
          value={textSeach} placeholder="Search Drugs" width="100%" borderRadius="4" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} InputRightElement={<Icon m="2" mr="3" size="6" color="gray.400" as={<MaterialIcons name="mic" />} />} />
      </VStack>
      </NativeBaseProvider>

        <SafeAreaView style={{ flex: 10,marginTop:15, width: "100%" }}>
          <ScrollView>
            {textSeach != "" &&
              filterDrugs.map((item, key) => {
                return (
                  <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("drugScreen", { id: item._id })
                      }
                    >
                  <DrugList drug={item}/>
                  </TouchableOpacity>
                );
              })}

            {textSeach == "" &&
              data.map((item, key) => {
                return (
                  <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("drugScreen", { id: item._id })
                      }
                    >
                  <DrugList drug={item}/>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default DrugScreen;
