import { useAccount, useBalance, useReadContract } from "wagmi";
import { formatUnits } from "viem";

// KNET Token 配置
export const KNET_TOKEN_ADDRESS = "0x8b24bf9fe8bb1d4d9dea81eebc9fed6f0fc67a46" as const;

export const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8" }],
  },
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
  },
] as const;

/**
 * 获取原生代币余额的 Hook (如 BNB, ETH 等)
 * @param address - 钱包地址
 * @returns 原生代币余额信息和格式化后的余额
 */
export function useNativeBalance(address?: `0x${string}`) {
  const { data: balance, refetch: refetchBalance } = useBalance({
    address,
    watch: true,
  });

  const formattedBalance = balance ? parseFloat(formatUnits(balance.value, balance.decimals)) : 0;

  return {
    balance,
    formattedBalance,
    refetchBalance,
  };
}

/**
 * 获取 ERC20 代币余额的 Hook
 * @param tokenAddress - 代币合约地址
 * @param address - 钱包地址
 * @returns ERC20 代币余额信息和格式化后的余额
 */
export function useERC20Balance(
  tokenAddress: `0x${string}`,
  address?: `0x${string}`
) {
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    watch: true,
  });

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "decimals",
  });

  const formattedBalance = balance && decimals ? parseFloat(formatUnits(balance as bigint, decimals)) : 0;

  return {
    balance,
    decimals,
    formattedBalance,
    refetchBalance,
  };
}

/**
 * 获取 KNET 代币余额的 Hook
 * @param address - 钱包地址
 * @returns KNET 代币余额信息
 */
export function useKnetBalance(address?: `0x${string}`) {
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: KNET_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    watch: true,
  });

  const { data: decimals } = useReadContract({
    address: KNET_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "decimals",
  });

  const formattedBalance = balance && decimals ? parseFloat(formatUnits(balance as bigint, decimals)) : 0;

  return {
    balance,
    decimals,
    formattedBalance,
    refetchBalance,
  };
}

/**
 * 综合余额 Hook - 同时获取原生代币和 KNET 代币余额
 * @returns 所有余额信息
 */
export function useAllBalances() {
  const { address } = useAccount();

  // 获取原生代币余额 (BNB)
  const { balance: bnbBalance, formattedBalance: formattedBnbBalance } = useNativeBalance(address);

  // 获取 KNET 代币余额
  const { balance: knetBalance, decimals: knetDecimals, formattedBalance: formattedKnetBalance, refetchBalance: refetchKnetBalance } = useKnetBalance(address);

  return {
    // 原生代币 (BNB)
    bnbBalance,
    formattedBnbBalance,

    // KNET 代币
    knetBalance,
    knetDecimals,
    formattedKnetBalance,
    refetchKnetBalance,

    // 地址信息
    address,
  };
}