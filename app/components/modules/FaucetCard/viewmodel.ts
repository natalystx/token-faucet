import { REQUIRED_TO_IMPLEMENT_FAUCET_TOKEN_ADDRESSES } from "@/addresses";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Option } from "../../base/Dropdown/viewmodel";
import FaucetService from "@/services/faucet.service";

export const useViewModel = (faucetService?: FaucetService) => {
  const [selectedToken, setSelectedToken] = useState<Option | undefined>();
  const [remainsCount, setRemainCount] = useState(0);

  const options = useMemo(
    () =>
      REQUIRED_TO_IMPLEMENT_FAUCET_TOKEN_ADDRESSES.map(
        ({ address, symbol }) => ({
          value: address,
          label: symbol,
        })
      ),
    []
  );

  const getTokenRemains = useCallback(
    async (tokenAddress: string) => {
      const remainsCount = await faucetService?.getTokenBalance(tokenAddress);
      setRemainCount(Number(remainsCount));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedToken?.value, faucetService]
  );

  useEffect(() => {
    if (selectedToken?.value && faucetService) {
      getTokenRemains(selectedToken.value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedToken?.value, faucetService]);

  return {
    options,
    selectedToken,
    setSelectedToken,
    remainsCount,
  };
};
