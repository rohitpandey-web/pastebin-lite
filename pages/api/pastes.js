import { createPaste } from "./_store";
import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content, ttl_seconds, max_views } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  const id = crypto.randomBytes(4).toString("hex");

  const expiresAt = ttl_seconds
    ? Date.now() + ttl_seconds * 1000
    : null;

  createPaste(id, {
    content,
    expiresAt,
    maxViews: max_views || null,
    views: 0,
  });

  res.status(201).json({ url: `/p/${id}` });
}
