import { ThemeContext } from '@/context/ThemeContext';
import React, { useContext, useState } from 'react';

const AlphabetFilter = ({ onLetterSelect, selectedLetter = 'S' }) => {
    const [activeLetter, setActiveLetter] = useState(selectedLetter);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const { theme } = useContext(ThemeContext);

    const handleLetterClick = (letter) => {
        setActiveLetter(letter);
        if (onLetterSelect) {
            onLetterSelect(letter);
        }
    };

    return (
        <div className="w-full">


            <div className="flex flex-wrap gap-1 justify-between">
                {alphabet.map((letter) => (
                    <button
                        key={letter}
                        onClick={() => handleLetterClick(letter)}
                        className={`
        w-10 h-10 
        border border-gray-300 
        flex items-center justify-center 
        font-medium text-sm
        transition-all duration-200
        hover:border-orange-400 hover:shadow-sm
        ${activeLetter === letter
                                ? theme === "dark"
                                    ? "bg-[#FF6B00] text-white border-orange-500 shadow-md"
                                    : "bg-[#FF6B00] text-[#ffffff] hover:bg-orange-50"
                                : ""
                            }
      `}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            {/* Demo section showing selected letter */}

        </div>
    );
};


export default AlphabetFilter