import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import type { IncomingHttpHeaders } from "http";
import { type NextApiRequest, type NextApiResponse } from "next";
import { Webhook, type WebhookRequiredHeaders } from "svix";
import { prisma } from "~/server/db";

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  console.log("incoming request");

  if (
    !req.headers["svix-id"] ||
    !req.headers["svix-timestamp"] ||
    !req.headers["svix-signature"]
  ) {
    return res
      .status(403)
      .json({ message: "This request is unauthorized. Message is changed" });
  }

  const evt = req.body as WebhookEvent;
  const svixHeaders: WebhookRequiredHeaders = {
    "svix-id": req.headers["svix-id"],
    "svix-timestamp": req.headers["svix-timestamp"],
    "svix-signature": req.headers["svix-signature"],
  };

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET ?? "");

  try {
    wh.verify(JSON.stringify(req.body), svixHeaders);
  } catch (err) {
    return res
      .status(403)
      .json({ message: "The verification of this request failed." });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  const userData = evt.data as { id: string; image_url: string };
  const { image_url } = userData;

  if (eventType === "user.created" || eventType === "user.updated") {
    console.log("USER CREATED EVENT");
    console.log("eventType:", eventType);

    // try {
    //   await prisma.user
    //     .create({
    //       data: { id: id, imageURL: image_url },
    //     })
    // .then(() =>
    //   res.status(200).json({ message: "User created successfully" })
    // );
    // } catch (error) {
    //   console.error("Error creating user:", error);
    //   return res.status(500).json({ error: "Error creating user" });
    // }

    try {
      await prisma.user
        .upsert({
          where: { id: id },
          update: { imageURL: image_url },
          create: { id: id, imageURL: image_url },
        })
        .then(() =>
          res.status(200).json({ message: "User upserted successfully" })
        );
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Error creating user" });
    }
  }

  return res.status(200).json({});
}
