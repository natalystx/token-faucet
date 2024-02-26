import { abi } from "@/abi/abi";
import { JsonRpcSigner } from "ethers";
import { Contract, ethers } from "ethers";

export default class FaucetService {
  private _contract!: Contract;
  private _signer!: JsonRpcSigner;
  private _provider: ethers.BrowserProvider;

  constructor(provider: ethers.BrowserProvider) {
    this._provider = provider;
  }

  async init() {
    await this.getSigner(this._provider);
  }

  private async getSigner(provider: ethers.BrowserProvider) {
    const signer = await provider.getSigner();
    this._signer = signer;
    this._contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_FAUCET_TOKEN_ADDRESSES || "",
      abi,
      signer
    );
  }

  async requestToken(tokenAddress: string) {
    if (!this._signer) return;
    try {
      const transaction = await this._contract?.requestToken(tokenAddress);
      await transaction.wait();
      return transaction.hash;
    } catch (error: any) {
      console.error("Error requesting token:", error.message);
    }
  }

  async setCooldown(cooldown: number) {
    try {
      const transaction = await this._contract.setCooldown(cooldown);
      await transaction.wait();

      return transaction.hash;
    } catch (error) {
      throw error;
    }
  }

  async setTokenRequestPerRound(tokenAddress: string, amount: number) {
    try {
      const transaction = await this._contract.setTokenRequestPerRound(
        tokenAddress,
        amount
      );
      await transaction.wait();

      return transaction.hash;
    } catch (error) {
      throw error;
    }
  }

  async transferOwnership(newOwner: string) {
    try {
      const transaction = await this._contract.transferOwnership(newOwner);
      await transaction.wait();

      return transaction;
    } catch (error) {
      throw error;
    }
  }

  async renounceOwnership() {
    try {
      const transaction = await this._contract.renounceOwnership();
      await transaction.wait();

      return transaction.hash;
    } catch (error) {
      throw error;
    }
  }

  async getTokenBalance(address: string) {
    try {
      const transaction = await this._contract.getTokenBalance(address);

      return transaction;
    } catch (error) {
      throw error;
    }
  }
}
