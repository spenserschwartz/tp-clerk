"use server";
import { revalidatePath } from "next/cache";

export async function revalidateUserPage() {
  revalidatePath("/user/[id]", "page");
}
