import Link from 'next/link';
import { useState } from 'react';
import styles from 'styles/Navbar.module.scss';
import Navbar from 'components/navbar/navbar';

// export const Navbar = () => {
  
  
export default function Navbar() {

    const [active, setActive] = useState(false);

    const handleClick = () => {
      setActive(!active);
    };
  
    return (
        <Navbar></Navbar>
    <>
      <nav className={styles.big}>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4 '>
            <span className='text-xl text-white font-bold tracking-wide'>
              EduChain
            </span>
          </a>
        </Link>
        <button
          className=' inline-flex p-3 lg:hidden text-white ml-auto hover:text-white outline-none'
          onClick={handleClick}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? '' : 'hidden'
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
            <Link href='/'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center transform motion-safe:hover:scale-110 hover:text-white '>
                Home
              </a>
            </Link>
            <Link href='/metamask'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center transform motion-safe:hover:scale-110 hover:text-white'>
                Wallet
              </a>
            </Link>
            <Link href='/verify'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center transform motion-safe:hover:scale-110 hover:text-white'>
                Verify Certificate
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};