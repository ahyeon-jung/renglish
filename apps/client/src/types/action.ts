export type ActionResponse<T> = {
  status: number;
  success: boolean;
  message: string;
  data: T;
};
