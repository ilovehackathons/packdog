import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { toast } from "react-toastify";
import Head from "next/head";

import "react-toastify/dist/ReactToastify.css";
import { createUnderdogClient } from "@underdog-protocol/js";
import { useWallet } from "../hooks/useWallet";
import { useState } from "react";

if (typeof window !== 'undefined') {
  window.addEventListener('error', function (event) {
    console.log('Caught via addEventListener', event);
    // Here you could send the error information to an error tracking service
  });
}

const Home: NextPage = () => {
  // const notify = () =>
  //   toast("🦄 Wow so easy!");

  const mintNft = async () => {
    setMinting(true)
    console.log(`Minting ${name} (${url}) for ${base58}...`)

    const params = {
      // type: {
      //   transferable: false,
      //   compressed: true,
      // },
      projectId: 4,
    };

    try {
      const result = await underdogClient.createNft({
        params,
        body: {
          name: name?.length ? name : 'Packdog',
          image: url?.length ? url : 'https://dev.updg8.com/imgdata/2WZMBfMsZoXoEYk6tTP35e31LKX1cApU73Y73mTePaQN',
          upsert: true,
          receiverAddress: base58,
          attributes: {
            "Minter's wallet": 'https://backpack.app',
            "Minting API": 'https://underdogprotocol.com',
          }
        }
      })
      console.log('result', result)
      toast("The NFT is in your wallet!");
    } catch (e: any) {
      console.log('Error:', e)
      toast("Error: " + e?.message)
    }
    setUrl("")
    setName("")
    setMinting(false)
  }

  const underdogClient = createUnderdogClient({});
  const base58 = useWallet().publicKey?.toBase58()

  const [url, setUrl] = useState("")
  const [name, setName] = useState("")
  const [minting, setMinting] = useState(false)

  return (
    <>
      <Head>
        <title>Builderz xNFT Scaffold</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className="mockup-window border bg-inherit p-[1.25rem] mb-40 md:mb-0">
          <div className="flex flex-col justify-center p-2 bg-inherit gap-4">
            <div className={styles.iconContainer}>
              <a
                href="https://builderz.build"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <Image
                  // src="/builderz-white.svg"
                  src="/packdog.png"
                  height='160'
                  width='150'
                  priority
                  style={{
                    objectFit: "contain",
                  }}
                  alt="builderz"
                />
              </a>
              {/* <Image
                width={75}
                height={75}
                src="/favicon-32x32.png"
                className={styles.icon}
                alt="sol"
              /> */}
            </div>
            <h1 className={styles.h1}>Hello Solana, meet Packdog 👋</h1>
            <p style={{ fontSize: '0.8em', margin: 0, padding: 0 }}>
              Mint NFTs from within Backpack using <a href="https://underdogprotocol.com" target="_blank" rel="noopener" style={{ textDecoration: 'underline' }} className="text-blue-500">Underdog</a>.
            </p>
            <div className="flex flex-row gap-4 justify-around  items-center py-1">
              <input placeholder="NFT name" style={{ border: '1px solid #888', padding: 5, borderRadius: 5, width: '100%' }} onChange={e => setName(e.target.value)} value={name} />
            </div>
            <div className="flex flex-row gap-4 justify-around  items-center py-1">
              <input placeholder="Image URL" style={{ border: '1px solid #888', padding: 5, borderRadius: 5, width: '100%' }} onChange={e => setUrl(e.target.value)} value={url} />
            </div>
            <div className="flex flex-row gap-4 justify-around  items-center py-1">
              <button onClick={mintNft} className="btn" disabled={minting || !name.length || !url.length}>
                {minting ? 'Minting...' : 'Mint NFT'}
              </button>
              {/* <button onClick={notify} className="btn ">
                Notify!
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
