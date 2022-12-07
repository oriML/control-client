import React from 'react'

function ErrorMessage({ errorMessage = null }: { errorMessage?: string | null }) {
    return (
        <div className="font-semibold text-red-500">
            {!!errorMessage ? errorMessage : 'UnkownError'}
        </div>
    )
}

export default ErrorMessage