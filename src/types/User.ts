import type { Role } from './Role'
type User = {
    id: string ;
    email: string;
    password: string;
    firstName: string;
    middleName: string|null;
    lastName: string ; 
    gender: string;
    phone: string;
    roles: Role|null
  }
  
  export type { User }
  

