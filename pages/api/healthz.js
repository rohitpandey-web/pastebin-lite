// import { kv } from "@vercel/kv";

// export default async function handler(req, res) {
//   try {
//     await kv.ping();
//     return res.status(200).json({ ok: true });
//   } catch (err) {
//     return res.status(500).json({ ok: false });
//   }
// }

import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  try {
    // persistence layer check (Redis read/write)
    await kv.set("healthz_check", "ok", { ex: 5 });
    const value = await kv.get("healthz_check");

    if (value !== "ok") {
      throw new Error("KV not reachable");
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false });
  }
}
