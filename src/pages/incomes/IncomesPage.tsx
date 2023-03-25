import React from 'react'
import { MovementCriteria } from '../../models/movements/movement.DTO';
import { MovementType } from '../../types/movementSource.type';
import { MovementsPageTitleIcon } from '../../icons';
import MovementsTableContainer from '../../components/movements-table/container/MovementsTableContainer';

export function IncomesPage() {

    return (
        <section className="py-10 px-6 bg-slate-200">
            <MovementsTableContainer
                title='טבלת הכנסות חודשית'
                icon={MovementsPageTitleIcon}
                type={MovementType.income}
                queryKey={'incomes'}
            />
        </section>
    )
}
