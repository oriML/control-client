import { MovementResponseModel } from "./movementResponse.model";


export interface GetAllMovementsResponseModel {
    year: string;
    month: string;
    movements: MovementResponseModel[];
}

