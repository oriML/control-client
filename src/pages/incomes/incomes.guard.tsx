import React, { ReactNode } from 'react'
import { useQuery } from 'react-query';
import { MovementCriteria } from '../../models/movements/movementCriteria.model';
import { MovementType } from '../../types/movementSource.type';
import { server } from '../../utils/environment-vars'
import { useAxiosDAL } from '../../hooks/useAxiosDAL';

interface IIncomesGuardProps {
  children: ReactNode
};

function IncomesGuard({ children }: IIncomesGuardProps) {

  const criteria = React.useState({
    type: MovementType.income,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  } as MovementCriteria);

  const { REACT_APP_URI_MOVEMENTS } = process.env;

  const { Post } = useAxiosDAL();

  const getMovementsByCriteria = async () => {
    return Post(`${server}/${REACT_APP_URI_MOVEMENTS}/getAllMovements`, criteria);
  };

  const { data, isError, isSuccess, refetch, isLoading } = useQuery(
    ['incomes',
      {
        type: MovementType.income,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      } as MovementCriteria
    ],
    () => getMovementsByCriteria(),
    {
      refetchOnWindowFocus: false,
    }
    // { getNextPageParam: (page: any) => (page.current_page === page.last_page ? undefined : page.current_page + 1) },
  )

  return (
    <>
      {
        isSuccess ? children : <></>
      }
    </>
  )

}

export default IncomesGuard