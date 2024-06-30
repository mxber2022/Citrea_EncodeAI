# AiCitrea
 
Farcaster Frame to generative art and mint on Citrea Blockchain.

Contract Address: 0xAaa906c8C2720c50B69a5Ba54B44253Ea1001C98

# Farcaster Frame: Generative Art and NFT Minting

AiCitrea is a project that combines the power of generative art with blockchain technology to create and mint unique NFTs on the Citera blockchain. This repository provides the necessary tools and infrastructure to generate art using the OpenAI API and seamlessly mint it as NFTs.

## Features

- **Generative Art Generation:** Utilize the OpenAI API to generate unique pieces of generative art based on predefined parameters or training data.
- **NFT Minting:** Automatically mint generated artwork as NFTs on the Citera blockchain, ensuring each piece is unique and verifiable.
- **Customizable Parameters:** Fine-tune art generation parameters to produce a wide variety of styles and outputs.
- **Blockchain Integration:** Connect with Citera blockchain APIs to handle NFT metadata creation and minting directly from the application.

## Installation

To install and run Farcaster Frame locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mxber2022/Citrea_EncodeAI
   cd Citrea_EncodeAI
   cd bridgeframe
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Rename `.env.example` to `.env` and configure the following variables:

   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   CITERA_API_KEY=your_citera_api_key
   ```

   Replace `your_openai_api_key` with your OpenAI API key and `your_citera_api_key` with your Citera blockchain API key.

4. **Start the application:**

   ```bash
   yarn start
   ```

   This will start the application locally.

## Usage

1. **Generate Artwork:**

   Use the provided scripts to generate generative art using the OpenAI API. Adjust parameters as needed in the scripts.

2. **Mint NFTs:**

   Once artwork is generated, use the Citera blockchain integration to mint NFTs. Ensure proper metadata is created and linked correctly.

3. **Manage NFTs:**

   Implement additional features for managing minted NFTs such as viewing, selling, or transferring ownership.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major updates, please open an issue first to discuss potential changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing powerful APIs for generative models.
- Citera for blockchain infrastructure and NFT minting capabilities.
- Contributors and open-source community for feedback and suggestions.
