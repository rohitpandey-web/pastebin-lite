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
    await kv.ping();
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false });
  }
}
