import { useEffect, useState } from "react";
import { first } from "lodash";
import { ethers } from "ethers";
import FaucetService from "@/services/faucet.service";

export const useMetaMark = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [faucetInstance, setFaucetInstance] = useState<FaucetService>();

  useEffect(() => {
    const providerInstance = new ethers.BrowserProvider(window.ethereum);
    const _faucetInstance = new FaucetService(providerInstance);
    _faucetInstance.init().then(() => {
      setFaucetInstance(_faucetInstance);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  const addTokenToList = async (tokenAddress: string) => {
    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(first(accounts) || "");
      } catch (err: any) {
        console.error(err.message);
      }
    } else {
      alert("please install MetaMark");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          setWalletAddress(first(accounts) || "");
        }
      } catch (err: any) {
        console.error(err.message);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setWalletAddress(first(accounts) || "");
      });
    } else {
      setWalletAddress("");
      alert("Please install MetaMask");
    }
  };

  useEffect(() => {
    addWalletListener();
    getCurrentWalletConnected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  return {
    connectWallet,
    walletAddress,
    faucetService: faucetInstance,
    addTokenToList,
  };
};
