import { MouseEventHandler, ReactNode, useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import { MovementCriteria } from '../../../models/movements/movementCriteria.model'
import { MovementResponseModel } from '../../../models/movements/movementResponse.model'
import { movementsTableColumns } from '../../../utils/constants'
import AddRecordForm from '../../add-record-form'
import AlertModal from '../../alert-modal/AlertModal'
import MovementsTableList from '../list/MovementsTableList'

import { useTranslation } from 'react-i18next'
import Loader from '../../loader/Loader'
import SubmitModal from '../../submit-modal/SubmitModal'
import { useMovements } from '../../../hooks/useMovements'
import { MovementType } from '../../../types/movementSource.type'
import { AddMovementFormModel } from '../../../models/movements/movement.model'

interface IMovementsTableContainerProps {
    criteria: MovementCriteria
    queryKey: string
    type: number
    setRequestCriteria: (newCriteria: MovementCriteria) => void

}

const ColumnHeader = ({ children }: { children?: ReactNode }) => (
    <div
        className="w-full px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 tracking-wider"
    >
        {children}
    </div>
)

export function MovementsTableContainer({ criteria, queryKey, type, setRequestCriteria }: IMovementsTableContainerProps) {

    const { t } = useTranslation();
    const {
        getNextMonthResults,
        getPrevMonthResults,
        getMovementsByCriteria,
        updateMovement,
        deleteMovement,
        data,
        refetch,
        isError,
        isSuccess,
        isLoading
    } = useMovements(type, queryKey);

    const [toggleEditModal, setToggleEditModal] = useState<boolean>(false);

    const [toggleDeleteModal, setToggleDeleteModal] = useState<boolean>(false);

    const [selectedMovement, setSelectedMovement] = useState<MovementResponseModel | undefined>(undefined);

    const resetUI = () => {
        setSelectedMovement(undefined);
        setToggleDeleteModal(false);
        setToggleEditModal(false);
    }

    const onUpdate = (model: AddMovementFormModel) => {
        if (model != null) {
            updateMovement(model);
            resetUI();
        } else {
            console.error("model is null")
        }
    }

    const onDelete = () => {
        if (selectedMovement != undefined && selectedMovement?._id) {
            deleteMovement(selectedMovement._id);
            resetUI();
        } else {
            console.error("selected movement is undeifned or null")
        }
    }

    return (
        <>
            <section className="-mx-4 px-4 sm:px-8 overflow-x-auto min-h-[470px]">
                <div className="w-full px-4">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <div className="min-w-full leading-normal">
                            <div className="max-w-full overflow-x-auto">
                                <section className="w-full">
                                    <div className="flex flex-row-reverse justify-around text-center">
                                        {
                                            movementsTableColumns.map(column => (
                                                <ColumnHeader key={column.title}>
                                                    {column.title}
                                                </ColumnHeader>
                                            ))
                                        }
                                        <ColumnHeader />

                                    </div>
                                    <div className="min-h-[540px] max-h-[540px] bg-gray-100 overflow-auto">
                                        {
                                            isLoading ?
                                                <Loader />
                                                :
                                                isSuccess && data?.data?.movements?.length > 0 ?
                                                    <MovementsTableList
                                                        tableList={data?.data?.movements}
                                                        setToggleDeleteModal={setToggleDeleteModal}
                                                        setToggleEditModal={setToggleEditModal}
                                                        setSelectedMovement={setSelectedMovement}

                                                    />
                                                    :
                                                    <span>No data to show</span>
                                        }
                                    </div>

                                    <div className="px-5 py-5 bg-white border-t flex flex-row-reverse xs:flex-row items-center justify-center xs:justify-between relative">
                                        <div className="mt-2 inline-flex xs:mt-0">
                                            <button
                                                className="text-sm text-indigo-50 transition duration-150 hover:bg-green-400 bg-green-600 font-semibold py-2 px-4 rounded-l"
                                                onClick={getPrevMonthResults}
                                            >
                                                {t('PREV_MONTH')}
                                            </button>
                                            &nbsp; &nbsp;
                                            <button
                                                className="text-sm text-indigo-50 transition duration-150 hover:bg-green-400 bg-green-600 font-semibold py-2 px-4 rounded-r"
                                                onClick={getNextMonthResults}
                                            >
                                                {t('NEXT_MONTH')}
                                            </button>
                                        </div>
                                        <div className="mt-2 mr-auto text-sm text-indigo-50 transition duration-150  bg-green-600 font-semibold py-2 px-4 rounded absolute left-[1%]">
                                            {
                                                <span>
                                                    {t("SUM_TITLE", { sum: data?.data?.info?.sum ?? 0 })}
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                toggleEditModal ?
                    <SubmitModal
                        title={`ערוך תנועה`}
                        text={""}
                        closeModal={() => setToggleEditModal(false)}
                        children={
                            <div className="m-auto w-full px-2 py-12 bg-white border-0 shadow-sm">
                                <AddRecordForm
                                    onSubmit={onUpdate}
                                    movement={selectedMovement}
                                />
                            </div>
                        }
                    // onSubmit={updateMovement}
                    />
                    : null
            }

            {
                toggleDeleteModal ?
                    <AlertModal
                        title={`מחק תנועה`}
                        text={`אתה עומד למחוק תנועה. אתה בטוח שברצונך להמשיך?`}
                        closeModal={() => setToggleDeleteModal(false)}
                        children={<></>}
                        onSubmit={onDelete}
                    />
                    : null
            }
        </>
    )
}

export default MovementsTableContainer