export type UserType = {
  username: string;
  password: string;
};

export type UpdateUserType = {
  username?: string;
  password?: string;
  authStrategy?: string;
  createdAt?: Date;
};

export type CreatePostType = {
  title: string;
  content: string;
  userId: number;
};
