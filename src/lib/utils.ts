import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { fetchSolPrice } from "@/api/otherApi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const KNET_TOKEN_ADDRESS = "CfVs3waH2Z9TM397qSkaipTDhA9wWgtt8UchZKfwkYiu";
const TARGET_USDT_AMOUNT = 30000;

/**
 * 获取KNET价格并计算30,000 USDT对应的KNET数量
 * @returns Promise<{knetAmount: number, price: number, targetUsdt: number}>
 */
export async function calculateKnetForTargetUsdt(): Promise<{
  knetAmount: number;
  price: number;
  targetUsdt: number;
}> {
  try {
    const response = await fetchSolPrice(KNET_TOKEN_ADDRESS);
    const priceData = response;

    // 从API响应中提取KNET价格
    const knetPrice = priceData?.prices?.[KNET_TOKEN_ADDRESS];

    if (!knetPrice || knetPrice <= 0) {
      throw new Error('Invalid KNET price received from API');
    }

    // 计算30,000 USDT对应的KNET数量
    const knetAmount = TARGET_USDT_AMOUNT / knetPrice;

    return {
      knetAmount,
      price: knetPrice,
      targetUsdt: TARGET_USDT_AMOUNT
    };
  } catch (error) {
    console.error('Error calculating KNET amount:', error);
    // 返回默认值，避免组件崩溃
    return {
      knetAmount: 0,
      price: 0,
      targetUsdt: TARGET_USDT_AMOUNT
    };
  }
}

/**
 * 格式化数字显示，避免过长的小数
 * @param number 要格式化的数字
 * @param decimals 保留的小数位数，默认为6
 */
export function formatNumber(number: number, decimals: number = 6): string {
  if (number === 0) return '0';

  return number.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
}
