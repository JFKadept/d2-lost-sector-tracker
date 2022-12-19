import { DestinyEntity } from "./DestinyEntity.ts";

export type DestinyInventoryItem = DestinyEntity & {
  tooltipNotifications: [];
  backgroundColor: {
    colorHash: number;
    red: number;
    green: number;
    blue: number;
    alpha: number;
  };
  itemTypeDisplayName: string;
  flavorText: string;
  uiItemDisplayStyle: string;
  itemTypeAndTierDisplayName: string;
  displaySource: string;
  inventory: {
    maxStackSize: number;
    bucketTypeHash: number;
    recoveryBucketTypeHash: number;
    tierTypeHash: number;
    isInstanceItem: boolean;
    nonTransferrableOriginal: boolean;
    tierTypeName: string;
    tierType: number;
    expirationTooltip: string;
    expiredInActivityMessage: string;
    expiredInOrbitMessage: string;
    suppressExpirationWhenObjectivesComplete: boolean;
  };
  acquireRewardSiteHash: number;
  acquireUnlockHash: number;
  summary: {
    sortPriority: number;
  };
  investmentStats: [];
  perks: [];
  allowActions: boolean;
  doesPostmasterPullHaveSideEffects: boolean;
  nonTransferrable: boolean;
  itemCategoryHashes: [
    number,
  ];
  specialItemType: number;
  itemType: number;
  itemSubType: number;
  classType: number;
  breakerType: number;
  equippable: boolean;
  defaultDamageType: number;
  isWrapper: boolean;
};
