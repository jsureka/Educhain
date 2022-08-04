import Image from 'next/image'
import styles from 'styles/Quiz.module.scss'
import router from 'next/router'
import Navbar from 'components/navbar/navbar'
import image from '../../../public/quizButton.png'
import certificate from '../../../public/certificate.png'
import data from '../../info/data.json'
import { ethers } from 'ethers'
import { Greeter__factory } from '../../typechain'
import { useState, useEffect } from 'react'
import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import * as fs from 'fs'
import path from 'path'
import { useAccount } from 'wagmi'
const NFT_STORAGE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGMzODg0NzdBRTg1Mzk2NkUwNkJkYjMyNzI2QzAwMjlCZDE4RjUwZTEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1OTY1NjczMzQ0MCwibmFtZSI6ImJ1ZXRfaGFja2F0aG9uIn0.SV-X1asM8PJrB6HCxdQxZgANMw-3EEG-nfI-Fe6UVS8'
export default function Quiz() {
  const { address, isConnected, connector } = useAccount()
  const [showAlert, setShowAlert] = useState(false)
  const [successAlert, setSuccessAlert] = useState(false)
  let contract
  async function storeNFT(imagePath, name, description) {
    // load the file from disk
    const image = await fileFromPath(imagePath)

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    return nftstorage.store({
      image,
      name,
      description,
    })
  }

  async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
  }

  async function checkIfWalletIsConnected() {
    const { ethereum } = window
    if (ethereum) {
      console.log('Got the ethereum obejct: ', ethereum)
    } else {
      console.log('No Wallet found. Connect Wallet')
    }
    await window.ethereum.enable()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    contract = Greeter__factory.connect(data.contractAddress, signer)
    console.log(contract)
  }




  async function transferValue() {
    checkIfWalletIsConnected()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    contract = Greeter__factory.connect(data.contractAddress, signer)
    let tx = await contract.transferValue()
    let reciept = await tx.wait()
    console.log(reciept);
    //console.log(tx);
    if (reciept) {
       // const result = await storeNFT('certificate.png', "Anonymous",Date.now().toString())
            // let tx = await contract.safeMint(address, "Certified Student");
            // let reciept = await tx.wait();
            // console.log(reciept)
            router.push('/course');
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  function checkAnswer(answer) {
    if (answer !== 4) {
      setShowAlert(true)
    } else {
      setSuccessAlert(true)
      transferValue()
    }
  }
  return (
    <div>
      <Navbar></Navbar>
      {showAlert && (
        <div className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700" role="alert">
          <strong className="font-bold">Wrong Answer!</strong>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="h-6 w-6 fill-current text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={e => {
                setShowAlert(false)
              }}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      {successAlert && (
        <div className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
          <strong className="font-bold">Correct Answer!</strong>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="h-6 w-6 fill-current text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={e => {
                setSuccessAlert(false)
              }}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      <div className={styles.bgcolor}>
        <div className={styles.heading}>
          <h1 className={styles.appName}>Take your time! Complete the Quiz</h1>
        </div>
        <div className={styles.ques}>
          <h1>Chlorine atom forms -</h1>
        </div>
        <div className={styles.answers}>
          <div className="grid grid-cols-2 gap-2">
            <div
              className={styles.optionsL}
              onClick={e => {
                checkAnswer(1)
              }}
            >
              <h1 className={styles.singleOptionL}>Covalent bond with Hydrogen</h1>
            </div>
            <div
              className={styles.optionsR}
              onClick={e => {
                checkAnswer(2)
              }}
            >
              <h1 className={styles.singleOptionR}>Ionic bond with Calcium</h1>
            </div>
            <div
              className={styles.optionsL}
              onClick={e => {
                checkAnswer(3)
              }}
            >
              <h1 className={styles.singleOptionL}>Ionic bond with Carbon</h1>
            </div>
            <div
              className={styles.optionsR}
              onClick={e => {
                checkAnswer(4)
              }}
            >
              <h1 className={styles.singleOptionR}>Both A and B</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
