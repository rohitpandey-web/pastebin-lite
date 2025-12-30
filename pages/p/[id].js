// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// export default function PastePage() {
//   const router = useRouter();
//   const { id } = router.query;
//   const [content, setContent] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!id) return;

//     fetch(`/api/pastes/${id}`)
//       .then(async (res) => {
//         if (!res.ok) {
//           const data = await res.json();
//           throw new Error(data.error);
//         }
//         return res.json();
//       })
//       .then((data) => setContent(data.content))
//       .catch((err) => setError(err.message));
//   }, [id]);

//   if (error) {
//     return <p style={{ padding: 40 }}>{error}</p>;
//   }

//   return (
//     <pre style={{ padding: 40, whiteSpace: "pre-wrap" }}>
//       {content}
//     </pre>
//   );
// }



import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PastePage() {
  const router = useRouter();
  const { id } = router.query;

  const [content, setContent] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/pastes/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setContent(data.content))
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return <h2 style={{ padding: 40 }}>404 – Paste not found</h2>;
  }

  return (
    <pre
      style={{
        padding: 40,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {content}
    </pre>
  );
}
