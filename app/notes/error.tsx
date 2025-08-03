"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div style={{ padding: "20px", color: "red" }}>
      <p>Could not fetch the list of notes. {error.message}</p>
    </div>
  );
}
