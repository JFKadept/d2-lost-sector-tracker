import { DestinyActivity } from "../types/DestinyActivity.ts";

export const getActivityModifierHashes = (
  activity: DestinyActivity,
): number[] => activity.modifiers.map((mod) => mod.activityModifierHash);
