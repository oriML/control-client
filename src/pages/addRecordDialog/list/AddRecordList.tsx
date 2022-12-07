import React from 'react'
import AddRecordForm from '../../../components/addRecordForm'
import { ChildrenProps } from '../types'


export function AddRecordList({ onSubmit }: ChildrenProps) {

    return (
        <div className="border border-gray-200 bg-white rounded border-solid px-6 py-8">
            <AddRecordForm onSubmit={onSubmit} />
        </div>
    )
}
