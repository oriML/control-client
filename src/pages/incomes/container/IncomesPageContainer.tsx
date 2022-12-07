import React from 'react'
import { MovementCriteria } from '../../../models/movements/movementCriteria.model';
import { MovementType } from '../../../types/movementSource.type';
import IncomesPageList from '../list/IncomesPageList'
import { MovementsPageTitleIcon } from '../../../icons';
import PageTitle from '../../../components/pageTitle/PageTitle';
import PageTab from '../../../components/pageTab/PageTab';

export function IncomesPageContainer() {

    const [criteria, setCriteria] = React.useState({
        type: MovementType.income,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    } as MovementCriteria);

    const setRequestCriteria = (newCriteria: MovementCriteria) => {
        setCriteria(newCriteria);
    }



    return (
        <>
            <PageTitle title='טבלת הכנסות חודשית' icon={MovementsPageTitleIcon} />
            <PageTab text={`${criteria.month}/${criteria.year}`} />

            <IncomesPageList criteria={criteria} queryKey={'incomes'} setRequestCriteria={setRequestCriteria} />

        </>
    )
}
