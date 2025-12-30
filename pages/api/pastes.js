// import { createPaste } from "./_store";
// import crypto from "crypto";

// export default function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { content, ttl_seconds, max_views } = req.body;

//   if (!content) {
//     return res.status(400).json({ error: "Content is required" });
//   }

//   const id = crypto.randomBytes(4).toString("hex");

//   const expiresAt = ttl_seconds
//     ? Date.now() + ttl_seconds * 1000
//     : null;

//   createPaste(id, {
//     content,
//     expiresAt,
//     maxViews: max_views || null,
//     views: 0,
//   });

//   res.status(201).json({ url: `/p/${id}` });
// }


import { kv } from "@vercel/kv";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content, ttl_seconds, max_views } = req.body;

  // ✅ Validation (IMPORTANT for tests)
  if (!content || typeof content !== "string" || content.trim() === "") {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (ttl_seconds !== undefined && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
    return res.status(400).json({ error: "Invalid ttl_seconds" });
  }

  if (max_views !== undefined && (!Number.isInteger(max_views) || max_views < 1)) {
    return res.status(400).json({ error: "Invalid max_views" });
  }

  const id = crypto.randomBytes(6).toString("hex");

  const now = Date.now();
  const expiresAt = ttl_seconds ? now + ttl_seconds * 1000 : null;

  const paste = {
    content,
    createdAt: now,
    expiresAt,
    maxViews: max_views ?? null,
    views: 0,
  };

  // ✅ Redis save (NO in-memory)
  await kv.set(`paste:${id}`, paste);

  return res.status(201).json({
    id,
    url: `${req.headers.origin}/p/${id}`,
  });
}
