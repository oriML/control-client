import React, { ReactNode } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import { useAxiosDAL } from '../../../hooks/useAxiosDAL'
import { GetAllMovementsResponseModel } from '../../../models/movements/getAllMovementsResponse.model'
import { MovementCriteria } from '../../../models/movements/movementCriteria.model'
import { MovementResponseModel } from '../../../models/movements/movementResponse.model'
import { movementsTableColumns } from '../../../utils/constants'
import AddRecordForm from '../../addRecordForm'
import AlertModal from '../../alertModal/AlertModal'
import SubmitModal from '../../submitModal/SubmitModal'
import MovementsTableList from '../list/MovementsTableList'

import { server } from '../../../utils/environment-vars'
import { useTranslation } from 'react-i18next'

interface IMovementsTableContainerProps {
    criteria: MovementCriteria
    queryKey: string
    setRequestCriteria: (newCriteria: MovementCriteria) => void

}

const ColumnHeader = ({ children }: { children?: ReactNode }) => (
    <div
        className="w-full px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 tracking-wider"
    >
        {children}
    </div>
)

export function MovementsTableContainer({ criteria, queryKey, setRequestCriteria }: IMovementsTableContainerProps) {

    const { t } = useTranslation();

    const { REACT_APP_URI_MOVEMENTS } = process.env;

    const { Post, Delete } = useAxiosDAL();

    const [toggleEditModal, setToggleEditModal] = React.useState<boolean>(false);

    const [toggleDeleteModal, setToggleDeleteModal] = React.useState<boolean>(false);

    const [selectedMovement, setSelectedMovement] = React.useState<MovementResponseModel | undefined>(undefined);

    const loadMoreResultsRef = React.useRef(null);

    const getNextMonthResults = () => {

        if (criteria.month <= 12) {

            const newCriteria: MovementCriteria = {
                ...criteria,
                month: criteria.month + (criteria.month === 12 ? 0 : 1)
            } as MovementCriteria;

            setRequestCriteria(newCriteria);
        }
    };

    const getPrevMonthResults = () => {
        if (criteria.month >= 1) {

            const newCriteria: MovementCriteria = {
                ...criteria,
                month: criteria.month - (criteria.month === 1 ? 0 : 1)
            } as MovementCriteria;

            setRequestCriteria(newCriteria);
        }
    };

    const getMovementsByCriteria = async () => {
        return Post(`${server}/${REACT_APP_URI_MOVEMENTS}/getAllMovements`, criteria);
    };

    const updateMovement = async (movement: MovementResponseModel) => {
        try {
            await Post(`${server}/${REACT_APP_URI_MOVEMENTS}/update/${movement?._id}`
                , movement
            );
            setSelectedMovement(undefined);
            setToggleEditModal(false);
            refetch();
        } catch (error) {
            alert(error);
        }
    }

    const deleteMovement = async () => {
        try {
            await Delete(`${server}/${REACT_APP_URI_MOVEMENTS}/delete/${selectedMovement?._id}`);
            setSelectedMovement(undefined);
            setToggleDeleteModal(false);
            refetch();
        } catch (error) {
            alert(error);
        }
    }

    const { data, isError, isSuccess, refetch, isLoading } = useQuery(
        [queryKey, criteria],
        () => getMovementsByCriteria(),
        // { getNextPageParam: (page: any) => (page.current_page === page.last_page ? undefined : page.current_page + 1) },
    )



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
                                    <div className="min-h-[440px] bg-gray-100 overflow-auto">
                                        <MovementsTableList
                                            tableList={data?.data?.movements}
                                            setToggleDeleteModal={setToggleDeleteModal}
                                            setToggleEditModal={setToggleEditModal}
                                            setSelectedMovement={setSelectedMovement}

                                        />
                                    </div>

                                    {/* 
                                    LAODER!!!!!!!!!!!!!!!!!!!!!!!
                                */}
                                    <div className="px-5 py-5 bg-white border-t flex flex-row-reverse xs:flex-row items-center justify-center xs:justify-between">
                                        <div className="mt-2 inline-flex xs:mt-0" style={{ marginRight: "50%" }}>
                                            <button
                                                className="text-sm text-indigo-50 transition duration-150 hover:bg-green-400 bg-green-600 font-semibold py-2 px-4 rounded-l"
                                                onClick={getPrevMonthResults}
                                            >
                                                חודש קודם
                                            </button>
                                            &nbsp; &nbsp;
                                            <button
                                                className="text-sm text-indigo-50 transition duration-150 hover:bg-green-400 bg-green-600 font-semibold py-2 px-4 rounded-r"
                                                onClick={getNextMonthResults}
                                            >
                                                חודש הבא
                                            </button>
                                        </div>
                                        <div className="mt-2 mr-auto text-sm text-indigo-50 transition duration-150  bg-green-600 font-semibold py-2 px-4 rounded">
                                            {
                                                data?.data?.info?.sum > 0 ?
                                                    <span>{t("SUM_TITLE", { sum: data?.data?.info?.sum })}</span>
                                                    :
                                                    t("NO_SUM")
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
                                    onSubmit={updateMovement}
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
                        onSubmit={deleteMovement}
                    />
                    : null
            }
        </>
    )
}

export default MovementsTableContainer