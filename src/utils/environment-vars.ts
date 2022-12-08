
const {
    NODE_ENV,
    REACT_APP_DEV_ACCESS_URI,
    REACT_APP_PROD_ACCESS_URI
} = process.env;

console.log(NODE_ENV)

export const server = NODE_ENV === "Production" ? REACT_APP_PROD_ACCESS_URI : REACT_APP_DEV_ACCESS_URI;