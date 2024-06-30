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
  
  return c.res({
    action: "/picker",
    image: (
      <div style={{ color: 'black', display: 'flex', fontSize: 60 , background: '#f6f6f6',width: '100%',
        height: '100%', flexDirection: 'column',
       
        alignItems: 'center',
        position: 'relative',}}>
        Mint Generative Art!
      </div>
    ),
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
    const imageGenerated = await generateAI(inputText);
    //"https://azure-worried-landfowl-942.mypinata.cloud/ipfs/QmVj3zPGA4EUNgMWSA1yzmBHCtnd7R4crBVUex5vQRLurm/Frame_outline-min.jpg"
    
    return c.res({
      image: `${imageGenerated}`,
      imageAspectRatio: '1:1',
      intents: [
        <TextInput placeholder="Enter Wallet Address..." />,
       // <Button value="Generate">ReGenerate</Button>,
        <Button value="Mint">Mint</Button>,
        // <Button.Transaction target="/mint">Mint</Button.Transaction>,
      ],
    })
  }

  if(buttonValue == "ReGenerate") {
    /* 
      ReGernerate AI Generative Art 
    */
    
      return c.res({
        action: "/picker",
        image: "",
        intents: [
          <TextInput placeholder="Enter custom prompt..." />,
          <Button value="Generate">Generate</Button>,
          // <Button value="Mint">Mint</Button>,
        ],
      })
  }

  if(buttonValue == "Mint") {
    /* 
      Mint NFT via API
    */
    console.log(inputText);
    const walletAddressToMint = inputText;
    await mint(walletAddressToMint);
    return c.res({
      image: "http://localhost:3000/minted.jpg",
      imageAspectRatio: '1:1',
      intents: [
        <TextInput placeholder="Enter custom prompt..." />,
        <Button value="ReGenerate">ReGenerate</Button>,
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

async function mint(walletAddressToMint: any) {
  console.log("hello mint initiating")
  console.log("walletAddressToMint: ", walletAddressToMint);
  const CONTRACT_ADDRESS = "0xAaa906c8C2720c50B69a5Ba54B44253Ea1001C98";
  const provider = new ethers.JsonRpcProvider("https://rpc.devnet.citrea.xyz");
  let CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
  //@ts-ignore
  const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


  let nonce = await provider.getTransactionCount("0xAaa906c8C2720c50B69a5Ba54B44253Ea1001C98");
  console.log('Current nonce:', nonce);
  console.log(Wallet.address);
  
  const payload = await CONTRACT.safeMint.populateTransaction(walletAddressToMint ,"https://github.com/mxber2022/Citrea_EncodeAI/blob/main/bridgeframe/public/cat.jpg" );
  const tx = {
    ...payload,
    nonce: 4,
    gasPrice:500000, 
    gasLimit: 1000000
  };
  const txResponse = await Wallet.sendTransaction(tx);
  console.log('Transaction hash:', txResponse.hash);
}

async function generateAI(inputText: any) {
  const OPENAI_API_KEY = process.env.OPENAI_KEY;
  console.log("inputText: ", inputText);
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: inputText,
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

    return "https://lavender-accused-lynx-424.mypinata.cloud/ipfs/QmZE41ttQvReF3L7NZqna77mK6SqcXLUEFobAjJieVVyeZ";
  }
  

}

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)

// minting address
//