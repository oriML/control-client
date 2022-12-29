import React, { useEffect, useRef, useState } from "react"

export default function Autocomplete({ options, value, placeholder, onChange }: any) {

    const [showOptions, setShowOptions] = useState(false)
    const [cursor, setCursor] = useState(-1)
    const ref = useRef<HTMLDivElement>(null);

    const select = (option: string) => {
        onChange(option)
        setShowOptions(false)
    }

    const handleChange = (text: string) => {
        onChange(text);
        setCursor(-1);
        if (!showOptions) {
            setShowOptions(true)
        }
    }

    const filteredOptions = options.filter((option: string) => option.includes(value))

    const moveCursorDown = () => {
        if (cursor < filteredOptions.length - 1) {
            setCursor(c => c + 1)
        }
    }

    const moveCursorUp = () => {
        if (cursor > 0) {
            setCursor(c => c - 1)
        }
    }

    const handleNav = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "ArrowUp":
                moveCursorUp();
                break;
            case "ArrowDown":
                moveCursorDown();
                break;
            case "Enter":
                if (cursor >= 0 && cursor < filteredOptions.length) {
                    select(filteredOptions[cursor]);
                }
                break;
        }
    }

    useEffect(() => {
        const listener = (e: any) => {
            if (!ref?.current?.contains(e.target)) {
                setShowOptions(false)
                setCursor(-1)
            }
        };

        document.addEventListener('click', listener)
        document.addEventListener('focusin', listener)
        return () => {
            document.removeEventListener('click', listener);
            document.removeEventListener('focusin', listener);
        }
    }, []);

    return (
        <div className="relative w-full m-auto" ref={ref} >

            <input type="text" className="w-full dir-rtl border-2 px-4 py-2 outline-none rounded-lg"
                value={value}
                placeholder={placeholder}
                onChange={e => handleChange(e.target.value)}
                onFocus={() => setShowOptions(true)}
                onKeyDown={(e) => handleNav(e)}
            />

            <ul className={`dir-rtl cursor-pointer absolute w-full rounded-lg bg-white shadow-lg z-50 ${!showOptions && 'hidden'} select-none`}>
                {filteredOptions.length > 0 ? filteredOptions.map((option: any, i: number, arr: any[]) => {
                    let className = "px-4 hover:bg-green-100 "

                    if (i === 0)
                        className += "pt-2 pb-1 rounded-t-md"
                    else if (i === arr.length)
                        className += "pt-1 pb-2 rounded-b-lg"
                    else if (i === 0 && arr.length === 1)
                        className += "py-2 rounded-lg"
                    else
                        className += "py-1"

                    if (cursor === i) {
                        className += " bg-green-100"
                    }

                    return <li className={className}
                        key={option}
                        onClick={() => select(option)}
                    >{option}</li>
                }) : <li className="px-4 py-2 text-gray-500">No results</li>}

            </ul>
        </div>
    )
}