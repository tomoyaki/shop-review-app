import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyDWmLWUJeOC8RDHRA9SF4ess-sG8XdNKd8",
    authDomain: "shop-review-77e71.firebaseapp.com",
    projectId: "shop-review-77e71",
    storageBucket: "shop-review-77e71.appspot.com",
    messagingSenderId: "929396943001",
    appId: "1:929396943001:web:f86d6033190b72dd78b008",
    measurementId: "G-60696DCW4J",
  };

  firebase.initializeApp(firebaseConfig);
}

type Shop = {
  name: string;
  place: string;
};

export default function App() {
  const [shops, setShops] = useState<Shop[]>([]);
  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const snapshot = await firebase.firestore().collection("shops").get();
    const shops = snapshot.docs.map((doc) => doc.data() as Shop);
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
