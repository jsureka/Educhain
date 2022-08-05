import Image from 'next/image'
import { ethers } from 'ethers'
import styles from 'styles/Course.module.scss'
import Navbar from 'components/navbar/navbar'
import image from '../../../public/quizButton.png'
import data from '../../info/data.json'
import { Greeter__factory } from '../../typechain'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import router from 'next/router'
export default function Course() {
  let contract
  const { address, isConnected, connector } = useAccount()
  const [isEnrolled, setIsEnrolled] = useState(false)
    const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
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
  async function getStudent() {
    checkIfWalletIsConnected()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    contract = Greeter__factory.connect(data.contractAddress, signer)
    let tx = await contract.getStudent()
    console.log(tx)
    if (tx) {
      if (tx.from === address) {
        setIsEnrolled(true);
        setCurrentCheckpoint(tx.currentCheckpoints.toNumber());
      }
    }
  }
  async function onEnroll() {
    checkIfWalletIsConnected()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    contract = Greeter__factory.connect(data.contractAddress, signer)
    let tx = await contract.putStake(1, { value: 10000000000000 })
    let receipt = await tx.wait()
    console.log(receipt)
    if (receipt) {
      setIsEnrolled(true)
    }
  }

  function ontakeQuiz(){
    router.push('/quiz');
  }
  useEffect(() => {
    checkIfWalletIsConnected();
    getStudent()
  }, [])

  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.bgcolor}>
        <div className={styles.course}>
          <h1>
            Learn <br /> Blockchain
          </h1>
          {!isEnrolled && (
            <button className={styles.enrollButton} onClick={onEnroll}>
              Enroll
            </button>
          )}
          {isEnrolled && <button className={styles.enrolledButton}>Enrolled</button>}
        </div>
        <div className={styles.answers}>
          <div className="grid grid-cols-12 gap-2">
            <div className={styles.lesson}>
              LESSON
              <div className={styles.lessonNum}>1</div>
            </div>
            <div className={styles.lessonDetails}>
              Learn about Alchemy's Road to Web3 series, a 10 week, self-paced Web3 developer program to help new
              blockchain devs go from beginner to advanced.
            </div>
            {isEnrolled && (currentCheckpoint === 0) && (
              <div className={styles.takeorquiz}>
                <button className={styles.take}>
                  VIEW LESSON
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.arrow}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button className={styles.quiz} onClick={ontakeQuiz}>
                  TAKE QUIZ
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.arrow}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            )}
             {(currentCheckpoint > 0) && <p>Completed</p>}
          </div>
          <hr className={styles.hr}></hr>
          <div className="grid grid-cols-12 gap-2">
            <div className={styles.lesson}>
              LESSON
              <div className={styles.lessonNum}>2</div>
            </div>
            <div className={styles.lessonDetails}>
              Buy me a coffee is a popular website that all kinds of people use to create a landing page where anyone
              can send some amount of money.
            </div>
            {isEnrolled && (currentCheckpoint === 1) && (
              <div className={styles.takeorquiz}>
                <button className={styles.take}>
                  VIEW LESSON
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.arrow}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button className={styles.quiz} onClick={ontakeQuiz}>
                  TAKE QUIZ
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.arrow}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            )}
            {(currentCheckpoint < 1) && <p>Locked</p>}
            {(currentCheckpoint > 1) && <p>Completed</p>}


          </div>
          <hr className={styles.hr}></hr>
          <div className="grid grid-cols-12 gap-2">
            <div className={styles.lesson}>
              LESSON
              <div className={styles.lessonNum}>3</div>
            </div>
            <div className={styles.lessonDetails}>
              Make a NFT on chain is a basic of blockchain game that drastically reduce gas cost. Make one of your own
              today!
            </div>
            {isEnrolled && (currentCheckpoint === 2) && (
              <div className={styles.takeorquiz}onClick={ontakeQuiz}>
                <button className={styles.take}>
                  VIEW LESSON
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.arrow}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button className={styles.quiz}>
                  TAKE QUIZ
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.arrow}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            )}
            {(currentCheckpoint < 2) && <p>Locked</p>}
            {(currentCheckpoint > 2) && <p>Completed</p>}

          </div>
          <hr className={styles.hr}></hr>
          <div className="grid grid-cols-12 gap-2">
            <div className={styles.lesson}>
              LESSON
              <div className={styles.lessonNum}>4</div>
            </div>
            <div className={styles.lessonDetails}>
              In this tutorial, we are going to learn how to use the Alchemy NFT API to build an NFT gallery. So let's
              start now.
            </div>
            {isEnrolled && (currentCheckpoint === 3) &&(
              <div className={styles.takeorquiz}>
                <button className={styles.take}>
                  VIEW LESSON
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.arrow}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button className={styles.quiz} onClick={ontakeQuiz}>
                  TAKE QUIZ
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.arrow}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            )}
             {(currentCheckpoint < 3) && <p>Locked</p>}
             {(currentCheckpoint > 3) && <p>Completed</p>}


          </div>
        </div>
      </div>
    </div>
  )
}
