import styles from 'styles/Metamask.module.scss';
import data from '../../info/data.json';
import { ethers } from 'ethers'
import ThemeToggleButton from 'components/Theme/ThemeToggleButton'
import ThemeToggleList from 'components/Theme/ThemeToggleList'
import { useState, useEffect } from 'react'
import { useNetwork, useSwitchNetwork, useAccount, useBalance } from 'wagmi'
import ConnectWallet from 'components/Connect/ConnectWallet'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit'
import { useSignMessage } from 'wagmi'
// import GreeterArtifact from '../../../artifacts/contracts/Greeter.sol/Greeter.json';
import { Greeter__factory } from '../../typechain';
import image from '../../../public/metamask.png'
import Image from 'next/image'

export default function Metamask() {
    return (
        <div className={styles.container}>
            <Header />
            <Main />
        </div>
    )
}

function Header() {
    return (
        <header >
            <div className={styles.heading}>
                <h1 className={styles.appName}>EduChain</h1>
            </div>
        </header>
    )
}

function Main() {
    const [showAlert, setShowAlert] = useState(false);
    const [txHash, setTxHash] = useState("");

    // greeter.greet
    const [greet, setgreet] = useState("Hi");
    const [currentValue, setCurrentValue] = useState("");

    let contract;


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

        console.log(await contract.greet());
        setgreet(await contract.greet() as string);
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])
    console.log(data.contractAddress);

    async function setGreetings(evt) {
        evt.preventDefault();

        checkIfWalletIsConnected();
        console.log("Set greeting");

        console.log("Set method:");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        contract = Greeter__factory.connect(data.contractAddress, signer);
        let tx = await contract.setGreeting(currentValue.toString(), { from: signer.getAddress(), gasLimit: 200000, value: 10000000000000 });
        let reciept = await tx.wait();
        console.log(reciept);
        setTxHash(reciept.transactionHash);
        setShowAlert(true);
        setgreet(await contract.greet());
    }

    function handleChange(evt) {
        console.log(evt.currentTarget.value);

        setCurrentValue(evt.currentTarget.value);
    }


    const { address, isConnected, connector } = useAccount()
    const { chain, chains } = useNetwork()
    const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
    const { data: balance, isLoading: isBalanceLoading } = useBalance({
        addressOrName: address,
    })

    const { openConnectModal } = useConnectModal()

    return (
        <main className={styles.main + ' space-y-2'}>
            <div className="grid grid-cols-12 gap-2">
                <div className='col-span-4'>
                    <div className={styles.metamaskIcon}>
                        <Image src={image}></Image>
                    </div>
                    <div className="flex w-full flex-col items-center">
                        <button onClick={openConnectModal}
                            type="button"
                            className={styles.connectWallet}>
                            CONNECT
                        </button>
                    </div>
                </div>
                <div className='col-span-2'></div>
                <div className='col-span-5'>
                    <div className={styles.walletInfo}>
                        <div className={styles.dl}>
                            <dt>Connector</dt>
                            <dd>
                                {connector?.name}
                                {!address && (
                                    <ConnectButton.Custom>
                                        {({ openConnectModal }) => (
                                            <span onClick={openConnectModal} className="cursor-pointer hover:underline">
                                                Not connected, connect wallet
                                            </span>
                                        )}
                                    </ConnectButton.Custom>
                                )}
                            </dd>
                            <dt>Connected Network</dt>
                            <dd>{chain ? `${chain?.id}: ${chain?.name}` : 'n/a'}</dd>
                            <dt>Switch Network</dt>
                            <dd className="flex flex-wrap justify-center">
                                {isConnected &&
                                    chains.map(x => (
                                        <button
                                            disabled={!switchNetwork || x.id === chain?.id}
                                            key={x.id}
                                            onClick={() => switchNetwork?.(x.id)}
                                            className={
                                                (x.id === chain?.id ? 'bg-green-500' : 'bg-blue-500 hover:scale-105') +
                                                ' m-1 rounded-lg py-1 px-3 text-white transition-all duration-150'
                                            }
                                        >
                                            {x.name}
                                            {isNetworkLoading && pendingChainId === x.id && ' (switching)'}
                                        </button>
                                    ))}
                                <ConnectWallet show="disconnected" />
                            </dd>
                            <dt>Account</dt>
                            <dd className="break-all">{address ? `${address}` : 'n/a'}</dd>
                            <dt>Balance</dt>
                            <dd className="break-all">
                                {isBalanceLoading ? 'loading' : balance ? `${balance?.formatted} ${balance?.symbol}` : 'n/a'}
                            </dd>
                        </div>
                    </div>
                </div>
            </div>


            {showAlert ? (
                <div
                    className={
                        "text-white px-6 py-4 border-0 rounded relative mb-4 bg-teal-500 sticky top-0 z-50"
                    }
                >
                    <span className="text-xl inline-block mr-5 align-middle">
                        <i className="fas fa-bell" />
                    </span>
                    <span className="inline-block align-middle mr-8">
                        <b className="capitalize">Transaction succeded!</b> View on etherscan:
                        <a href={"https://rinkeby.etherscan.io/tx/" + txHash} target="_blank" className="underline italic"> Etherscan Link</a>

                    </span>
                    <button
                        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                        onClick={() => setShowAlert(false)}
                    >
                        <span>×</span>
                    </button>
                </div>
            ) : null}
            {address && (

                <div className='flex items-center justify-center min-h-screen from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br w-screen'>


                    <div className="flex flex-col items-center justify-center relative">

                        <div
                            id="partnerCard"
                            className="bg-[#1c1c1c] text-gray-50 overflow-hidden rounded-md max-w-m p-2 min-h-[500px] flex flex-col"
                        >
                            <div>
                                <h3 className="text-left pl-8 pb-4 pt-2 text-xl">
                                    Greeting App
                                </h3>
                            </div>

                            <div className="flex items-center justify-center bg-[#2a2a2a] min-h-[200px]">


                                <img
                                    src="https://media.istockphoto.com/photos/hand-is-turning-a-dice-and-changes-the-word-meet-to-greet-picture-id1084115310?k=20&m=1084115310&s=612x612&w=0&h=TwrnLk7i0jdfixAxbJdd8_LF9ZOnkvM-1DGn-_VELHA="
                                    alt="EasyCode"
                                    className="w-100 object-cover"
                                />

                            </div>
                            <div className="grid grid-cols-6">
                                <div className="p-4 pr-0 text-lg col-span-4">
                                    <h4 className="font-bold">
                                        Current Greetings:
                                    </h4>

                                    <p>{greet}</p>
                                </div>

                            </div>
                            <div>
                                <form className="m-4 flex">
                                    <input value={currentValue}
                                        onChange={(evt) => handleChange(evt)}
                                        className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" placeholder="Enter new greet" />
                                    <button
                                        onClick={setGreetings}
                                        className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">Set Greet</button>
                                </form>
                            </div>

                        </div>

                    </div>
                </div>
            )


            }
        </main>
    )
}

function SignMsg() {
    const [msg, setMsg] = useState('Dapp Starter')

    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
        message: msg,
    })
    const signMsg = () => {
        if (msg) {
            signMessage()
        }
    }

    return (
        <>
            <p>
                <input value={msg} onChange={e => setMsg(e.target.value)} className="rounded-lg p-1" />
                <button
                    disabled={isLoading}
                    onClick={() => signMsg()}
                    className="ml-1 rounded-lg bg-blue-500 py-1 px-2 text-white transition-all duration-150 hover:scale-105"
                >
                    Sign
                </button>
            </p>
            <p>
                {isSuccess && <span>Signature: {data}</span>}
                {isError && <span>Error signing message</span>}
            </p>
        </>
    )
}

function addressOrName(address: string, addressOrName: any) {
    throw new Error('Function not implemented.');
}

