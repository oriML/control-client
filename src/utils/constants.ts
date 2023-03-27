import {
    MenuRowMainIcon,
    MenuRowAddMovementIcon,
    MenuRowIncomesIcon,
    MenuRowOutcomesIcon,
    MenuRowProfileIcon,
    MenuRowTemplatesIcon,
} from "../icons";
import { server } from "./environment-vars";





export const menuRows = [
    {
        title: 'ראשי',
        path: '/',
        icon: MenuRowMainIcon
    },
    {
        title: 'תנועה חדשה',
        path: '/add-movement',
        icon: MenuRowAddMovementIcon
    },
    {
        title: 'הכנסות',
        path: '/incomes',
        icon: MenuRowIncomesIcon
    },
    {
        title: 'הוצאות',
        path: '/outcomes',
        icon: MenuRowOutcomesIcon
    },
    {
        title: 'תבניות תנועה',
        path: '/templates',
        icon: MenuRowTemplatesIcon
    },
    {
        title: 'פרופיל משתמש',
        path: '/profile',
        icon: MenuRowProfileIcon
    }
];

export const movementsTableColumns = [
    {
        title: 'תאריך'
    },
    {
        title: 'קטגוריה'
    },
    {
        title: 'מחיר'
    },
    {
        title: 'מקור תנועה'
    },
    {
        title: 'הערות'
    },
]


export const apiRoutes = {
    movements: {
        getMovements: server + `movement/getAllMovements/`
    }
}
export const enum QUERY_KEYS {
    incomes = 'incomes',
    outcomes = 'outcomes'
}