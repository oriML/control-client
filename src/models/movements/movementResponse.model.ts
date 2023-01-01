import { MovementCategoryModel } from "../category/category.model";

export interface MovementResponseModel {
    _id: string;
    movementDate: string;
    price: number;
    notes: string;
    source: number;
    type: number;
    category: MovementCategoryModel;
}