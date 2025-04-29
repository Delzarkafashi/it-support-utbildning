import { useEffect, useState } from "react";

function Test() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/test")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("API error:", err));
  }, []);

  return <div>{message}</div>;
}

export default Test;
