import React from 'react';
import {hydrate} from 'react-dom';
import Router from './Components/App/ClientRouter';

import './StylusCss/main.styl';

hydrate(<Router/>, document.getElementById('react-view'));
