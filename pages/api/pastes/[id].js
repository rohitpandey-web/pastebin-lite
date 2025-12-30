import { getPaste, deletePaste } from "../_store";

export default function handler(req, res) {
  const { id } = req.query;
  const paste = getPaste(id);

  if (!paste) {
    return res.status(404).json({ error: "Paste not found" });
  }

  // TTL check
  if (paste.expiresAt && Date.now() > paste.expiresAt) {
    deletePaste(id);
    return res.status(404).json({ error: "Paste expired" });
  }

  // View count check
  paste.views += 1;
  if (paste.maxViews && paste.views > paste.maxViews) {
    deletePaste(id);
    return res.status(404).json({ error: "Paste view limit reached" });
  }

  res.status(200).json({ content: paste.content });
}
