import styles from 'styles/Verify.module.scss'
import Image from 'next/image'
import certificate from '../../../public/certificate.png'
import badge_background from '../../../public/badge_background.png'
import { auto } from '@popperjs/core'

export default function Verify() {
  return (
    <div>
      <Header></Header>
      <h2 className={styles.header}> Verify your Badge</h2>
      <div className=" grid grid-cols-12">
        <div className=" col-span-3"></div>
        <div className=" col-span-6">
          <form className="relative flex items-center">
            <label className="sr-only">Search</label>
            <div className=" w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                
              </div>
              <input
                type="text"
                id="simple-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter your token ID"
                data-ms-editor="true"
              ></input>
            </div>
            <button
              type="submit"
              className="ml-2 rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
