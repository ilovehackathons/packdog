import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { toast } from "react-toastify";
import Head from "next/head";
// import { AkordWallet } from "@akord/crypto";

import "react-toastify/dist/ReactToastify.css";
import { createUnderdogClient } from "@underdog-protocol/js";
import { useWallet } from "../hooks/useWallet";
import { useEffect, useState } from "react";
import { Akord, Auth } from '@akord/akord-js'

if (typeof window !== 'undefined') {
  window.addEventListener('error', function (event) {
    console.log('Caught via addEventListener', event);
    // Here you could send the error information to an error tracking service
  });
}

// TODO: Switch to App Router
// async function getAkordCredentials() {
//   return {
//     email: process.env.AKORD_EMAIL,
//     password: process.env.AKORD_PASSWORD,
//   }
// }

type AkordCreds = {
  email?: string,
  password?: string
}

const Home = () => {
  // TODO: Switch to App Router
  // const akordCreds = await getAkordCredentials()
  // console.log('akordCreds', akordCreds)

  const [akordCreds, setAkordCreds] = useState<AkordCreds>({})

  useEffect(() => {
    async function fetchAkordCreds() {
      setAkordCreds(await (await fetch('/api/akord')).json())
    }
    fetchAkordCreds()
  }, [])

  // useEffect(() => {
  //   console.log('akordCreds changed:', akordCreds)
  // }, [akordCreds])

  const mintNft = async () => {
    setMinting(true)
    console.log(`Minting ${name} (${url}) for ${base58}...`)

    const params = {
      // type: {
      //   transferable: false,
      //   compressed: true,
      // },
      projectId: 6,
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
  const [uploading, setUploading] = useState(false)
  // const [uploaded, setUploaded] = useState(false)
  const [waiting, setWaiting] = useState(false)

  const [akord, setAkord] = useState<Akord | null>()

  // console.log('process.env.AKORD_EMAIL', process.env.AKORD_EMAIL);

  // useEffect(() => {
  // async function initAkord() {
  //   console.log('signing in...')
  //   try {
  //     const { wallet } = await Auth.signIn(process.env.AKORD_EMAIL, process.env.AKORD_PASSWORD);
  //     console.log('wallet', wallet)
  //   } catch (e) {
  //     console.log('Error:', e)
  //   }
  //   // const akord = await Akord.init(wallet)
  //   // console.log('akord', akord)
  //   // setAkord(akord)
  // }

  // // Unauthorized [Error]: Invalid authorization header.
  // async function initAkordWithApiKey() {
  //   Auth.configure({ apiKey: process.env.AKORD_API_KEY })
  //   const wallet = await AkordWallet.importFromBackupPhrase(process.env.AKORD_BACKUP_PHRASE)
  //   const akord = await Akord.init(wallet, { apiKey: process.env.AKORD_API_KEY })
  //   console.log('akord', akord)
  //   setAkord(akord)
  // }

  // initAkord()
  // }, [])

  const handleUpload = async (files: FileList | null) => {
    // setUploaded(false)
    let a: Akord = akord!;
    if (!a) {
      // const { wallet } = await Auth.signIn(process.env.AKORD_EMAIL, process.env.AKORD_PASSWORD);
      const { wallet } = await Auth.signIn(akordCreds.email!, akordCreds.password!); // TODO
      const akord = await Akord.init(wallet)
      setAkord(akord)
      a = akord
      // throw new Error('Akord-js not initialized')
    }
    if (!files || !files.length) {
      throw new Error('Failed uploading the file')
    }
    setUploading(true)
    const file = files[0]
    let vaults = await a?.vault.list()

    if (!vaults.items || !vaults.items.length || vaults.items.length < 4) {
      // throw new Error('User does not have any vaults')
      await a.vault.create("Packdog", { public: true });
      vaults = await akord?.vault.list()!
    }
    const vault = vaults.items[0]
    console.log('vault', vault)
    // confirm("Uploading file to vault: " + vault.name)
    const stack = await a.stack.create(vault.id, file, file.name)

    // confirm("Created stack: " + stack.stackId)
    const host = `https://arweave.net`
    const arweaveId = stack.object.versions[0].resourceUri[0].replace('arweave:', '')
    const arweaveUrl = `${host}/${arweaveId}`
    console.log('Arweave URL', arweaveUrl)
    // setAkord(null)
    setUrl(arweaveUrl)

    setUploading(false)

    setWaiting(true)
    setTimeout(() => {
      setWaiting(false)
      // setUploaded(true)
    }, 1000 * 60);
  }

  return (
    <>
      <Head>
        <title>Packdog xNFT</title>
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
            {/* <h1 className={styles.h1}>Hello Solana, meet Packdog 👋</h1> */}
            <p style={{ fontSize: '0.8em', margin: 0, padding: 0 }}>
              Mint NFTs from within Backpack using <a href="https://underdogprotocol.com" target="_blank" rel="noopener" style={{ textDecoration: 'underline' }} className="text-blue-500">Underdog</a>.
            </p>
            <div className="flex flex-row gap-4 justify-around  items-center py-1">
              <input placeholder="NFT name" style={{ border: '1px solid #888', padding: 5, borderRadius: 5, width: '100%' }} onChange={e => setName(e.target.value)} value={name} />
            </div>
            <div className="flex flex-row gap-4 justify-around  items-center py-1">
              <input
                type="file"
                onChange={(e) => handleUpload(e.target.files)}
              />
            </div>
            <div className="flex flex-row gap-4 justify-around  items-center py-1">
              <input placeholder="Image URL" style={{ border: '1px solid #888', padding: 5, borderRadius: 5, width: '100%' }} onChange={e => setUrl(e.target.value)} value={url} />
              <a href={url} target="_blank" rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
            <div className="flex flex-row gap-4 justify-around  items-center py-1">
              <button onClick={mintNft} className="btn" disabled={minting || !name.length || !url.length}>
                {minting ? 'Minting...' : uploading ? 'Uploading to Arweave...' : waiting ? 'Waiting 1 minute...' : 'Mint NFT'}
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
