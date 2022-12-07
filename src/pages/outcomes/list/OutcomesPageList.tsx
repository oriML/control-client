import React from 'react'
import MovementsTableContainer from '../../../components/movementsTable/container/MovementsTableContainer'
import { MovementCriteria } from '../../../models/movements/movementCriteria.model'
interface IOutcomesPageListProps {
    criteria: MovementCriteria
    queryKey: string
    setRequestCriteria: (newCriteria: MovementCriteria) => void
}

function OutcomesPageList({ criteria, queryKey, setRequestCriteria }: IOutcomesPageListProps) {
    return (
        <section className="py-10 px-6 bg-slate-200">
            <MovementsTableContainer criteria={criteria} queryKey={queryKey} setRequestCriteria={setRequestCriteria} />
            {/* {children} */}
        </section>
    )
}

export default OutcomesPageList