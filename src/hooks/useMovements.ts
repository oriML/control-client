import axios from "axios"
import { useState } from "react";
import { useQuery } from "react-query";
import { AddMovementFormModel } from "../models/movements/movement.model";
import { MovementCriteria } from "../models/movements/movementCriteria.model";
import { MovementResponseModel } from "../models/movements/movementResponse.model";
import { MovementType } from "../types/movementSource.type";
import { server } from "../utils/environment-vars";
import { useAxiosDAL } from "./shared/useAxiosDAL";

export const useMovements = (type: number, queryKey: string) => {

    const initCriteriaState = {
        type: type,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    } as MovementCriteria;


    const { REACT_APP_URI_MOVEMENTS } = process.env;

    const [criteria, setCriteria] = useState<MovementCriteria>(initCriteriaState);

    const { data, isError, isSuccess, refetch, isLoading } = useQuery(
        [queryKey, criteria],
        () => getMovementsByCriteria(),
        // { getNextPageParam: (page: any) => (page.current_page === page.last_page ? undefined : page.current_page + 1) },
    )

    const { Post, Delete } = useAxiosDAL();

    const getNextMonthResults = () => {

        if (criteria.month <= 12) {

            const newCriteria: MovementCriteria = {
                ...criteria,
                year: (criteria.month === 12 ? criteria.year + 1 : criteria.year),
                month: (criteria.month === 12 ? 1 : criteria.month + 1)
            } as MovementCriteria;

            setCriteria(newCriteria);
        }
    };

    const getPrevMonthResults = () => {
        if (criteria.month >= 1) {

            const newCriteria: MovementCriteria = {
                ...criteria,
                year: (criteria.month === 1 ? criteria.year - 1 : criteria.year),
                month: (criteria.month === 1 ? 12 : criteria.month - 1)
            } as MovementCriteria;

            setCriteria(newCriteria);
        }
    };

    const getMovementsByCriteria = async () => {
        return Post(`${server}${REACT_APP_URI_MOVEMENTS}/getAllMovements`, criteria);
    };

    const updateMovement = async (movement: MovementResponseModel | AddMovementFormModel) => {
        try {
            await Post(`${server}/${REACT_APP_URI_MOVEMENTS}/update/${movement?._id}`
                , movement
            );
            refetch();
        } catch (error) {
            alert(error);
        }
    }

    const deleteMovement = async (id: string) => {
        try {
            await Delete(`${server}${REACT_APP_URI_MOVEMENTS}/delete/${id}`);
            refetch();
        } catch (error) {
            alert(error);
        }
    }

    return {
        getNextMonthResults,
        getPrevMonthResults,
        getMovementsByCriteria,
        updateMovement,
        deleteMovement,
        data,
        refetch,
        isError,
        isSuccess,
        isLoading
    }

}