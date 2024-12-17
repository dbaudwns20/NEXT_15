"use server"

import { reset } from "@/app/api";
import User from "@/types/user";

type ActionResponse = {
  ok: boolean;
  message: string;
  error?: string;
  data?: any;
}

export async function resetSampleUsers() {
  try {
    reset()
    return {
      ok: true,
      message: "Sample users reset successfully"
    } as ActionResponse;
  } catch (e: any) {
    return {
      ok: false,
      message: e.message
    } as ActionResponse;
  } 
}

export async function addSampleUser(newUser: User) {
  try {
    SAMPLE_USER.unshift({
      ...newUser,
      id: SAMPLE_USER.length + 1
    });
    return {
      ok: true,
      message: "User added successfully",
      data: SAMPLE_USER,
    }
  } catch (e: any) {
    return {
      ok: false,
      message: e.message
    } as ActionResponse;
  }
}