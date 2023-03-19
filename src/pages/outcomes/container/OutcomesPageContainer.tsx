import React from 'react'
import { MovementCriteria } from '../../../models/movements/movementCriteria.model';
import { MovementType } from '../../../types/movementSource.type';
import OutcomesPageList from '../list/OutcomesPageList'
import { MovementsPageTitleIcon } from '../../../icons';
import PageTitle from '../../../components/page-title/PageTitle';
import PageTab from '../../../components/page-tab/PageTab';

export function OutcomesPageContainer() {

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

            <OutcomesPageList criteria={criteria} queryKey={'outcomes'} setRequestCriteria={setRequestCriteria} />

        </>
    )
}
