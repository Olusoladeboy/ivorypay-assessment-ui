"use client";
import Checkout from "./checkout/checkout";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-2xl">Crypto Payment Gateway Simulation</div>
      <Checkout />
    </main>
  );
}
