import React from 'react';
import {getRoller} from '../../resourcePaths';

export const Roller = ({width, modifier, parentClass}) =>
    <div className={parentClass}>
        <img src={getRoller()} width={width ? width : '100px'} className={modifier} alt="Загрузка"/>
    </div>
