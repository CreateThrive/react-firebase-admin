export interface IUserRtdb {
  name: string;
  email: string;
  logoUrl?: string;
  location?: string;
  createdAt: string;
  teams?: string[];
}

export interface IUserFirestore {
  name: string;
  email: string;
  logoUrl: string;
  location: string;
  createdAt: string;
  teams: string[];
}

export interface BatchUpdate {
  [key: string]: any;
}
