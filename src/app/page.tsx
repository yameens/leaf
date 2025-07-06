'use client';
import dynamic from 'next/dynamic';
const CoffeeMap = dynamic(() => import('./components/coffeemap'), );

export default function Home() {

  return (

    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Leaf: One Cup Away</h1>
      <p className="text-gray-600 mb-6 text-center max-w-2xl">Find your next favorite cup. </p>
      <div className="w-full max-w-4xl">
        <CoffeeMap />
        </div>
    </main>

  )

}