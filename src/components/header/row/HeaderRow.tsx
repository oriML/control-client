import React from 'react'
import { Link } from 'react-router-dom'

interface IHeaderRowProps {
    title: string,
    route: string
}

function HeaderRow({ title, route }: IHeaderRowProps) {
    return (
        <div className="text-white hover:text-green-100 cursor-pointer">
            <Link to={route}>
                <span>
                    {title}
                </span>
            </Link>
        </div>
    )
}

export default HeaderRow