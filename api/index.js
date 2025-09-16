const express = require("express");
const { ApiPromise, WsProvider, Keyring } = require("@polkadot/api");

const app = express();
app.use(express.json());

let api;

(async () => {
  const provider = new WsProvider("ws://node1:9944");
  api = await ApiPromise.create({ provider });
})();

app.post("/mint", async (req, res) => {
  try {
    const { to, amount } = req.body;
    const keyring = new Keyring({ type: "sr25519" });
    const admin = keyring.addFromUri("//Alice");

    const tx = api.tx.stablecoin.mint(to, amount);
    await tx.signAndSend(admin);
    res.json({ status: "Mint successful", to, amount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/balance/:address", async (req, res) => {
  try {
    const { data } = await api.query.system.account(req.params.address);
    res.json({ balance: data.free.toHuman() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("API running on port 3000"));
