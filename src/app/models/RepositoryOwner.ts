import {Repositories} from './Repositories';
import {Followers} from './Followers';
import {Following} from './Following';

export interface RepositoryOwner {
  login?: string;
  avatarUrl?: string;
  repositories?: Repositories;
  name?: string;
  bio?: string;
  followers?: Followers;
  following?: Following;
  company?: string;
  email?: string;
  location?: string;
  url?: string;
}
