/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

//@ts-ignore

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue

  return c.res({
    action: "/picker",
    image: "",
    intents: [
      <TextInput placeholder="Enter custom prompt..." />,
      <Button value="Generate">Generate</Button>,
      <Button value="Mint">Mint</Button>,
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
        <Button value="Generate">Generate</Button>,
        <Button value="Mint">Mint</Button>,
      ],
    })
  }

  if(buttonValue == "Mint") {
    
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


devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
