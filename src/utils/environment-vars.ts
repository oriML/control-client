
const {
    NODE_ENV,
    REACT_APP_DEV_ACCESS_URI,
    REACT_APP_PROD_ACCESS_URI
} = process.env;

export const server = NODE_ENV == "production" ? REACT_APP_PROD_ACCESS_URI : REACT_APP_DEV_ACCESS_URI;