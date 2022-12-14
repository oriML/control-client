import { MovementType, MovementSourceType } from "../../types/movementSource.type";
import { MovementCategoryModel } from "../category/category.model";

export interface MovementModel {
    userId: string;
    movementDate: Date;
    price: number;
    notes: string;
    source: number;
    type: string;
    category: MovementCategoryModel[];
}

export interface AddMovementFormModel {
    _id?: string;
    movementDate: string;
    price: number;
    notes: string;
    source: number;
    type: number;
    category: string;
}
