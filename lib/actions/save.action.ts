"use server";

import { connectToDatabase } from "../mongoose";
import { IToggleSaveParams } from "./shared.types";

export async function saveAnItem(params: IToggleSaveParams) {
  try {
    connectToDatabase();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
