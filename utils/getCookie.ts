'use server';
import { cookies } from "next/headers";

export const getCookies = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')
  return token; 
};

export const getUserID = () => {
  const cookieStore = cookies();
  const userID = cookieStore.get('id');
  return userID;
}

export async function fectchUserID() {
  const userId = await getUserID();
  return userId;
}