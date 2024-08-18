// my-sst-app/packages/shared/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Venue {
  id: string;
  user_id: string;
  name: string;
  location: string;
  created_at: string;
  updated_at: string;
}
