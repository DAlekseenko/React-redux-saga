export const START = '_START'
export const SUCCESS = '_SUCCESS'
export const FAIL = '_FAIL'
export const PROCESS = '_PROCESS'
export const RESET = '_RESET'
export const FAILED = '_FAILED'
export const OVER = '_OVER'
export const ERROR = 'ERROR'

export const TOKEN = 'access_token'
export const LOCATION_ID = 'location_id'
export const REAL_IP = 'X-Real-IP'

export const IOS = 'iOS'
export const ANDROID = 'AndroidOS'

export const API_REQUEST_ACTION = 'API_REQUEST_ACTION'
export const CURRENCY = 'BYN'
export const SEND_MAIL = 'SEND_MAIL'

export const SERVER_POST_URL = '/api/post_request'

/** Роутер */
export const CHANGE_ROUTE = '@@router/LOCATION_CHANGE'
export const INIT_APP = 'INIT_APP'
export const TOUCH_LOCATION = 'TOUCH_LOCATION'

/** Наблюдатель */
export const SET_OBSERVED = 'SET_OBSERVED'

/** Поиск */
export const SEARCH_EVENT = 'SEARCH_EVENT'
/** Пользователь*/
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const GET_BALANCE = 'GET_BALANCE'
export const SET_USER_DEVICE = 'SET_USER_DEVICE'
export const CLOSED_TEASER = 'CLOSED_TEASER'
export const SEND_CODE = 'SEND_CODE'

/** Категории */
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_AUTO_COMPLETE = 'SET_AUTO_COMPLETE'
/** Диалог c ЕРИП */
export const DIALOG = 'DIALOG'
export const GET_SERVICE = 'GET_SERVICE'
export const DIALOG_DISTRIBUTOR = 'ERIP_DIALOG_DISTRIBUTOR'
/** Локации */
export const SET_LOCATION = 'SET_LOCATION'
export const CHANGE_LOCATION = 'CHANGE_LOCATION'
/** История платежей */
export const SET_HISTORY_ITEMS = 'SET_HISTORY_ITEMS'
export const SET_HISTORY_LIST = 'SET_HISTORY_LIST'
/** Настройки */
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const SET_PROFILE = 'SET_PROFILE'
export const TOTAL_LOGOUT = 'TOTAL_LOGOUT'
export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION'
export const SETTINGS_FIELDS_ERROR = 'SETTINGS_FIELDS_ERROR'
export const SETTINGS_DISTRIBUTOR = 'SETTINGS_DISTRIBUTOR'
/** Избранное*/
export const GET_FAVORITES = 'GET_FAVORITES'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const FAVORITE = 'FAVORITE'
export const UPDATE_FAVORITE = 'UPDATE_FAVORITE'
export const DELETE_FAVORITE = 'DELETE_FAVORITE'
export const FAVORITE_DISTRIBUTOR = 'FAVORITE_DISTRIBUTOR'
export const GET_FAVORITE_ITEM = 'GET_FAVORITE_ITEM'
/** Мои счета */
export const GET_BANNERS = 'GET_BANNERS'
export const CREATE_USER_DATA_WITH_BANNER = 'CREATE_USER_DATA_WITH_BANNER'
export const CREATE_USER_DATA = 'CREATE_USER_DATA'
export const GET_USER_DATA = 'GET_USER_DATA'
export const GET_INVOICES = 'GET_INVOICES'
export const USER_DATA_SEARCH = 'USER_DATA_SEARCH'
export const FOCUS_SERVICE = 'FOCUS_SERVICE'
export const DELETE_USER_DATA = 'DELETE_USER_DATA'
export const EDIT_USER_DATA = 'EDIT_USER_DATA'
export const GET_INVOICE_USER_DATA = 'GET_INVOICE_USER_DATA'
/** флаги */
export const ACCOUNTS_SLIDER_LOADED = 0b00001
export const ACCOUNTS_USER_DATA_LOADED = 0b00010
export const ACCOUNTS_INVOICES_LOADED = 0b00100
/** Ассист */
export const RECHARGE = 'RECHARGE'
export const RECHARGE_INFO = 'RECHARGE_INFO'
export const SET_ASSIST_PARAMS = 'SET_ASSIST_PARAMS'
export const GET_RECHARGE_DIALOG = 'GET_RECHARGE_DIALOG'
/** Счета*/
export const GET_RECHARGE_REQUIREMENT = 'GET_RECHARGE_REQUIREMENT'
export const GET_RECHARGE_MODEL = 'GET_RECHARGE_MODEL'
export const PAY_INVOICE = 'PAY_INVOICE'
