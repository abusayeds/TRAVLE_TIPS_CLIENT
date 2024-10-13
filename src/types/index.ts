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

export type Tcommmon = {
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
    data?: {
    _id: any;
    name: string;
    role: string;
    user?: Tcommmon;
    email: string;
    userEmail?: string;
    password?: string;
    address?: string;
    follower?: Tcommmon[];
    following?: Tcommmon[];
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
    data : any
    _id: string;
    user: Tcommmon;
    category: string;
    title: string;
    description: string;
    upvoteCount: number;
    downvoteCount: number;
    totalVote: number;
    images: string[];
    comments: string[]; 
    status: "AVAILABLE" | "UNAVAILABLE"; 
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  export interface IReceivedPost extends TPost {
  
  }