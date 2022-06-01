export type Todo = {
  id: string;
  text: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ApiResponse = {
  data?: Record<string, unknown>;
  error?: Error;
};
