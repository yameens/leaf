import { useState } from 'react';
import { db, storage } from '../libraries/firebase';
import { collection, addDoc, DocumentReference } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import StarRatingPopup from './fiveStar';

export default function AddRestroom() {
    const[location, setLocation] = useState('');
    const[type, setType] = useState('');
    const[rating, setRating] = useState('');
    const[hours, setHours] = useState('')
    const[file, setFile] = useState<File | null>(null)
    const[showModal, setShowModal] = useState(false);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected){
            setFile(selected)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!location || !type) return;

        try {
            let photoURL: string | null = null;
            if (file) {
                const storageRef = ref(storage, `restroom/${Date.now()}_${file.name}`);
                console.log('[AddRestroom] uploading to: ', storageRef.fullPath);
                await uploadBytes(storageRef, file);
                photoURL = await getDownloadURL(storageRef);
                console.log('[AddRestroom] file picked:', {name: file?.name, size: file?.size, type: file?.type});
            }
            await addDoc(collection(db, 'restrooms'), {
                location, 
                type,
                rating,
                hours,
                photoURL,
                createdAt: new Date(),
            });
            console.log('[Add Restroom] Firestore doc created: ', DocumentReference);
            setLocation('');
            setType('');
            setRating('');
            setHours('');
            setFile(null);
            alert('restroom added');
        }
        catch (error) {
            console.log('error in adding restroom');
        }
    };

    return (
        <>
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col items-center space-y-8 h-full w-full overflow-y-auto">
            {/* side-by-side columns for images and inputs, just using TWO <div> and flex column to organize vertically*/}
            <div className="flex flex-row w-full justify-center items-center space-x-8">
                {/* images column */}
                <div className="flex flex-col items-center space-y-8">
                    <img
                        src="cleantoilet.png"
                        alt="Location Icon"
                        className="h-12 w-auto"
                    />
                    <img
                        src="cleantoilet.png"
                        alt="Type Icon"
                        className="h-12 w-auto"
                    />
                    <img
                        src="additionalarial.png"
                        alt="Photo Icon"
                        className="h-12 w-auto"
                    />
                </div>
                {/* inputs column */}
                <div className="flex flex-col items-center space-y-8 w-[90%]">
                    <input
                        value={location}
                        type="text"
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="location"
                        className="placeholder-black text-center text-black px-2 py-4 rounded-full bg-gray-200 h-12 w-full cursor-pointer hover:bg-gray-300 transition"
                    />
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="text-center text-black px-4 py-2 bg-gray-200 rounded-full h-12 w-full cursor-pointer hover:bg-gray-300 transition">
                        <option value="" disabled hidden>type</option>
                        <option value="public">public</option>
                        <option value="business">business</option>
                        <option value="customer only">customer only</option>
                    </select>
                    <label className="h-12 w-full bg-gray-200 text-black rounded-full text-center cursor-pointer hover:bg-gray-300 transition py-3 px-2 flex items-center justify-center">
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={handleFile}
                            className="hidden"
                        />
                        photo
                    </label>
                </div>
            </div>

            {/* other fields below */}
            <div className="flex flex-row items-center space-x-4 w-[95%] justify-center">
                <img 
                    src = "stretchedstar.png"
                    alt = "star icon"
                    className = "h-12 w-auto"
                />
                
                <button 
                   type="button"
                   onClick = {() => setShowModal(true)}
                   className="rounded-full bg-gray-200 text-center text-black px-4 py-2 flex-1 h-12 w-8 cursor-pointer hover:bg-gray-300 transition"
                >
                rating
                </button>

                <img
                    src = "stretchedcircle.png"
                    alt = "star icon"
                    className = "h-12 w-auto"
                />

                <input 
                    value={hours}
                    type="text"
                    placeholder="hours"
                    onChange={(e) => setHours(e.target.value)}
                    className="placeholder-black rounded-full text-black px-2 py-4 bg-gray-200 text-center flex-1 h-12 w-8 cursor-pointer hover:bg-gray-300 transition"
                />
            </div>

            <button
                type="submit"
                className="w-[90%] rounded-full text-black px-4 py-2 bg-blue-100 hover:bg-gray-300 transition cursor-pointer">
                submit
            </button>
        </form>
        {showModal && (
            <StarRatingPopup 
                onSelect={(value) => {
                    setRating(String(value));
                    setShowModal(false);
                }}
                onClose={() => setShowModal(false)}
            />
        )}
        </>
    );
}