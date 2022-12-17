import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { DeleteMovementIcon, EditMovementIcon } from '../../../icons'
import { MovementResponseModel } from '../../../models/movements/movementResponse.model'
import { MovementSourceType } from '../../../types/movementSource.type'

interface IMovementsTableRowProps {
    tableRowData: MovementResponseModel
    setSelectedMovement: (movement: MovementResponseModel) => void
    setToggleEditModal: (bool: boolean) => void
    setToggleDeleteModal: (bool: boolean) => void
}

const OddRowWrapper = ({ children }: { children?: ReactNode }) => (
    <div
        className="flex items-center justify-center text-center w-full px-5 py-5 border-b border-gray-200 bg-white text-sm"
    >
        {children}
    </div>
)


const EvenRowWrapper = ({ children }: { children: ReactNode }) => (
    <div
        className="flex items-center justify-center text-center w-full px-5 py-5 border-b border-gray-200 bg-white text-sm"
    >
        {children}
    </div>
)

function getFormattedDate(str: string): string {
    let d = new Date(str);
    let ye = new Intl.DateTimeFormat('he', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('he', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('he', { day: '2-digit' }).format(d);
    // return `${da}/${ye}/${mo}`
    let date = `${da} ב${mo}`;
    return date
    // return new Date(str).toLocaleDateString().replaceAll(".", "/")
}

function MovementsTableRow({
    tableRowData,
    setToggleEditModal,
    setToggleDeleteModal,
    setSelectedMovement
}: IMovementsTableRowProps) {

    const { t } = useTranslation();

    const SetSelectedMovement = (clicked: string) => {
        setSelectedMovement(tableRowData);
        if (clicked === 'edit') {
            setToggleEditModal(true);
        } else {
            setToggleDeleteModal(true);
        }
    }

    return (
        <div className=" w-full flex flex-row-reverse justify-around" >
            <OddRowWrapper>
                <span style={{ direction: 'rtl' }}>
                    {getFormattedDate(tableRowData.movementDate)}
                </span>
            </OddRowWrapper>
            <EvenRowWrapper>
                <span>
                    {tableRowData?.category || 'לטפל בקטגוריות'}
                </span>
            </EvenRowWrapper>
            <OddRowWrapper>
                <span>
                    ₪{tableRowData.price}
                </span>
            </OddRowWrapper>
            <EvenRowWrapper>
                <span>
                    {t(MovementSourceType[`${tableRowData.source}`])}
                </span>
            </EvenRowWrapper>
            <OddRowWrapper>
                <span>
                    {tableRowData.notes}
                </span>
            </OddRowWrapper>

            <EvenRowWrapper>
                <div className="flex gap-4 justify-center items-center">
                    <button className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-2 rounded-full inline-flex items-center
                    [&>*]:text-gray-100
                    [&>*]:hover:text-white
                    "
                        onClick={() => SetSelectedMovement('delete')}

                    >
                        <DeleteMovementIcon />

                    </button>
                    <button className="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-2 rounded-full inline-flex items-center
                    [&>*]:text-gray-100
                    [&>*]:hover:text-white
                    "
                        onClick={() => SetSelectedMovement('edit')}
                    >
                        <EditMovementIcon />
                    </button>

                </div>
            </EvenRowWrapper>

        </div>
    )
}

export default MovementsTableRow