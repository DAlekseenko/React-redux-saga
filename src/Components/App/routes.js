import React from 'react'

import {Categories} from '../Pages/Categories';
import {fetchCategories} from '../../Reducers/Ducks/categories/categories'

import Social from '../Pages/Help/Social';
import ServiceDescription from '../Pages/Help/ServiceDescription';
import {UserAgreementLayout as UserAgreement} from '../Pages/Help/UserAgreement';
import {getDescription, getSocial, getUserAgreement} from '../../Reducers/Ducks/help/help';

import Accounts from '../Pages/Accounts'
import {Payments, RechargeDialog} from "../Pages/Dialog"
import Tools from "../Pages/Tools/Tools"
import {RechargeInfo} from '../Pages/Assist'
import {getHistoryItems, getHistoryList} from "../../Reducers/AC/payHistoryAC"
import {getFavorites} from "../../Reducers/AC/favoritesAC"
import {History, HistoryDetailItem} from "../Pages/History"
import {Favorites, Favorite} from "../Pages/Favorites"
import {loadBanners, loadUserData, loadInvoices} from '../../Reducers/AC/accountsAC'
import {initDialog, loadService} from '../../Reducers/AC/eripDialogAC'
import {getRechargeInfo} from "../../Reducers/AC/assistAC"
import {PayInvoices} from "../Pages/Invoices"
import {RechargePhone} from "../Pages/Assist"
import {getRechargeModel, getRechargeRequirement} from "../../Reducers/AC/payIvoicesAC"

import Error from '../Pages/Error/Error';

export default [
    {
        path: ['/', '/\?(.+)'],
        exact: true,
        component: Categories,
        title: 'Главная страница',
        onRouteChangeFetch: fetchCategories,
        fetchData: fetchCategories
    },
    {
        path: ['/categories/:id(\\d{1,11})', '/categories/:id(\\d{1,11})\?(.+)'],
        exact: true,
        component: Categories,
        title: 'Категория',
        onRouteChangeFetch: fetchCategories,
        fetchData: fetchCategories
    },
    {
        path: ['/payments-history', '/payments-history\?(.+)'],
        needAuth: true,
        exact: true,
        component: History,
        title: 'История платежей',
        fetchData: getHistoryList,
        onRouteChangeFetch: getHistoryList,
    },
    {
        path: '/history-items/:transaction_uuids',
        exact: true,
        component: HistoryDetailItem,
        title: 'Оплата услуги',
        fetchData: getHistoryItems
    },
    {
        path: ['/payments/:id(\\d{11})', '/payments/:id(\\d{11})\?(.+)'],
        exact: true,
        component: Payments,
        onRouteChangeFetch: [initDialog, loadService],
        fetchData: loadService,
        title: 'Платежи'
    },
    {
        path: '/help/about',
        exact: true,
        component: ServiceDescription,
        title: 'Описание сервиса',
        fetchData: getDescription,
        onRouteChangeFetch: getDescription,
    },
    {
        path: '/help/user-agreement',
        exact: true,
        component: UserAgreement,
        fetchData: getUserAgreement,
        onRouteChangeFetch: getUserAgreement,
        title: 'Пользовательское соглашение'
    },
    {
        path: '/help/social',
        exact: true,
        component: Social,
        fetchData: getSocial,
        onRouteChangeFetch: getSocial,
    },
    {
        path: '/settings',
        exact: true,
        needAuth: true,
        component: Tools,
        title: 'Настройки пользователя',
        fetchData: getUserAgreement,
        onRouteChangeFetch: getUserAgreement
    },
    {
        path: ['/accounts/edit/:div_id(\\d+)/:user_data_id(\\d+)', '/accounts/:parent_id(\\d+)\?/:search(.*)', '/accounts'],
        exact: true,
        needAuth: true,
        component: Accounts,
        title: 'Мои счета',
        onRouteChangeFetch: [loadBanners, loadUserData, loadInvoices],
        fetchData: [loadBanners, loadUserData, loadInvoices]
    },
    {
        path: '/favorites',
        exact: true,
        needAuth: true,
        component: Favorites,
        title: 'Избранные платежи',
        fetchData: getFavorites
    },
    {
        path: '/favorites/:id(\\d+)',
        exact: true,
        needAuth: true,
        component: Favorite,
        title: 'Просмотр платежа',
        fetchData: getFavorites
    },
    {
        path: '/recharge-dialog',
        exact: true,
        needAuth: true,
        component: RechargeDialog,
        title: 'Оплата услуги',
    },
    {
        path: '/recharge-ok*',
        needAuth: true,
        component: RechargeInfo,
        title: 'Результат платежа',
        fetchData: getRechargeInfo
    },
    {
        path: '/recharge-no*',
        exact: true,
        needAuth: true,
        component: RechargeInfo,
        title: 'Результат платежа',
        fetchData: params => getRechargeInfo(params, false)
    },
    {
        path: '/pay-invoices/:transaction_uuids',
        exact: true,
        needAuth: true,
        component: PayInvoices,
        title: 'Оплата счета',
        onRouteChangeFetch: [loadInvoices, getRechargeRequirement],
        fetchData: [loadInvoices, getRechargeRequirement]
    },
    {
        path: '/recharge-phone*',
        exact: true,
        needAuth: true,
        component: RechargePhone,
        title: 'Пополнение баланса мобильного телефона',
        onRouteChangeFetch: getRechargeModel,
        fetchData: getRechargeModel
    },
    {
        path: '*',
        component: Error,
        title: 'Ошибка 404. Страница не найдена',
    }
];
