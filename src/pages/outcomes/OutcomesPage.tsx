import { MovementType } from '../../types/movementSource.type';
import { MovementsPageTitleIcon } from '../../icons';
import MovementsTableContainer from '../../components/movements-table/container/MovementsTableContainer';
import { useTranslation } from 'react-i18next';
import { QUERY_KEYS } from '../../utils/constants';

export function OutcomesPage() {

    const { t } = useTranslation();

    return (
        <section className="py-10 px-6 bg-slate-200">
            <MovementsTableContainer
                title={`${t('OUTCOMES_TABLE_PAGE_HEADER')}`}
                icon={MovementsPageTitleIcon}
                type={MovementType.outcome}
                queryKey={QUERY_KEYS.outcomes}
            />
        </section>
    )
}
