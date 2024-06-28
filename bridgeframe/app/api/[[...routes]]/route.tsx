/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { parseEther } from 'frog'

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

app.frame('/picker', (c) => {
  const { buttonValue, inputText, status } = c
  console.log("buttonValue: ", buttonValue);
  console.log("inputText: ", inputText);

  if(buttonValue == "Generate") {
    /* 
      Gernerate AI Generative Art 
    */
    return c.res({
      image: "https://azure-worried-landfowl-942.mypinata.cloud/ipfs/QmVj3zPGA4EUNgMWSA1yzmBHCtnd7R4crBVUex5vQRLurm/Frame_outline-min.jpg",
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

app.transaction('/mint', (c) => {
  const { inputText } = c
  // Contract transaction response.
  return c.contract({
    abi,
    functionName: 'mint',
    //@ts-ignore
    args: [69420n],
    chainId: 'eip155:10',
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    //@ts-ignore
    value: parseEther(inputText)
  })
})


devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
