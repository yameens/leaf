'use client';
import dynamic from 'next/dynamic';
import { db, auth, storage } from './libraries/firebase';
import "./globals.css"
import SearchBar from "./components/MySearchBar";
import AddRestroom from "./components/AddRestroomForm"
import React, { useState } from 'react';

const BathroomMap = dynamic(() => import('./components/MapBathroom'));

export default function Home() {
  const [selected, setSelected] = useState<'a' | 'b' | null>(null);
  
  return (
    <div className='flex h-screen'>
      <aside className="w-[25%] bg-white p-6 flex flex-col shadow-lg h-full">
        <h1 className="text-7xl mb-4 text-center text-black">bumi</h1>
        <h1 className="mb-6 text-5xl text-center text-black">restroom finder</h1>
        <div className="flex space-x-4 mb-6 justify-center">
          <button
            onClick={() => setSelected('a')}
            className={`flex-1 px-4 py-2 rounded-full transition ${selected === 'a' ? 'bg-gray-300' : 'bg-gray-200'} 
              hover:bg-gray-300`}
          >
            <img
                src="cleansearchicon.jpg"
                style={{ width: 32, height: 32}}
                alt="Clean Search"
                className="block mx-auto w-8 h-8"
              />
          </button>
          <button
            onClick={() => setSelected('b')}
            className={`transition flex-1 px-4 py-2 text-black text-bold rounded-full ${selected === 'b'? 'bg-gray-300' : 'bg-gray-200'}
              hover:bg-gray-300`}
          >
            +
          </button>
        </div>
        
        {selected === 'a' && (
          <div className = "flex space-x-5">
            <SearchBar />
          </div>
        )
        }
        
        {selected === 'b' && (
          <div className="flex flex-col items-center space-y-6 flex-1">
            <h1 className="w-[95%] px-3 py-3 text-3xl bg-gray-300 text-black text-center rounded-full h-14">add restroom</h1>
    
              <AddRestroom />
            
          </div>
        )}
      </aside>
      <main className="w-[75%] h-full flex flex-col">
        <div className="flex-1">
          <BathroomMap />
        </div>
      </main>
    </div>
  );
}