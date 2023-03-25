import { useAxiosDAL } from '../../hooks/shared/useAxiosDAL'
import { useMutation } from 'react-query'
import { Movement } from '../../models/movements/movement.DTO'

import { server } from '../../utils/environment-vars'
import { AddRecordForm } from '../add-record-form/AddRecordForm'

export function AddRecordModal(): JSX.Element {

  const {
    REACT_APP_URI_MOVEMENTS
  } = process.env;

  const { mutateAsync } = useMutation((data: Movement) => Post(`${server}/${REACT_APP_URI_MOVEMENTS}/addMovement`, data));

  async function onSubmit(data: Movement) {
    try {
      await mutateAsync(data);
    } catch (err) {
      // error state = err
    }

  }

  const { Post } = useAxiosDAL();

  return (
    <section className="w-full bg-slate-100 py-8">
      <h1 className="text-2xl text-gray-700 font-bold mb-8 text-center">הזנת תנועה חדשה</h1>

      <div className="w-4/12 mx-auto min-w-[270px]">
        <div className="border border-gray-200 bg-white rounded border-solid px-6 py-8">
          <AddRecordForm onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  )
}