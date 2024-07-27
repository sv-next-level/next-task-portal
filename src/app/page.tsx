"use client";

import { Resizable } from "@/templates";

export default function Home() {
  return (
    <main className="h-screen max-h-screen w-screen max-w-full">
      <Resizable top={60} />
    </main>
  );
}
