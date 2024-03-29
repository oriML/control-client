import { ReactNode, useState } from 'react'
import { Movement, MovementCriteria } from '../../../models/movements/movement.DTO'
import { movementsTableColumns } from '../../../utils/constants'
import AddRecordForm from '../../add-record-form'
import AlertModal from '../../alert-modal/AlertModal'
import MovementsTableList from '../list/MovementsTableList'
import { useTranslation } from 'react-i18next'
import Loader from '../../loader/Loader'
import SubmitModal from '../../submit-modal/SubmitModal'
import { useMovements } from '../../../hooks/useMovements'
import PageTitle from '../../page-title/PageTitle'
import PageTab from '../../page-tab/PageTab'
interface IMovementsTableContainerProps {
    title: string,
    icon: () => JSX.Element,
    queryKey: string
    type: number
}

const ColumnHeader = ({ children }: { children?: ReactNode }) => (
    <div
        className="w-full px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 tracking-wider"
    >
        {children}
    </div>
)

export function MovementsTableContainer({ title, icon, queryKey, type }: IMovementsTableContainerProps) {

    const { t } = useTranslation();
    const {
        getNextMonthResults,
        getPrevMonthResults,
        updateMovement,
        deleteMovement,
        response,
        isSuccess,
        isLoading,
        criteria
    } = useMovements(type, queryKey);

    const [toggleEditModal, setToggleEditModal] = useState<boolean>(false);

    const [toggleDeleteModal, setToggleDeleteModal] = useState<boolean>(false);

    const [selectedMovement, setSelectedMovement] = useState<Movement | undefined>(undefined);

    const resetUI = () => {
        setSelectedMovement(undefined);
        setToggleDeleteModal(false);
        setToggleEditModal(false);
    }

    const onUpdate = (model: Movement) => {
        if (model != null) {
            updateMovement(model);
            resetUI();
        } else {
            console.error("model is null")
        }
    }

    const onDelete = () => {
        if (selectedMovement !== undefined && selectedMovement?._id) {
            deleteMovement(selectedMovement._id);
            resetUI();
        } else {
            console.error("selected movement is undeifned or null")
        }
    }

    return (
        <>
            <PageTitle title={title} icon={icon} />
            <PageTab text={`${criteria.month}/${criteria.year}`} />
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
                                                isSuccess &&
                                                    (response?.data !== undefined) &&
                                                    (response?.data?.data?.length > 0) ?
                                                    <MovementsTableList
                                                        tableList={response?.data?.data}
                                                        setToggleDeleteModal={setToggleDeleteModal}
                                                        setToggleEditModal={setToggleEditModal}
                                                        setSelectedMovement={setSelectedMovement}

                                                    />
                                                    :
                                                    <span>{t('NO_RESULTS_MESSAGE')}</span>
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
                                                    {t("SUM_TITLE", { sum: response?.data?.sum ?? 0 })}
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
                        title={`${t('EDIT_MOVEMENT_TITLE')}`}
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
                        title={`${t('DELETE_MOVEMENT_TEXT')}`}
                        text={`${t('DELETE_MOVEMENT_CONFIRM_TEXT')}`}
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