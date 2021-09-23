import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
/* lib */
import { getShops } from "./src/lib/firebase";
/* types */
import { Shop } from "./src/types/shop";

export default function App() {
  const [shops, setShops] = useState<Shop[]>([]);
  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const shops = await getShops();
    setShops(shops);
  };

  const shopItems = shops.map((shop, index) => (
    <View style={{ margin: 10 }} key={index.toString()}>
      <Text>
        {shop.name}
        {shop.place}
      </Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      {shopItems}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAFA",
    alignItems: "center",
    justifyContent: "center",
  },
});
