import React, { useEffect, useState } from "react";
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { View, Text, Button } from "react-native";

export default function App() {
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const connect = async () => {
      const provider = new WsProvider("ws://localhost:9944");
      const api = await ApiPromise.create({ provider });
      const keyring = new Keyring({ type: "sr25519" });
      const alice = keyring.addFromUri("//Alice");
      const { data: bal } = await api.query.system.account(alice.address);
      setBalance(bal.free.toHuman());
    };
    connect();
  }, []);

  return (
    <View>
      <Text>Wallet Balance: {balance}</Text>
      <Button title="Send Transaction" onPress={() => {}} />
    </View>
  );
}
