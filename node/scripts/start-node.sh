#!/bin/bash
set -e

NODE_NAME=$1
BASE_PATH="/data/${NODE_NAME}"

exec /usr/local/bin/node-template \
  --base-path $BASE_PATH \
  --chain /usr/src/app/ft-chain-raw.json \
  --name $NODE_NAME \
  --ws-port 9944 \
  --rpc-port 9933 \
  --port 30333 \
  --validator
