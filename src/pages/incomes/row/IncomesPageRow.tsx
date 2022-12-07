import React from 'react'
import { MovementModel } from '../../../models/movements/movement.model'
import { MovementResponseModel } from '../../../models/movements/movementResponse.model'

interface IIncomesPageRowProps {
    income: MovementResponseModel
}

function IncomesPageRow({ income }: IIncomesPageRowProps) {
    return (
        <>
            <span>{income.price}</span>
            <span>{income.source}</span>
            <span>{income.notes}</span>

        </>
    )
}

export default IncomesPageRow