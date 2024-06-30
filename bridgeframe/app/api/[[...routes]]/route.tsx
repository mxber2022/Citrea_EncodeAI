/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { parseEther } from 'frog'
import { ethers } from "ethers";
import { Web3 } from 'web3';
const axios = require('axios');


const abi = [ 
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "safeMint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

//@ts-ignore
const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue

  return c.res({
    action: "/picker",
    image: "",
    intents: [
      <TextInput placeholder="Enter custom prompt..." />,
      <Button value="Generate">Generate</Button>,
      // <Button value="Mint">Mint</Button>,
    ],
  })
})

app.frame('/picker', async (c) => {
  const { buttonValue, inputText, status } = c
  console.log("buttonValue: ", buttonValue);
  console.log("inputText: ", inputText);

  if(buttonValue == "Generate") {
    /* 
      Gernerate AI Generative Art 
    */
    const imageGenerated = await generateAI();
    //"https://azure-worried-landfowl-942.mypinata.cloud/ipfs/QmVj3zPGA4EUNgMWSA1yzmBHCtnd7R4crBVUex5vQRLurm/Frame_outline-min.jpg"

    return c.res({
      image: `${imageGenerated}`,
      imageAspectRatio: '1:1',
      intents: [
        <TextInput placeholder="Enter custom prompt..." />,
        <Button value="Generate">ReGenerate</Button>,
        <Button value="Mint">Mint</Button>,
        // <Button.Transaction target="/mint">Mint</Button.Transaction>,
      ],
    })
  }

  if(buttonValue == "Mint") {
    /* 
      Mint NFT via API
    */
    await mint();
    return c.res({
      image: "http://localhost:3000/minted.jpg",
      imageAspectRatio: '1:1',
      intents: [
        <TextInput placeholder="Enter custom prompt..." />,
        <Button value="Generate">ReGenerate</Button>,
      ],
    })
  }

  return c.res({
    action: "/picker",
    image: "",
    intents: [
      <TextInput placeholder="Enter custom fruit..." />,
      <Button value="Generate">Generate</Button>,
      <Button value="Mint">Mint</Button>,
    ],
  })
})

async function mint() {
  console.log("hello mint initiating")
  const CONTRACT_ADDRESS = "0xAaa906c8C2720c50B69a5Ba54B44253Ea1001C98";
  const provider = new ethers.JsonRpcProvider("https://rpc.devnet.citrea.xyz");
  let CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
  //@ts-ignore
  const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const payload = await CONTRACT.safeMint.populateTransaction("0x7199D548f1B30EA083Fe668202fd5E621241CC89","https://github.com/mxber2022/BNB-Hackathon-Istanbul/blob/main/Assets/Sentinel_logo.png" );
  //const signedTx = await Wallet.signTransaction(payload);
  const txResponse = await Wallet.sendTransaction(payload);
  console.log('Transaction hash:', txResponse.hash);
  const receipt = await txResponse.wait();
  console.log('Transaction receipt:', receipt);
}

async function generateAI() {
  const OPENAI_API_KEY = process.env.OPENAI_KEY;
  
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: "a car",
        n: 1,
        size: '256x256',
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const image_url = response.data.data[0].url;
    return image_url;
  } 
  catch (error) {
   // console.error('Error generating image:', error);

    return "https://azure-worried-landfowl-942.mypinata.cloud/ipfs/QmVj3zPGA4EUNgMWSA1yzmBHCtnd7R4crBVUex5vQRLurm/TechWhiteboard-min.jpg";
  }
  

}

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)

// minting address
//