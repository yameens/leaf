import { useState } from 'react';

type Props = {
    onSelect: (value: number) => void;
    onClose: () => void;
};

export default function StarRatingPopup({ onSelect, onClose }: Props) {
    const [rating, setRating] = useState(0);

    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col w-[70%] max-w-sm items-center space-y-4">
                <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <img
                            key={star}
                            onClick={() => setRating(star)}
                            src={star <= rating ? "/stretchedstar.png" : "/graystar.png"}
                            alt={`Star: ${star}`}
                            className="cursor-pointer h-14 w-14 hover:scale-110 transition object-contain"
                        />
                    ))}
                </div>
                <div className="flex space-x-2">
                    
                    <button
                        onClick={onClose}
                        className="text-black bg-gray-200 hover:bg-red-200 rounded-full px-4 py-1"
                    >
                        cancel
                    </button>
                    <button
                        onClick={() => onSelect(rating)}
                        className="text-black bg-gray-200 rounded-full px-4 py-1 hover:bg-green-200"
                    >
                        confirm
                    </button>
                </div>
            </div>
        </div>
    );
}