type RGB = {
  red: number;
  green: number;
  blue: number;
};

type RGBA = RGB & { alpha: number };

export type BungieAPIResponse<T> = {
  Response: T;
  ErrorCode: number;
  ThrottleSeconds: number;
  ErrorStatus: string;
  Message: string;
  MessageData: Record<string, unknown>;
};

export type BungieManifest = {
  version: string;
  mobileAssetContentPath: string;
  mobileGearAssetDataBases: {
    version: number;
    path: string;
  }[];
  mobileWorldContentPaths: Record<string, string>;
  jsonWorldContentPaths: Record<string, string>;
  jsonWorldComponentContentPaths: Record<
    string,
    Record<keyof DestinyJSONWorldContent, string>
  >;
  mobileClanBannerDatabasePath: string;
  mobileGearCDN: {
    Geometry: string;
    Texture: string;
    PlateRegion: string;
    Gear: string;
    Shader: string;
  };
  iconImagePyramidInfo: unknown[];
};

export type DestinyTooltipNotification = {
  displayString: string;
  displayStyle: string;
};

export type DestinyDisplayProperties = {
  description: string;
  name: string;
  icon: string;
  hasIcon: boolean;
};

export type DestinyEntityDefinition = {
  hash: number;
  index: number;
  redacted: boolean;
  blacklisted: boolean;
};

export type DestinyNodeStepSummaryDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
  nodeStepHash: number;
  perkHashes: number[];
  statHashes: number[];
  affectsQuality: boolean;
};

export type DestinyArtDyeChannelDefinition = DestinyEntityDefinition & {
  channelHash: number;
};

export type DestinyArtDyeReferenceDefinition = DestinyEntityDefinition & {
  channelHash: number;
};

export type DestinyPlaceDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
};

export type DestinyActivityDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
  originalDisplayProperties: DestinyDisplayProperties;
  selectionScreenDisplayProperties: Omit<DestinyDisplayProperties, "icon"> & {
    hasIcon: boolean;
  };
  releaseIcon: string;
  releaseTime: number;
  completionUnlockHash: number;
  activityLightLevel: number;
  destinationHash: number;
  placeHash: number;
  activityTypeHash: number;
  tier: number;
  pgcrImage: string;
  rewards: {
    itemHash: number;
    quantity: number;
    hasConditionalVisibility: boolean;
  }[];
  modifiers: { activityModifierHash: number }[];
  isPlaylist: boolean;
  challenges: unknown[];
  optionalUnlockStrings: unknown[];
  inheritFromFreeRoam: boolean;
  suppressOtherRewards: boolean;
  playlistItems: unknown[];
  matchmaking: {
    isMatchmade: boolean;
    minParty: number;
    maxParty: number;
    maxPlayers: number;
    requiresGuardianOath: boolean;
  };
  directActivityModeHash: number;
  directActivityModeType: number;
  loadouts: unknown[];
  activityModeHashes: number[];
  activityModeTypes: number[];
  isPvP: boolean;
  insertionPoints: unknown[];
  activityLocationMappings: unknown[];
};

export type DestinyActivityTypeDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
};

export type DestinyClassDefinition = DestinyEntityDefinition & {
  classType: number;
  displayProperties: {
    name: string;
    hasIcon: boolean;
  };
  genderedClassNames: {
    "Male": string;
    "Female": string;
  };
  genderedClassNamesByGenderHash: Record<string, string>;
};

export type DestinyGenderDefinition = DestinyEntityDefinition & {
  genderType: number | number;
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
};

export type DestinyInventoryBucketDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  scope: number;
  category: number;
  bucketOrder: number;
  itemCount: number;
  location: number;
  hasTransferDestination: boolean;
  enabled: boolean;
  fifo: boolean;
};

export type DestinyRaceDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  raceType: number;
  genderedRaceNames: {
    Male: string;
    Female: string;
  };
  genderedRaceNamesByGenderHash: Record<string, string>;
};

export type DestinyTalentGridNodeDefinition = {
  nodeIndex: number;
  nodeHash: number;
  row: number;
  column: number;
  prerequisiteNodeIndexes: unknown[];
  binaryPairNodeIndex: number;
  autoUnlocks: boolean;
  lastStepRepeats: boolean;
  isRandom: boolean;
  isRandomRepurchasable: boolean;
  steps: {
    displayProperties: DestinyDisplayProperties;
    stepIndex: number;
    nodeStepHash: number;
    interactionDescription: string;
    damageType: number;
    activationRequirement: {
      gridLevel: number;
      materialRequirementHashes: [];
      exclusiveSetRequiredHash: number;
    };
    canActivateNextStep: boolean;
    nextStepIndex: number;
    isNextStepRandom: boolean;
    perkHashes: unknown[];
    startProgressionBarAtProgress: number;
    statHashes: unknown[];
    affectsQuality: boolean;
    trueStepIndex: number;
    truePropertyIndex: number;
    affectsLevel: boolean;
  };
  exclusiveWithNodeHashes: unknown[];
  randomStartProgressionBarAtProgression: number;
  layoutIdentifier: string;
  groupScopeIndex: number;
  nodeStyleIdentifier: string;
  ignoreForCompletion: boolean;
  originalNodeHash: number;
  talentNodeTypes: number;
  exclusiveSetHash: number;
  isRealStepSelectionRandom: boolean;
};

export type DestinyTalentGridDefinition = DestinyEntityDefinition & {
  maxGridLevel: number;
  gridLevelPerColumn: number;
  progressionHash: number;
  nodes: DestinyTalentGridNodeDefinition[];
  calcMaxGridLevel: number;
  calcProgressToMaxLevel: number;
  exclusiveSets: unknown[];
  independentNodeIndexes: number[];
  maximumRandomMaterialRequirements: number;
  groups: Record<string, {
    groupHash: number;
    nodeHashes: number[];
    opposingGroupHashes: number[];
    opposingNodeHashes: number[];
  }>;
  nodeCategories: {
    identifier: string;
    isLoreDriven: boolean;
    displayProperties: Omit<DestinyDisplayProperties, "description" | "icon">;
    nodeHashes: number[];
  }[];
};

export type DestinyUnlockDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  unlockType: number;
  scope: number;
};

export type DestinySandboxPerkDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
  isDisplayable: boolean;
  damageType: number;
};

export type DestinyStatGroupDefinition = DestinyEntityDefinition & {
  maximumValue: number;
  uiPosition: number;
  scaledStats: {
    statHash: number;
    maximumValue: number;
    displayAsNumeric: boolean;
    displayInterpolation: {
      value: number;
      weight: number;
    }[];
  }[];
  overrides: Record<string, unknown>;
};

export type DestinyProgressionMappingDefinition = DestinyEntityDefinition & {
  displayProperties: Pick<DestinyDisplayProperties, "hasIcon">;
};

export type DestinyFactionDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
  progressionHash: number;
  rewardItemHash: number;
  rewardVendorHash: number;
  vendors: {
    vendorHash: number;
    destinationHash: number;
    backgroundImagePath: string;
  }[];
};

export type DestinyVendorGroupDefinition = DestinyEntityDefinition & {
  order: number;
  categoryName: string;
};

export type DestinyRewardSourceDefinition = Record<string, unknown>;

export type DestinyUnlockValueDefinition = DestinyEntityDefinition & {
  aggregationType: number;
  scope: number;
  mappingIndex: number;
};

export type DestinyRewardMappingDefinition = DestinyEntityDefinition & {
  mappingHash: number;
  mappingIndex: number;
  isGlobal: boolean;
};

export type DestinyRewardSheetDefinition = DestinyEntityDefinition & {
  sheetHash: number;
  sheetIndex: number;
};

export type DestinyItemCategoryDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  visible: boolean;
  deprecated: boolean;
  shortTitle: string;
  grantDestinyBreakerType: number;
  grantDestinyItemType: number;
  grantDestinySubType: number;
  grantDestinyClass: number;
  groupedCategoryHashes: number[];
  isPlug: boolean;
  parentCategoryHashes: unknown[];
  groupCategoryOnly: boolean;
};

export type DestinyDamageTypeDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
  transparentIconPath: string;
  showIcon: boolean;
  enumValue: number;
};

export type DestinyActivityModeDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
  pgcrImage: string;
  modeType: number;
  activityModeCategory: number;
  isTeamBased: boolean;
  tier: number;
  isAggregateMode: boolean;
  parentHashes: number[];
  friendlyName: string;
  supportsFeedFiltering: boolean;
  display: boolean;
  order: number;
};

export type DestinyMedalTierDefinition = DestinyEntityDefinition & {
  tierName: string;
  order: number;
};

export type DestinyAchievementDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  acccumulatorThreshold: number;
  platformIndex: number;
};

export type DestinyActivityGraphDefinition = DestinyEntityDefinition & {
  nodes: {
    nodeId: number;
    overrideDisplay: Omit<DestinyDisplayProperties, "icon">;
    position: {
      x: number;
      y: number;
      z: number;
    };
    featuringStates: unknown[];
    activities: { nodeActivityId: number }[];
    states: { state: number }[];
    uiActivityTypeOverrideHash: number;
    uiStyleHash: number;
  }[];
  artElements: unknown[];
  connections: unknown[];
  displayObjectives: unknown[];
  displayProgressions: unknown[];
  linkedGraphs: {
    description: string;
    name: string;
    unlockExpression: {
      scope: number;
    };
    linkedGraphId: number;
    linkedGraphs: Record<string, unknown>[];
    overview: string;
  }[];
  uiScreen: number;
  ignoreForMilestones: boolean;
};

export type DestinyActivityInteractableDefinition = DestinyEntityDefinition & {
  entries: { activityHash: number }[];
};

export type DestinyBondDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  providedUnlockHash: number;
  providedUnlockValueHash: number;
};

export type DestinyCharacterCustomizationCategoryDefinition =
  & DestinyEntityDefinition
  & {
    displayProperties: DestinyDisplayProperties;
  };

type CharacterPartCustomizationOptionDefinition = {
  customizationCategoryHash: number;
  displayName: string;
  options: {
    displayProperties: DestinyDisplayProperties;
    value: number;
  }[];
};

export type DestinyCharacterCustomizationOptionDefinition =
  & DestinyEntityDefinition
  & {
    displayProperties: DestinyDisplayProperties;
    genderHash: number;
    raceHash: number;
    decalColorOptions: CharacterPartCustomizationOptionDefinition;
    decalOptions: CharacterPartCustomizationOptionDefinition;
    eyeColorOptions: CharacterPartCustomizationOptionDefinition;
    faceOptionCinematicHostPatternIds: number;
    faceOptions: CharacterPartCustomizationOptionDefinition;
    featureColorOptions: CharacterPartCustomizationOptionDefinition;
    featureOptions: CharacterPartCustomizationOptionDefinition;
    hairColorOptions: CharacterPartCustomizationOptionDefinition;
    hairOptions: CharacterPartCustomizationOptionDefinition;
    helmetPreferences: CharacterPartCustomizationOptionDefinition;
    lipColorOptions: CharacterPartCustomizationOptionDefinition;
    personalityOptions: CharacterPartCustomizationOptionDefinition;
    skinColorOptions: CharacterPartCustomizationOptionDefinition;
  };

export type DestinyCollectibleDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
  scope: number;
  sourceString: string;
  sourceHash: number;
  itemHash: number;
  acquisitionInfo: {
    runOnlyAcquisitionRewardSite: boolean;
  };
  stateInfo: {
    requirements: {
      entitlementUnavailableMessage: string;
    };
  };
  presentationNodeType: number;
  traitIds: unknown[];
  traitHashes: unknown[];
  parentNodeHashes: number[];
};

export type DestinyDestinationDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  placeHash: number;
  defaultFreeroamActivityHash: number;
  activityGraphEntries: {
    activityGraphHash: number;
  }[];
  bubbleSettings: {
    displayProperties: Omit<DestinyDisplayProperties, "icon">;
  }[];
  bubbles: {
    hash: number;
    displayProperties: Omit<DestinyDisplayProperties, "icon">;
  }[];
};

export type DestinyEntitlementOfferDefinition = DestinyEntityDefinition & {
  offerKey: string;
};

export type DestinyEquipmentSlotDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  equipmentCategoryHash: number;
  bucketTypeHash: number;
  applyCustomArtDyes: boolean;
  artDyeChannels: { artDyeChannelHash: number }[];
};

export type DestinyEventCardDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
  linkRedirectPath: string;
  color: RGBA;
  images: {
    unownedCardSleeveImagePath: string;
    unownedCardSleeveWrapImagePath: string;
    cardIncompleteImagePath: string;
    cardCompleteImagePath: string;
    cardCompleteWrapImagePath: string;
    progressIconImagePath: string;
    themeBackgroundImagePath: string;
  };
  ownershipUnlockFlagHash: number;
  triumphsPresentationNodeHash: number;
  sealPresentationNodeHash: number;
  ticketCurrencyItemHash: number;
  ticketVendorHash: number;
  ticketVendorCategoryHash: number;
  endTime: string;
  endTimeOverrideUnlockValueHash: number;
  uiThemeHash: number;
};

export type DestinyStatDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties & {
    iconSequences: {
      frames: string[];
    }[];
  };
  aggregationType: number;
  hasComputedBlock: boolean;
  statCategory: number;
  interpolate: boolean;
};

export type DestinyInventoryItemDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  tooltipNotifications: DestinyTooltipNotification[];
  itemTypeDisplayName: string;
  flavorText: string;
  uiItemDisplayStyle: string;
  itemTypeAndTierDisplayName: string;
  displaySource: string;
  action: {
    verbName: string;
    verbDescription: string;
    isPositive: boolean;
    requiredCooldownSeconds: number;
    requiredItems: {
      count: number;
      itemHash: number;
      deleteOnAction: boolean;
    }[];
    progressionRewards: {
      progressionMappingHash: number;
      amount: number;
      applyThrottles: boolean;
    }[];
    actionTypeLabel: string;
    rewardSheetHash: number;
    rewardItemHash: number;
    rewardSiteHash: number;
    requiredCooldownHash: number;
    deleteOnAction: boolean;
    consumeEntireStack: boolean;
    useOnAcquire: boolean;
  };
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
  plug: {
    insertionRules: Record<string, unknown>[];
    plugCategoryIdentifier: string;
    plugCategoryHash: number;
    onActionRecreateSelf: boolean;
    actionRewardSiteHash: number;
    actionRewardItemOverrideHash: number;
    insertionMaterialRequirementHash: number;
    previewItemOverrideHash: number;
    enabledMaterialRequirementHash: number;
    enabledRules: [];
    uiPlugLabel: string;
    plugStyle: number;
    plugAvailability: number;
    alternateUiPlugLabel: string;
    alternatePlugStyle: number;
    isDummyPlug: boolean;
    applyStatsToSocketOwnerItem: boolean;
  };
  acquireRewardSiteHash: number;
  acquireUnlockHash: number;
  investmentStats: {
    statTypeHash: number;
    value: number;
    isConditionallyActive: boolean;
  }[];
  perks: {
    requirementDisplayString: string;
    perkHash: number;
    perkVisibility: number;
  }[];
  allowActions: boolean;
  doesPostmasterPullHaveSideEffects: boolean;
  nonTransferrable: boolean;
  itemCategoryHashes: number[];
  specialItemType: number;
  itemType: number;
  itemSubType: number;
  classType: number;
  breakerType: number;
  equippable: boolean;
  defaultDamageType: number;
  isWrapper: boolean;
};

export type DestinyInventoryItemLiteDefinition = {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  tooltipNotifications: DestinyTooltipNotification[];
  itemTypeDisplayName: string;
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
  perks: {
    requirementDisplayString: string;
    perkHash: number;
    perkVisibility: number;
  }[];
  allowActions: boolean;
  doesPostmasterPullHaveSideEffects: boolean;
  nonTransferrable: boolean;
  itemCategoryHashes: number[];
  specialItemType: boolean;
  itemType: boolean;
  itemSubType: boolean;
  classType: boolean;
  breakerType: boolean;
  equippable: boolean;
  defaultDamageType: number;
  isWrapper: boolean;
};

export type DestinyItemTierTypeDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  infusionProcess: {
    baseQualityTransferRatio: number;
    minimumQualityIncrement: number;
  };
};

export type DestinyLocationDefinition = DestinyEntityDefinition & {
  vendorHash: number;
  locationReleases: {
    displayProperties: DestinyDisplayProperties & {
      iconSequences: {
        frames: string[];
      }[];
    };
    smallTransparentIcon: string;
    mapIcon: string;
    largeTransparentIcon: string;
    spawnPoint: number;
    destinationHash: number;
    activityHash: number;
    activityGraphHash: number;
    activityGraphNodeHash: number;
    activityBubbleName: number;
    activityPathBundle: number;
    activityPathDestination: number;
    navPointType: number;
    worldPosition: [number, number, number, number];
  }[];
};

export type DestinyLoreDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  subtitle: string;
};

export type DestinyMaterialRequirementSetDefinition =
  & DestinyEntityDefinition
  & {
    materials: {
      itemHash: number;
      deleteOnAction: boolean;
      count: number;
      countIsConstant: boolean;
      omitFromRequirements: boolean;
    }[];
  };

export type DestinyMetricDefinition = DestinyEntityDefinition & {
  displayProperties: {
    iconSequences: {
      frames: string[];
    }[];
  };
  trackingObjectiveHash: number;
  lowerValueIsBetter: boolean;
  presentationNodeType: number;
  traitIds: unknown[];
  traitHashes: unknown[];
  parentNodeHashes: number[];
};

export type DestinyObjectiveDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  unlockValueHash: number;
  completionValue: number;
  scope: number;
  locationHash: number;
  allowNegativeValue: boolean;
  allowValueChangeWhenCompleted: boolean;
  isCountingDownward: boolean;
  valueStyle: number;
  progressDescription: string;
  perks: { perkHash: number; style: number };
  stats: { style: number };
  minimumVisibilityThreshold: number;
  allowOvercompletion: boolean;
  showValueOnComplete: boolean;
  isDisplayOnlyObjective: boolean;
  completedValueStyle: number;
  inProgressValueStyle: number;
  uiLabel: string;
  uiStyle: number;
};

export type DestinyPlatformBucketMappingDefinition = DestinyEntityDefinition & {
  membershipType: number;
  bucketHash: number;
};

export type DestinyPlugSetDefinition = DestinyEntityDefinition & {
  reusablePlugItems: {
    weight: number;
    alternateWeight: number;
    currentlyCanRoll: boolean;
    plugItemHash: number;
  }[];
  isFakePlugSet: boolean;
};

export type DestinyPowerCapDefinition = DestinyEntityDefinition & {
  powerCap: number;
};

export type DestinyPresentationNodeDefinition = DestinyEntityDefinition & {
  displayProperties: {
    iconSequences: {
      frames: string;
    }[];
  };
  originalIcon: string;
  rootViewIcon: string;
  nodeType: number;
  scope: number;
  objectiveHash: number;
  children: {
    presentationNodes: {
      presentationNodeHash: number;
      nodeDisplayPriority: number;
    }[];
    collectibles: { collectibleHash: number; nodeDisplayPriority: number }[];
    records: { recordHash: number; nodeDisplayPriority: number }[];
    metrics: { metricHash: number; nodeDisplayPriority: number }[];
    craftables: { craftableItemHash: number; nodeDisplayPriority: number }[];
  };
  displayStyle: number;
  screenStyle: number;
  requirements: { entitlementUnavailableMessage: string };
  disableChildSubscreenNavigation: boolean;
  categoryScoreUnlockValueHash: number;
  maxCategoryRecordScore: number;
  presentationNodeType: number;
  traitIds: unknown[];
  traitHashes: unknown[];
  parentNodeHashes: number[];
};

export type DestinyProgressionDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon"> & {
    displayUnitsName: string;
  };
  "BungieNet.Engine.Contract.Destiny.World.Definitions.IDestinyDisplayDefinition.displayProperties":
    & Omit<DestinyDisplayProperties, "icon">
    & {
      displayUnitsName: string;
    };
  scope: number;
  repeatLastStep: boolean;
  steps: {
    stepName: string;
    displayEffectType: number;
    progressTotal: number;
  }[];
  visible: boolean;
  progressToNextStepScaling: number;
  storageMappingIndex: number;
  currentResetCountUnlockValueHash: number;
  rewardItems: {
    rewardedAtProgressionLevel: number;
    acquisitionBehavior: number;
    itemClaimedUnlockHash: number;
    uiDisplayStyle: string;
    claimUnlockDisplayStrings: [];
    itemHash: number;
    quantity: number;
    hasConditionalVisibility: boolean;
  }[];
};

export type DestinyRecordDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
  scope: number;
  objectiveHashes: number[];
  recordValueStyle: number;
  forTitleGilding: boolean;
  shouldShowLargeIcons: boolean;
  titleInfo: {
    hasTitle: boolean;
  };
  completionInfo: {
    partialCompletionObjectiveCountThreshold: number;
    ScoreValue: number;
    shouldFireToast: boolean;
    toastStyle: number;
  };
  stateInfo: {
    featuredPriority: number;
    completeUnlockHash: number;
    claimedUnlockHash: number;
    completedCounterUnlockValueHash: number;
  };
  requirements: {
    entitlementUnavailableMessage: string;
  };
  expirationInfo: {
    hasExpiration: boolean;
    description: string;
  };
  intervalInfo: {
    intervalObjectives: {
      intervalObjectiveHash: number;
      intervalScoreValue: number;
    }[];
    intervalRewards: {
      intervalRewardItem: unknown[];
    }[];
    originalObjectiveArrayInsertionIndex: number;
    isIntervalVersionedFromNormalRecord: boolean;
  };
  rewardItems: {
    itemHash: number;
    quantity: number;
    hasConditionalVisibility: boolean;
  };
  anyRewardHasConditionalVisibility: boolean;
  presentationNodeType: number;
  traitIds: unknown[];
  traitHashes: unknown[];
  parentNodeHashes: number[];
};

export type DestinyRewardAdjusterPointerDefinition = DestinyEntityDefinition & {
  adjusterType: number;
};

export type DestinyProgressionLevelRequirementDefinition =
  & DestinyEntityDefinition
  & {
    requirementCurve: {
      value: number;
      weight: number;
    }[];
    progressionHash: number;
  };

export type DestinyRewardAdjusterProgressionMapDefinition =
  & DestinyEntityDefinition
  & {
    isAdditive: boolean;
  };

export type DestinyRewardItemListDefinition = DestinyEntityDefinition;

export type DestinySackRewardItemListDefinition = DestinyEntityDefinition;

export type DestinySandboxPatternDefinition = DestinyEntityDefinition & {
  patternHash: number;
  patternGlobalTagIdHash: number;
  weaponContentGroupHash: number;
  weaponTranslationGroupHash: number;
  weaponTypeHash: number;
  weaponType: number;
  filters: {
    artArrangementRegionHash: number;
    artArrangementRegionIndex: number;
    statHash: number;
    arrangementIndexByStatValue: Record<string, number>;
  }[];
};

export type DestinySeasonDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  seasonNumber: number;
  seasonPassProgressionHash: number;
  startTimeInSeconds: string;
  seasonPassUnlockHash: number;
};

export type DestinySeasonPassDefinition = DestinyEntityDefinition & {
  displayProperties: Pick<DestinyDisplayProperties, "name" | "hasIcon">;
  rewardProgressionHash: number;
  prestigeProgressionHash: number;
};

export type DestinySocketCategoryDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  uiCategoryStyle: number;
  categoryStyle: number;
};

export type DestinySocketTypeDefinition = DestinyEntityDefinition & {
  displayProperties: { description: ""; name: ""; hasIcon: false };
  insertAction: {
    actionExecuteSeconds: number;
    actionSoundHash: number;
    isPositiveAction: boolean;
    actionType: number;
  };
  plugWhitelist: {
    categoryHash: number;
    categoryIdentifier: string;
  }[];
  socketCategoryHash: number;
  visibility: number;
  alwaysRandomizeSockets: boolean;
  isPreviewEnabled: boolean;
  hideDuplicateReusablePlugs: boolean;
  overridesUiAppearance: boolean;
  avoidDuplicatesOnInitialization: boolean;
  currencyScalars: {
    currencyItemHash: number;
    scalarValue: number;
  }[];
};

export type DestinyTraitDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties & {
    iconSequences: {
      frames: string[];
    }[];
  };
  traitCategoryHash: number;
  displayHint: string;
};

export type DestinyTraitCategoryDefinition = DestinyEntityDefinition & {
  traitCategoryId: string;
  traitHashes: number[];
  traitIds: string[];
};

export type DestinyUnlockCountMappingDefinition = DestinyEntityDefinition & {
  unlockValueHash: number;
};

export type DestinyUnlockEventDefinition = DestinyEntityDefinition & {
  sequenceLastUpdatedUnlockValueHash: number;
  sequenceUnlockValueHash: number;
  newSequenceRewardSiteHash: number;
  unlockEntries: {
    unlockHash: number;
    selectedValue: number;
    clearedValue: number;
    unlockValueHash: number;
  }[];
};

export type DestinyUnlockExpressionMappingDefinition = DestinyEntityDefinition;

export type DestinyVendorDisplayProperties = DestinyDisplayProperties & {
  largeIcon: string;
  subtitle: string;
  originalIcon: string;
  requirementsDisplay: string;
  smallTransparentIcon: string;
  mapIcon: string;
  largeTransparentIcon: string;
};

export type DestinyVendorCategory = {
  categoryIndex: number;
  sortValue: number;
  categoryHash: number;
  quantityAvailable: number;
  showUnavailableItems: boolean;
  hideIfNoCurrency: boolean;
  hideFromRegularPurchase: boolean;
  buyStringOverride: string;
  disabledDescription: string;
  vendorItemIndexes: number[];
  isPreview: boolean;
  isDisplayOnly: boolean;
  resetIntervalMinutesOverride: number;
  resetOffsetMinutesOverride: number;
};

export type DestinyVendorDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyVendorDisplayProperties;
  "BungieNet.Engine.Contract.Destiny.World.Definitions.IDestinyDisplayDefinition.displayProperties":
    DestinyVendorDisplayProperties;
  vendorProgressionType: number;
  displayItemHash: number;
  inhibitBuying: boolean;
  inhibitSelling: boolean;
  factionHash: number;
  resetIntervalMinutes: number;
  resetOffsetMinutes: number;
  failureStrings: unknown[];
  unlockRanges: unknown[];
  vendorIdentifier: string;
  enabled: boolean;
  visible: boolean;
  consolidateCategories: boolean;
  unlockValueHash: number;
  actions: unknown[];
  categories: DestinyVendorCategory[];
  originalCategories: DestinyVendorCategory[];
  displayCategories: {
    index: number;
    identifier: string;
    displayCategoryHash: number;
    displayProperties: Omit<DestinyDisplayProperties, "icon">;
    displayInBanner: boolean;
    sortOrder: number;
  }[];
  interactions: {
    interactionIndex: number;
    replies: {
      itemRewardsSelection: number;
      rewardSiteHash: number;
      reply: string;
      replyType: number;
    }[];
    vendorCategoryIndex: number;
    questlineItemHash: number;
    sackInteractionList: unknown[];
    uiInteractionType: number;
    interactionType: number;
    rewardBlockLabel: string;
    rewardVendorCategoryIndex: number;
    flavorLineOne: string;
    flavorLineTwo: string;
    headerDisplayProperties: Omit<DestinyDisplayProperties, "icon">;
    instructions: string;
  }[];
  inventoryFlyouts: [];
  itemList: {
    vendorItemIndex: number;
    itemHash: number;
    quantity: number;
    failureIndexes: unknown[];
    priceOverrideEnabled: boolean;
    currencies: unknown[];
    refundPolicy: number;
    refundTimeLimit: number;
    rewardAdjustorPointerHash: number;
    creationLevels: {
      level: number;
    }[];
    displayCategoryIndex: number;
    seedOverride: number;
    categoryIndex: number;
    originalCategoryIndex: number;
    weight: number;
    minimumLevel: number;
    maximumLevel: number;
    licenseUnlockHash: number;
    action: {
      executeSeconds: number;
      isPositive: boolean;
    };
    displayCategory: string;
    inventoryBucketHash: number;
    visibilityScope: number;
    purchasableScope: number;
    exclusivity: number;
    sortValue: number;
    expirationTooltip: string;
    redirectToSaleIndexes: unknown[];
    socketOverrides: unknown[];
    unpurchasable: boolean;
  }[];
  services: unknown[];
  acceptedItems: unknown[];
  returnWithVendorRequest: false;
  locations: unknown[];
  groups: unknown[];
  ignoreSaleItemHashes: unknown[];
};

export type DestinyMilestoneDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
  milestoneType: number;
  recruitable: boolean;
  showInExplorer: boolean;
  showInMilestones: boolean;
  explorePrioritizesActivityImage: boolean;
  hasPredictableDates: boolean;
  quests: Record<string, {
    questItemHash: number;
    displayProperties: DestinyDisplayProperties;
    questRewards: {
      items: {
        itemHash: number;
        quantity: number;
        hasConditionalVisibility: boolean;
      }[];
    };
    trackingUnlockValueHash: number;
  }>;
  isInGameMilestone: boolean;
  defaultOrder: number;
};

export type DestinyActivityModifierDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties & {
    iconSequences: {
      frames: string[];
    }[];
  };
  displayInNavMode: boolean;
  displayInActivitySelection: boolean;
};

export type DestinyReportReasonCategoryDefinition = DestinyEntityDefinition & {
  displayProperties: {
    description:
      "Player intentionally quits during an activity.\n\nExamples: Quit at start, Quit mid-activity";
    name: "Quitting";
    hasIcon: false;
  };
  reasons: Record<string, {
    reasonHash: number;
    displayProperties: DestinyDisplayProperties;
  }>;
};

export type DestinyArtifactDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
  translationBlock: {
    weaponPatternHash: number;
    defaultDyes: {
      channelHash: number;
      dyeHash: number;
    }[];
    lockedDyes: [];
    customDyes: [];
    arrangements: {
      classHash: number;
      artArrangementHash: number;
    }[];
    hasGeometry: boolean;
  };
  tiers: {
    tierHash: number;
    displayTitle: string;
    items: {
      itemHash: number;
      activeUnlockHash: number;
    }[];
    minimumUnlockPointsUsedRequirement: number;
  }[];
};

export type DestinyBreakerTypeDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
  enumValue: number;
  unlockHash: number;
};

export type DestinyChecklistDefinition = DestinyEntityDefinition & {
  displayProperties: Omit<DestinyDisplayProperties, "icon">;
  viewActionString: string;
  scope: number;
  entries: {
    hash: number;
    displayProperties: Omit<DestinyDisplayProperties, "icon">;
    scope: number;
  }[];
};

export type DestinyEnergyTypeDefinition = DestinyEntityDefinition & {
  displayProperties: DestinyDisplayProperties;
  transparentIconPath: string;
  showIcon: boolean;
  enumValue: number;
  capacityStatHash: number;
  costStatHash: number;
};

export type DestinyJSONWorldContent = {
  DestinyNodeStepSummaryDefinition: Record<
    string,
    DestinyNodeStepSummaryDefinition
  >;
  DestinyArtDyeChannelDefinition: Record<
    string,
    DestinyArtDyeChannelDefinition
  >;
  DestinyArtDyeReferenceDefinition: Record<
    string,
    DestinyArtDyeReferenceDefinition
  >;
  DestinyPlaceDefinition: Record<string, DestinyPlaceDefinition>;
  DestinyActivityDefinition: Record<string, DestinyActivityDefinition>;
  DestinyActivityTypeDefinition: Record<string, DestinyActivityTypeDefinition>;
  DestinyClassDefinition: Record<string, DestinyClassDefinition>;
  DestinyGenderDefinition: Record<string, DestinyGenderDefinition>;
  DestinyInventoryBucketDefinition: Record<
    string,
    DestinyInventoryBucketDefinition
  >;
  DestinyRaceDefinition: Record<string, DestinyRaceDefinition>;
  DestinyTalentGridDefinition: Record<string, DestinyTalentGridDefinition>;
  DestinyUnlockDefinition: Record<string, DestinyUnlockDefinition>;
  DestinySandboxPerkDefinition: Record<string, DestinySandboxPerkDefinition>;
  DestinyStatGroupDefinition: Record<string, DestinyStatGroupDefinition>;
  DestinyProgressionMappingDefinition: Record<
    string,
    DestinyProgressionMappingDefinition
  >;
  DestinyFactionDefinition: Record<string, DestinyFactionDefinition>;
  DestinyVendorGroupDefinition: Record<string, DestinyVendorGroupDefinition>;
  DestinyRewardSourceDefinition: Record<string, DestinyRewardSourceDefinition>;
  DestinyUnlockValueDefinition: Record<string, DestinyUnlockValueDefinition>;
  DestinyRewardMappingDefinition: Record<
    string,
    DestinyRewardMappingDefinition
  >;
  DestinyRewardSheetDefinition: Record<string, DestinyRewardSheetDefinition>;
  DestinyItemCategoryDefinition: Record<string, DestinyItemCategoryDefinition>;
  DestinyDamageTypeDefinition: Record<string, DestinyDamageTypeDefinition>;
  DestinyActivityModeDefinition: Record<string, DestinyActivityModeDefinition>;
  DestinyMedalTierDefinition: Record<string, DestinyMedalTierDefinition>;
  DestinyAchievementDefinition: Record<string, DestinyAchievementDefinition>;
  DestinyActivityGraphDefinition: Record<
    string,
    DestinyActivityGraphDefinition
  >;
  DestinyActivityInteractableDefinition: Record<
    string,
    DestinyActivityInteractableDefinition
  >;
  DestinyBondDefinition: Record<string, DestinyBondDefinition>;
  DestinyCharacterCustomizationCategoryDefinition: Record<
    string,
    DestinyCharacterCustomizationCategoryDefinition
  >;
  DestinyCharacterCustomizationOptionDefinition: Record<
    string,
    DestinyCharacterCustomizationOptionDefinition
  >;
  DestinyCollectibleDefinition: Record<string, DestinyCollectibleDefinition>;
  DestinyDestinationDefinition: Record<string, DestinyDestinationDefinition>;
  DestinyEntitlementOfferDefinition: Record<
    string,
    DestinyEntitlementOfferDefinition
  >;
  DestinyEquipmentSlotDefinition: Record<
    string,
    DestinyEquipmentSlotDefinition
  >;
  DestinyEventCardDefinition: Record<string, DestinyEventCardDefinition>;
  DestinyStatDefinition: Record<string, DestinyStatDefinition>;
  DestinyInventoryItemDefinition: Record<
    string,
    DestinyInventoryItemDefinition
  >;
  DestinyInventoryItemLiteDefinition: Record<
    string,
    DestinyInventoryItemLiteDefinition
  >;
  DestinyItemTierTypeDefinition: Record<string, DestinyItemTierTypeDefinition>;
  DestinyLocationDefinition: Record<string, DestinyLocationDefinition>;
  DestinyLoreDefinition: Record<string, DestinyLoreDefinition>;
  DestinyMaterialRequirementSetDefinition: Record<
    string,
    DestinyMaterialRequirementSetDefinition
  >;
  DestinyMetricDefinition: Record<string, DestinyMetricDefinition>;
  DestinyObjectiveDefinition: Record<string, DestinyObjectiveDefinition>;
  DestinyPlatformBucketMappingDefinition: Record<
    string,
    DestinyPlatformBucketMappingDefinition
  >;
  DestinyPlugSetDefinition: Record<string, DestinyPlugSetDefinition>;
  DestinyPowerCapDefinition: Record<string, DestinyPowerCapDefinition>;
  DestinyPresentationNodeDefinition: Record<
    string,
    DestinyPresentationNodeDefinition
  >;
  DestinyProgressionDefinition: Record<string, DestinyProgressionDefinition>;
  DestinyProgressionLevelRequirementDefinition: Record<
    string,
    DestinyProgressionLevelRequirementDefinition
  >;
  DestinyRecordDefinition: Record<string, DestinyRecordDefinition>;
  DestinyRewardAdjusterPointerDefinition: Record<
    string,
    DestinyRewardAdjusterPointerDefinition
  >;
  DestinyRewardAdjusterProgressionMapDefinition: Record<
    string,
    DestinyRewardAdjusterProgressionMapDefinition
  >;
  DestinyRewardItemListDefinition: Record<
    string,
    DestinyRewardItemListDefinition
  >;
  DestinySackRewardItemListDefinition: Record<
    string,
    DestinySackRewardItemListDefinition
  >;
  DestinySandboxPatternDefinition: Record<
    string,
    DestinySandboxPatternDefinition
  >;
  DestinySeasonDefinition: Record<string, DestinySeasonDefinition>;
  DestinySeasonPassDefinition: Record<string, DestinySeasonPassDefinition>;
  DestinySocketCategoryDefinition: Record<
    string,
    DestinySocketCategoryDefinition
  >;
  DestinySocketTypeDefinition: Record<string, DestinySocketTypeDefinition>;
  DestinyTraitDefinition: Record<string, DestinyTraitDefinition>;
  DestinyTraitCategoryDefinition: Record<
    string,
    DestinyTraitCategoryDefinition
  >;
  DestinyUnlockCountMappingDefinition: Record<
    string,
    DestinyUnlockCountMappingDefinition
  >;
  DestinyUnlockEventDefinition: Record<string, DestinyUnlockEventDefinition>;
  DestinyUnlockExpressionMappingDefinition: Record<
    string,
    DestinyUnlockExpressionMappingDefinition
  >;
  DestinyVendorDefinition: Record<string, DestinyVendorDefinition>;
  DestinyMilestoneDefinition: Record<string, DestinyMilestoneDefinition>;
  DestinyActivityModifierDefinition: Record<
    string,
    DestinyActivityModifierDefinition
  >;
  DestinyReportReasonCategoryDefinition: Record<
    string,
    DestinyReportReasonCategoryDefinition
  >;
  DestinyArtifactDefinition: Record<string, DestinyArtifactDefinition>;
  DestinyBreakerTypeDefinition: Record<string, DestinyBreakerTypeDefinition>;
  DestinyChecklistDefinition: Record<string, DestinyChecklistDefinition>;
  DestinyEnergyTypeDefinition: Record<string, DestinyEnergyTypeDefinition>;
};
