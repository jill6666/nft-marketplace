import { useState, useEffect, useRef } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Modal } from 'antd';
import { useBalance, useAccount, useReadContracts } from 'wagmi';
import abi from '@core/contractAbi.json';

const wagmigotchiContract = {
  address: '0xcb28749c24af4797808364d71d71539bc01e76d4',
  abi,
} as const;

const Home: NextPage = () => {
  const itemRef = useRef(null);
  const [next, setNext] = useState();
  const [nfts, setNfts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address } = useAccount();
  const balance = useBalance({ address, unit: 'ether' });
  const { data, status, error } = useReadContracts({ contracts: [wagmigotchiContract] });

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    console.log('data: ', { data, error });
  }, [status]);

  const init = async () => {
    const slug = 'basedpunks';
    const res = await fetch(`/api/listed?slug=${slug}&next=${next}`).then(res => res.json());
    const data = res;
    console.log(`${slug}: `, res);
    setNext(data?.next);
    setNfts(data?.nfts || []);
  };

  const handleOnClick = (props: any) => {
    itemRef.current = props;
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>OpenMeme, the largest NFT marketplace</title>
        <meta content="Generated by @rainbow-me/create-rainbowkit" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <nav className={styles.nav}>
        <h1 className={styles.title}>Rainbowkit Wallet</h1>
        <ConnectButton />
      </nav>
      <main className={styles.main}>
        
      </main>

      <footer className={styles.footer}>
        Nice to meet you 🌈
      </footer>
    </div>
  );
};

export default Home;
