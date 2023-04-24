/* eslint-disable prettier/prettier */
export interface CreateUserParam {
  username: string;
  password: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateUserParam extends CreateUserParam {};

export interface createUserProfileParams {
  firstName: string;
  lastName: string;
  age: number;
  job: string; 
}

export interface createUserPostParams {
  title: string;
  description: string;
}