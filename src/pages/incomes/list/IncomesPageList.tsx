import React from 'react'
import MovementsTableContainer from '../../../components/movements-table/container/MovementsTableContainer'
import { MovementCriteria } from '../../../models/movements/movementCriteria.model'

interface IIncomesPageListProps {
    criteria: MovementCriteria
    queryKey: string
    setRequestCriteria: (newCriteria: MovementCriteria) => void
}

function IncomesPageList({ criteria, queryKey, setRequestCriteria }: IIncomesPageListProps) {
    return (
        <section className="py-10 px-6 bg-slate-200">
            <MovementsTableContainer criteria={criteria} queryKey={queryKey} setRequestCriteria={setRequestCriteria} />
            {/* {children} */}
        </section>
    )
}

export default IncomesPageList