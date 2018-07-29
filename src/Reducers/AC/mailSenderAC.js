import {API_REQUEST_ACTION, FAIL, SEND_MAIL, START, SUCCESS} from "../../CONSTANTS"
import * as creator from "../../Services/Api/Messages"
import {logoutCurrentUser} from "./authAC"

export const mailSent = sectionID => ({
    type: SEND_MAIL + START,
    sectionID
})

export const mailSended = response => ({
    type: SEND_MAIL + SUCCESS,
    payload: response
})

export const mailSentFail = (response) => ({
    type: SEND_MAIL + FAIL,
    payload: {fields: response.result, msg: response.message}
})

export const mailSender = (data, sectionID = 0) => ({
    type: API_REQUEST_ACTION,
    method: creator.MessageSendMail.METHOD,
    payload: data,
    beforeAC: (paramsContainer) => mailSent(sectionID),
    successAC: mailSended,
    fieldErrorAC: mailSentFail,
    forbiddenErrorAC: logoutCurrentUser
})


