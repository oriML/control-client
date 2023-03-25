import React from 'react'
import { Movement } from '../../../models/movements/movement.DTO'
import MovementsTableRow from '../row/MovementsTableRow'

interface IMovementsTableListProps {
    tableList: Movement[]
    setSelectedMovement: (movement: Movement) => void
    setToggleEditModal: (bool: boolean) => void
    setToggleDeleteModal: (bool: boolean) => void
}

function MovementsTableList({
    tableList,
    setToggleEditModal,
    setToggleDeleteModal,
    setSelectedMovement
}: IMovementsTableListProps) {
    return (
        <>
            {
                tableList?.map(income => (
                    <MovementsTableRow
                        key={income._id}
                        tableRowData={income}
                        setToggleEditModal={setToggleEditModal}
                        setToggleDeleteModal={setToggleDeleteModal}
                        setSelectedMovement={setSelectedMovement}
                    />
                ))
            }
        </>
    )
}

export default MovementsTableList