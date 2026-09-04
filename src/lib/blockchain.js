import { ethers } from 'ethers';

const contractAddress = '0x556104573f25F6459c6f983b748eACdC885cF219';

const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "ngoId", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "listingId", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "ClaimLogged",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "ngoId", "type": "string" },
      { "internalType": "string", "name": "listingId", "type": "string" }
    ],
    "name": "logClaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export async function logClaimOnChain(ngoId, listingId) {
  if (!window.ethereum) {
    console.warn('MetaMask not found — skipping on-chain log.');
    return;
  }
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.logClaim(String(ngoId), String(listingId));
    await tx.wait();
    console.log('Claim logged on-chain:', tx.hash);
  } catch (err) {
    console.error('Blockchain logging failed:', err);
  }
}