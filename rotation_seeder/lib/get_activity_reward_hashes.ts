import { DestinyActivity } from "../types/DestinyActivity.ts";

export const getActivityRewardHashes = (activity: DestinyActivity): number[] =>
  activity.rewards.map((reward) => reward.rewardItems[0].itemHash);
