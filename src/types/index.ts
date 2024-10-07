/* eslint-disable prettier/prettier */
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  defaultValue?: string | undefined;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  name: string;
}

type Tcommmon = {
  _id: string;
  name: string;
  role: string;
  user?: any;
  email: string;
  userEmail?: string;
  password?: string;
  address?: string;
  followersCount?: number;
  followingCount?: number;
  status: string;
  passwordChangedAt?: Date;
  mobileNumber?: string;
  profilePhoto?: string;
  coverPhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};
export interface IUser {
    decodedToken?: {
    _id: string;
    name: string;
    role: string;
    user?: Tcommmon;
    email: string;
    userEmail?: string;
    password?: string;
    address?: string;
    followersCount?: number;
    followingCount?: number;
    status: string;
    passwordChangedAt?: Date;
    mobileNumber?: string;
    profilePhoto?: string;
    coverPhoto?: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
  };
//     singleUser?: {
//     _id: string;
//     name: string;
//     role: string;
//     user?: Tcommmon;
//     email: string;
//     userEmail?: string;
//     password?: string;
//     address?: string;
//     followersCount?: number;
//     followingCount?: number;
//     status: string;
//     passwordChangedAt?: Date;
//     mobileNumber?: string;
//     profilePhoto?: string;
//     coverPhoto?: string;
//     createdAt?: Date;
//     updatedAt?: Date;
//     __v?: number;
//   };
} 
export interface TPost  {
    _id: string;
    user: string;
    category: string;
    title: string;
    description: string;
    upvoteCount: number;
    downvoteCount: number;
    images: string[];
    comments: string[]; // If the comments have more structure, replace with appropriate type.
    status: "AVAILABLE" | "UNAVAILABLE"; // Assuming these are the only possible values.
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  export interface IReceivedPost extends TPost {
  
  }