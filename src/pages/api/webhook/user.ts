import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import type { IncomingHttpHeaders } from "http";
import { type NextApiRequest, type NextApiResponse } from "next";
import { Webhook, type WebhookRequiredHeaders } from "svix";

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

enum EventTypes {
  "userCreated" = "user.created",
  "userUpdated" = "user.updated",
  "userDeleted" = "user.deleted",
}

export default function handler(
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

  console.log("DO SOMETHING");

  try {
    wh.verify(JSON.stringify(req.body), svixHeaders);
  } catch (err) {
    return res
      .status(403)
      .json({ message: "The verification of this request failed." });
  }

  console.log("MADE IT TO SWITCH");

  switch (evt.type) {
    case EventTypes.userCreated: {
      // user created logic
      console.log("USER CREATED EVENT");
    }

    case EventTypes.userUpdated: {
      // user updated logic
      console.log("USER UPDATED EVENT");
    }
    default:
      return res.status(200).json({});
  }
}
