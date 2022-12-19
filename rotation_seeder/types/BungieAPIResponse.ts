export type BungieAPIResponse<T> = {
  Response: T;
  ErrorCode: number;
  ThrottleSeconds: number;
  ErrorStatus: string;
  Message: string;
  MessageData: Record<string, unknown>;
};
