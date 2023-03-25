import { MovementType } from '../../types/movementSource.type';
import { MovementsPageTitleIcon } from '../../icons';
import MovementsTableContainer from '../../components/movements-table/container/MovementsTableContainer';

export function OutcomesPage() {

    return (
        <section className="py-10 px-6 bg-slate-200">
            <MovementsTableContainer
                title='טבלת הוצאות חודשית'
                icon={MovementsPageTitleIcon}
                type={MovementType.outcome}
                queryKey={'outcomes'}
            />
        </section>
    )
}
