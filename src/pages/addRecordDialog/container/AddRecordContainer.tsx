import React from 'react'
import { AddRecordList } from '../list/AddRecordList'
import { useAxiosDAL } from '../../../hooks/useAxiosDAL'
import { MovementModel } from '../../../models/movements/movement.model'
import { useMutation } from 'react-query'
import { MovementResponseModel } from '../../../models/movements/movementResponse.model'

import { server } from '../../../utils/environment-vars'

export function AddRecordContainer(): JSX.Element {

  const {
    REACT_APP_URI_MOVEMENTS
  } = process.env;

  const { mutateAsync } = useMutation((data: MovementResponseModel) => Post(`${server}/${REACT_APP_URI_MOVEMENTS}/addMovement`, data));

  async function onSubmit(data: MovementResponseModel) {
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

      <div className="w-4/12 mx-auto">
        <AddRecordList onSubmit={onSubmit} />
      </div>
    </section>
  )
}