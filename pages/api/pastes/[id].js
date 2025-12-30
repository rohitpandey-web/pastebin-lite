// import { kv } from "@vercel/kv";

// export default function handler(req, res) {
//   const { id } = req.query;
//   const paste = getPaste(id);

//   if (!paste) {
//     return res.status(404).json({ error: "Paste not found" });
//   }

//   // TTL check
//   if (paste.expiresAt && Date.now() > paste.expiresAt) {
//     deletePaste(id);
//     return res.status(404).json({ error: "Paste expired" });
//   }

//   // View count check
//   paste.views += 1;
//   if (paste.maxViews && paste.views > paste.maxViews) {
//     deletePaste(id);
//     return res.status(404).json({ error: "Paste view limit reached" });
//   }

//   res.status(200).json({ content: paste.content });
// }

import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  const paste = await kv.get(`paste:${id}`);

  if (!paste) {
    return res.status(404).json({ error: "Paste not found" });
  }

  //  TEST MODE support (It is very essential)
  let now = Date.now();
  if (
    process.env.TEST_MODE === "1" &&
    req.headers["x-test-now-ms"]
  ) {
    now = Number(req.headers["x-test-now-ms"]);
  }

  // ⏳ TTL check
  if (paste.expiresAt && now > paste.expiresAt) {
    await kv.del(`paste:${id}`);
    return res.status(404).json({ error: "Paste expired" });
  }

  // 👁 View count check
  const newViews = paste.views + 1;

  if (paste.maxViews && newViews > paste.maxViews) {
    await kv.del(`paste:${id}`);
    return res.status(404).json({ error: "Paste view limit exceeded" });
  }

  // ✅ Update views in Redis
  await kv.set(`paste:${id}`, {
    ...paste,
    views: newViews,
  });

  return res.status(200).json({
    content: paste.content,
    remaining_views: paste.maxViews
      ? paste.maxViews - newViews
      : null,
    expires_at: paste.expiresAt
      ? new Date(paste.expiresAt).toISOString()
      : null,
  });
}
