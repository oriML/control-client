import { MovementSourceType } from "../../types/movementSource.type";

export interface Movement {
    _id?: string;
    movementDate: string;
    price: number;
    notes: string;
    source: number;
    type: number;
    category: string;
}

export interface MovementCriteria {
    type: number;
    createDate?: Date;
    movementDate?: Date;
    year: number;
    month: number;
    source?: number;
    pageNumber?: number;
    pageSize?: number;
}

// for future implement
export interface MovementSourceModel {
    userId: string;
    createDate: Date;
    updateDate: Date;
    total: number;
    startTotal: number;
    type: MovementSourceType;
}
