import React, { useState } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0xb2ea51BAa12C461327d12A2069d47b30e680b69D';
const ABI = [
    'function balanceOf(address account) public view returns (uint256)',
];
const WALLET_ADDRESS = '0x248Dd3836E2A8B56279C04addC2D11F3c2497836';

const BalanceOfButton = () => {
    const [title, setTitle] = useState('Buy 1 NFT to Gain Access');

    const fetchBalance = async () => {
        try {
            const provider = new ethers.JsonRpcProvider(
                'https://bsc-dataseed.binance.org/'
            );

            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                ABI,
                provider
            );

            const balance = await contract.balanceOf(WALLET_ADDRESS);
            const formattedBalance = ethers.formatUnits(balance, 18);
            setTitle(`${formattedBalance}`);
        } catch (error) {
            console.error('Error fetching balance:', error);
            setTitle('Error fetching balance');
        }
    };

    return <button onClick={fetchBalance}>{title}</button>;
};

export default BalanceOfButton;
