import { MovementSourceType } from "../../types/movementSource.type";

export interface MovementSourceModel {
    userId: string;
    createDate: Date;
    updateDate: Date;
    total: number;
    startTotal: number;
    type: MovementSourceType;
}
