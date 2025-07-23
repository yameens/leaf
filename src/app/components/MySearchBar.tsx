import { useState, useEffect } from 'react';

export default function SearchBar() {
    const [query, setQuery] = useState <string> ('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setQuery(e.target.value); };
    useEffect( () => { console.log("User is typing: ", query); }, [query] );

    return (
        <input 
            type = "text"
            value = { query }
            onChange = {handleChange}
            placeholder = "search for restroom"
            className = "placeholder-black px-4 px-y bg-gray-200 rounded-full w-full text-center h-14"
        />
    )
}
