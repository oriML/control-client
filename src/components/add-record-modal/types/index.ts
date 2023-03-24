import { AddMovementFormModel } from "../../../models/movements/movement.model";
import { UseMutateFunction } from 'react-query'
import { AxiosResponse } from 'axios'
import { MovementResponseModel } from "../../../models/movements/movementResponse.model";

export type ChildrenProps = {
    onSubmit: (model: AddMovementFormModel) => void,
}