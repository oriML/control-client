import React from 'react'
import { MovementCriteria } from '../../models/movements/movementCriteria.model';
import { MovementType } from '../../types/movementSource.type';
import { MovementsPageTitleIcon } from '../../icons';
import PageTitle from '../../components/page-title/PageTitle';
import PageTab from '../../components/page-tab/PageTab';
import MovementsTableContainer from '../../components/movements-table/container/MovementsTableContainer';

export function OutcomesPage() {

    const [criteria, setCriteria] = React.useState({
        type: MovementType.outcome,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    } as MovementCriteria);

    const setRequestCriteria = (newCriteria: MovementCriteria) => {
        setCriteria(newCriteria);
    }



    return (
        <>
            <PageTitle title='טבלת הוצאות חודשית' icon={MovementsPageTitleIcon} />
            <PageTab text={`${criteria.month}/${criteria.year}`} />
            <section className="py-10 px-6 bg-slate-200">
                <MovementsTableContainer criteria={criteria} type={MovementType.outcome} queryKey={'outcomes'} setRequestCriteria={setRequestCriteria} />
            </section>
        </>
    )
}
