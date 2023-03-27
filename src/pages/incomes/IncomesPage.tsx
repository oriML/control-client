import React from 'react'
import { MovementCriteria } from '../../models/movements/movement.DTO';
import { MovementType } from '../../types/movementSource.type';
import { MovementsPageTitleIcon } from '../../icons';
import MovementsTableContainer from '../../components/movements-table/container/MovementsTableContainer';
import { useTranslation } from 'react-i18next';
import { QUERY_KEYS } from '../../utils/constants';

export function IncomesPage() {

    const { t } = useTranslation();

    return (
        <section className="py-10 px-6 bg-slate-200">
            <MovementsTableContainer
                title={`${t('INCOMES_TABLE_PAGE_HEADER')}`}
                icon={MovementsPageTitleIcon}
                type={MovementType.income}
                queryKey={QUERY_KEYS.incomes}
            />
        </section>
    )
}
