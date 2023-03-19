import React from 'react'

function PageTab({ text }: { text: string | number }) {
    return (
        <div className="text-right px-14 text-2xl font-bold text-gray-600">
            <div className="w-fit ml-auto mb-1 bg-gray-100 shadow border-b-2
                        border-gray-200 border-solid px-6 py-4 rounded-lg">
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}

export default PageTab