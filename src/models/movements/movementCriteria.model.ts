
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
