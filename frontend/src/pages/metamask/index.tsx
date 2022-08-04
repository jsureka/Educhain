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
import Image from 'next/image';
import Navbar from 'components/navbar/navbar'

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
        <Navbar></Navbar>
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
                <div className={styles.ConnectButton}>
                    <div className={styles.metamaskIcon}>
                        <Image src={image}></Image>
                    </div>
                    <div className="flex w-full flex-col items-center">
                        {!isConnected && <button onClick={openConnectModal}
                            type="button"
                            className={styles.connectWallet}>
                            CONNECT
                        </button>}
                        {isConnected && <button onClick={openConnectModal}
                            type="button"
                            className={styles.connectedWallet}>
                            CONNECTED
                        </button>}

                    </div>
                </div>

                <div className='col-span-2'></div>
                <div className='col-span-5'>
                    <div className={styles.walletInfo}>
                        <div className={styles.dl}>
                            <div className={styles.connectorNetworkBoth}>
                                <div className={styles.connector}>
                                    <dt>Connector</dt>
                                    <dd>
                                        {connector?.name}
                                        {!address && (
                                            <ConnectButton.Custom>
                                                {({ openConnectModal }) => (
                                                    <span onClick={openConnectModal} className="cursor-pointer hover:underline">
                                                        Not connected
                                                    </span>
                                                )}
                                            </ConnectButton.Custom>
                                        )}
                                    </dd>
                                </div>
                                <div className={styles.network}>
                                    <dt>Connected Network</dt>
                                    <dd>{chain ? `${chain?.id}: ${chain?.name}` : 'n/a'}</dd>
                                </div>
                            </div>
                            <div className={styles.switch}>
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
                            </div>
                            <div className={styles.accbalance}>
                                <div className={styles.account}>
                                    <dt>Account</dt>
                                    <dd className={styles.accbalanceInfo}>{address ? `${address}` : 'n/a'}</dd>
                                </div>
                                <div className={styles.balance}>
                                    <dt>Balance</dt>
                                    <dd className={styles.accbalanceInfo}>
                                        {isBalanceLoading ? 'loading' : balance ? `${balance?.formatted} ${balance?.symbol}` : 'n/a'}
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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

