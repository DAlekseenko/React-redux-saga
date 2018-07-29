import React from 'react';
import {LeftAside, RightAside} from '../Pages/Aside'
import {Location} from "../Pages/Partials/index"
import {Link} from "react-router-dom"
import MobileTeaser from "../Pages/User/MobileTeaser"

export default Component => props =>
    <div>
        <MobileTeaser/>
        <header className="header">
            <Location/>
            <div><Link to={'/help/about'}>Описание сервиса</Link></div>
        </header>
        <div className="main_wrap">
            <LeftAside/>
            <RightAside>
                <Component {...props} />
            </RightAside>
        </div>
    </div>

