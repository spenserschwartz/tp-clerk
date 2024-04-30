"use server";
import { revalidatePath } from "next/cache";

export async function revalidateUserPage() {
  revalidatePath("/user/[id]", "page");
}

export async function revalidateThingsToDoPage() {
  revalidatePath("/things-to-do/[...slug]", "page");
}
