
export type FeatureFlags = {
  [key: string]: boolean;
};

export type FlagContextType = {
  flags: FeatureFlags;
  toggleFlag: (flagName: string) => void;
};