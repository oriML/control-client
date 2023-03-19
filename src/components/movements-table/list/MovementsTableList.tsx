import React from 'react'
import { MovementResponseModel } from '../../../models/movements/movementResponse.model'
import MovementsTableRow from '../row/MovementsTableRow'

interface IMovementsTableListProps {
    tableList: MovementResponseModel[]
    setSelectedMovement: (movement: MovementResponseModel) => void
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