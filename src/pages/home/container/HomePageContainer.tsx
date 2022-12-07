import React from 'react'
import { useLocation } from 'react-router-dom'
import HomePageList from '../list/HomePageList'

export function HomePageContainer() {

    const user = useLocation();
    return (
        <HomePageList />
    )
}

// export default HomePageContainer