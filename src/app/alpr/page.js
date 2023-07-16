"use client";

import { React, useState, useEffect } from "react";

export default function AlprPage() {
  // const makeApiCall = async () => {
  //   const res = await fetch("/api/alpr", {
  //     method: "POST",
  //     body: JSON.stringify({ hello: "World" }),
  //   });
  // };

  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const response = await fetch("/api/alpr");
        const data = await response.json();
        setLabels(data.text);
      } catch (error) {
        console.error("ERROR:", error);
      }
    };

    fetchLabels();
  }, []);

  return (
    <div>
      {labels.map((label) => (
        <div key={label.description}>{label.description}</div>
      ))}
    </div>
  );
}
