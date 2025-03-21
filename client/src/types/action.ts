export type ActionResponse<T = void> = {
  status: number;
  success: boolean;
  message: string;
  data?: T;
};
