"use client";
import React from "react";
import Card from "../../base/Card";
import Logo from "@/assets/images/logo.png";
import Button, { BUTTON_VARIANT } from "../../base/Button";
import Input from "../../base/Input";
import Image from "next/image";
import { ReactComponent as MetaMarkIcon } from "@/assets/icons/metamask.svg";
import Dropdown from "../../base/Dropdown";
import { useViewModel } from "./viewmodel";
import { useMetaMark } from "@/hooks/useMetaMark";

const FaucetCard = () => {
  const { connectWallet, walletAddress, faucetService, addTokenToList } =
    useMetaMark();
  const { options, selectedToken, setSelectedToken, remainsCount } =
    useViewModel(faucetService);
  return (
    <Card className="w-full max-w-[500px] flex flex-col items-center gap-y-6">
      <div className="relative w-[200px] h-8">
        <Image src={Logo} alt="logo" fill className="object-contains" />
      </div>
      <Input
        label="Network"
        readOnly
        className="w-full"
        defaultValue={"BSC Testnet"}
      />
      <div className="flex items-end gap-x-4 w-full">
        <Input
          label="Wallet Address"
          className="w-full"
          defaultValue={walletAddress}
          readOnly
        />
        <Button
          className="flex gap-x-4 items-center px-4"
          onClick={connectWallet}
        >
          <div className="size-2 bg-blue-500 rounded-full aspect-square" />
          <MetaMarkIcon className="size-6" />
        </Button>
      </div>
      <Dropdown options={options} onChange={(val) => setSelectedToken(val)} />
      <div className="flex items-end gap-x-4 w-full">
        <Input
          label="Remaining token"
          className="w-full"
          readOnly
          defaultValue={remainsCount || ""}
        />
        <Button
          className="flex gap-x-4 items-center px-4 whitespace-nowrap"
          variant={BUTTON_VARIANT.LINK}
          onClick={() => {
            selectedToken && addTokenToList(selectedToken?.value);
          }}
        >
          Add Token
        </Button>
      </div>
      <Button
        disabled={!walletAddress}
        className="w-full mt-[100px]"
        onClick={async () => {
          {
            selectedToken && faucetService?.requestToken(selectedToken.value);
          }
        }}
      >
        Give me 10 {selectedToken?.label || ""}
      </Button>
    </Card>
  );
};

export default FaucetCard;
