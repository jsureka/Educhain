import styles from 'styles/Verify.module.scss'
import Navbar from 'components/navbar/navbar'
import data from '../../info/data.json'
import Image from 'next/image'
import certificate from '../../../public/certificate.png'
import badge_background from '../../../public/badge_background.png'
import { auto } from '@popperjs/core'
import { useState, useEffect } from 'react'
import { Greeter__factory } from '../../typechain'
import { BigNumber, ethers } from 'ethers'
export default function Verify() {
  const [inputToken, setInputToken] = useState(0)
  let contract
  
  async function checkIfWalletIsConnected() {
    const { ethereum } = window
    if (ethereum) {
      console.log('Got the ethereum obejct: ', ethereum)
    } else {
      console.log('No Wallet found. Connect Wallet')
    }
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    contract = Greeter__factory.connect(data.contractAddress, signer);
    console.log("Get method:");

    console.log(contract);
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  console.log(data.contractAddress);

  async function onTokenSubmit(e) {
    e.preventDefault()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    contract = Greeter__factory.connect(data.contractAddress, signer)
    let tx = await contract.ownerOf(inputToken)
 //   let reciept = await tx.wait()
  }
  return (
    <div>
      <Navbar></Navbar>
      <h2 className={styles.header}> Verify your Badge</h2>
      <div className=" grid grid-cols-12">
        <div className=" col-span-3"></div>
        <div className=" col-span-6">
          <form className="relative flex items-center">
            <label className="sr-only">Search</label>
            <div className=" w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <input
                value={inputToken}
                onChange={e => setInputToken(e.target.value)}
                type="number"
                id="simple-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter your token ID"
                data-ms-editor="true"
              ></input>
            </div>
            <button
              type="submit"
              className="ml-2 rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={onTokenSubmit}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
        <div className=" col-span-3"></div>
      </div>
      <div className=" grid grid-cols-12">
        <div className=" col-span-2"></div>
        <div className={styles.image1}>
          <Image src={certificate} width={700} height={500}></Image>
        </div>

        <div className={styles.image2}>
          <h1>Your Name</h1>
          <h4>TimeStamp</h4>
        </div>
        <div className=" col-span-2"></div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header>
      <div className={styles.heading}>
        <h1 className={styles.appName}>EduChain</h1>
      </div>
    </header>
  )
}
