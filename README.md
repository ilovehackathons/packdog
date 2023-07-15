# Packdog xNFT

**[Go to xnft.gg to install.](https://www.xnft.gg/app/CjAThfNhKhPL7cdYuZn5UMVSDJD9ECT6AwvAbCQ6gLRX)** A [Chrome](https://chrome.com)-based browser with the [Backpack](https://backpack.app) extension installed is required.

This is an [xNFT](https://www.coral.community/post/wtf-are-xnfts) that lets you mint compressed [Solana](https://solana.com) mainnet NFTs from within [Backpack](https://backpack.app) for free! Choose a name for your NFT, specify the image URL and click _Mint_! Powered by [Underdog](https://underdogprotocol.com).

Built during the 2nd [Solana Weekend Hacks](https://de.superteam.fun/solana-weekend-hacks) hackathon at [w3.hub](https://www.w3.fund/#sec-hub) in Berlin on 15.07.2023 and 16.07.2023.

## Local development

1. (Install [pnpm](https://pnpm.io/installation).)
2. Clone the repo.
3. `cd` into it and run `pnpm i` to install the dependencies.
4. Run `pnpm dev` to start the app on port 9933.
5. (Install and set up the [Backpack](https://backpack.app) Chrome extension.)
6. In Backpack, click your avatar and go to Settings -> Preferences to enable Developer Mode. Click the back arrow and then the X to return to the home screen.
7. In Backpack, go to Applications (second tab) and open Simulator. You should see the app.
8. (Not working? You may need to change the port in [package.json](package.json) and restart the app.)

## Underdog

1. Get a mainnet Underdog API key.
2. `cp .env.example .env` and add the API key.

Then initialize a project with:

```
$ curl --request POST \
     --url https://api.underdogprotocol.com/v2/projects \
     --header 'accept: application/json' \
     --header 'authorization: Bearer PUT-YOUR-UNDERDOG-API-KEY-HERE' \
     --header 'content-type: application/json' \
     --data '
{
  "name": "Packdog",
  "image": "https://dev.updg8.com/imgdata/2WZMBfMsZoXoEYk6tTP35e31LKX1cApU73Y73mTePaQN",
  "compressed": true
}
'
```

The response should look similar to this:
```
{"transactionId":"79510d01-402c-43e0-ac8d-ac6015cb2279","projectId":4,"mintAddress":"J9NDvX1Crfy6ug4V4kHMX3HcTxk8Ban5u2udDGdtnC2N"}
```

You need the `projectId`! Update it accordingly in [pages/index.tsx](pages/index.tsx). (TODO: This should be in the `.env` file.)

## xnft.gg

If you have made changes to this xNFT and want to [publish them](https://xnft.gg/publish) as a new xNFT in the [xNFT Library](https://xnft.gg), follow these steps:

1. Deploy the app on [Vercel](https://vercel.com) and and get the URL (e.g. `https://packdog.vercel.app`).
2. Update the URL in [xnft.gg/xnft.json](xnft.gg/xnft.json). You can also change the name, description, etc. there.
3. Optionally, replace [xnft.gg/logo.png](xnft.gg/logo.png) with your own logo and [xnft.gg/screenshot.png](xnft.gg/screenshot.png) with your own screenshot.
4. Delete the existing [xnft.gg.zip](xnft.gg.zip) (`rm xnft.gg.zip`) and generate a new one by compressing the entire [xnft.gg](./xnft.gg) directory.
5. (Found your Backpack wallet with a small amount of mainnet SOL, e.g. 0.03.)
6. Upload the ZIP file on https://www.xnft.gg/publish. This will cost about 0.02 SOL.
7. Click the _Free_ button to install it in Backpack. This will cost about 0.002 SOL.
8. Join the [Backpack Discord server](https://discord.com/invite/backpack).
9. In the `#-dev-verify` channel (_Welcome_ section), react with the computer emoji to gain access to the developer channels.
10. In the `#appstore-submission-whitelist` (_Developers_ section) provide a link to your xNFT on xnft.gg and ask them to whitelist it.
11. Once it's whitelisted, go to _Applications_ (second tab) in Backpack and open your xNFT.

# Original README

## Builderz Solana xNFT Scaffold (Nextjs13, Typescript, TailwindCSS, MaterialUI, web3.js)

This is our open source [Next.js](https://nextjs.org/) , [Solana](https://github.com/solana-labs ) xNFT Backpack Scaffold for the community and whole ecosystem - without much fluff and just the essentials. 💪

Feel free to use it as a starting point for your next Solana project - we will and already use it for our developments.

Also feel free to send us feedback, open an issue or even PR and contribute by creating your own components, refactoring or other improvements.

The Scaffold has Material-UI v5 theme activated, detecting your devices preferred color scheme and ready to set with a dark/light mode schwitch in the AppBar.tsx.

We didn't want to include too much as from our experience we tend to delete most stuff we found in a scaffold.

You can find a preview below:

Responsive                     |  Desktop
:-------------------------:|:-------------------------:
![Builderz Scaffold Mobile](scaffold-mobile.png)  |  ![Builderz Scaffold Desktop](scaffold-desktop.png)

### Packages included and set up

- Nextjs13 ("old" folder structure using pages - we will release an "app" branch as soon as it's more stable)
- Typescript (tsconfig.json set up and ready to go)
- Material-UI (Dark/Light Mode, Preferred Mode, Switch in AppBar, layout.tsx as well as themes.tsx with predefined dark/light theme.s)
- react-dom ()
- Solana web3.js (Solana Wallet Adapter with auto detect of installed wallet extensions)
- TailwindCSS (set up and ready to go)
- Daisy-UI

Furthermore you will find a globals.css file with predefined settings. Next to the basics you mostly want to set, we also added pre-defined so called "fluid fonts" for all headings and body text. According to the values you tweak, your fonts will scale according to your device width and resolution.
This means you wont have to set any TailwindCSS fontSizes in your work unless you want something look different than it normally does.

You will also find the CSS for two variations of the Button styling, "glow" and "glow-on-hover" - just tweak them to your needs and add one of those classes to your buttons if you like.

### Feel free to use it as a starting point for your next Solana project

Also feel free to send us feedback, open an issue or even PR and contribute by creating your own components, refactoring or other improvements.

### Getting Started

Create a project using this example:

```bash
npm i or yarn install (we suggest npm though as the packages were installed with it)
```

```bash
remove .example from .env.example and add your RPC endpoint to NEXT_PUBLIC_HELIUS_URL=""  
```

```bash
npm run dev or yarn dev (same here depending on what you chose above)
```

```bash
npm run build or yarn build (production build)
```

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.
If you want to add a new page you just create another file in `pages` folder - we created a `basics.tsx` as an example for you, and also a `blog` folder for a dynamic routing example.

On `pages/_app.tsx`, you'll find `ThemeProvider` for light/dark mode, "ContextProvider", and "WalletProvider" wrapping your app, this is necessary for everything to work.

Although we are using Nextjs13 we are using the "old" folder structure as long as the "app" structure is in experimental mode.
We will add a `app-structure` branch as soon as its running more stable soon.

### Learn More

To learn more about Solana and Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Solana Documentation](https://docs.solana.com/) - learn about Solana features.
- [Anchor Language Book](https://book.anchor-lang.com/) - learn about Solana features.
- [Rust Anchor Documentation](https://docs.rs/anchor-lang/latest/anchor_lang/) - learn about Solana features.
- [Material-UI Getting Started](https://mui.com/material-ui/getting-started/overview/) - learn about Material-UI features.
- [TailwindCSS Documentation](https://tailwindcss.com/docs/guides/nextjs) - learn about TailwindCSS features.




You can check out [the Cynova GitHub organization](https://github.com/cynova-enterprise) - your feedback and contributions are welcome!

### Join our Discord

For any questions, suggestions, join our discord at [https://discord.gg/cynova-enterprise](https://discord.gg/cynova-enterprise).
