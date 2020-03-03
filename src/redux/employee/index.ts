import { level } from './../../constants/options';
import { Dispatch } from 'redux';
import _ from 'lodash';
import _remove from 'lodash/remove';
import { get, post } from '../../until/request';
import { EmployeeResponse, EmployeeRequest, DeleteRequest, EmployeeInfo, CreateRequest, UpdateRequest } from './../../interface/employee';

import {
    GET_EMPLOYEE,
    CREATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    UPDATE_EMPLOYEE
} from '../../constants/actions';

import {
    department
} from '../../constants/options';

import {
    GET_EMPLOYEE_URL,
    CREATE_EMPLOYEE_URL,
    DELETE_EMPLOYEE_URL,
    UPDATE_EMPLOYEE_URL
} from '../../constants/urls';
import { callbackify } from 'util';

type Action = {
    type: string
    payload: any
}

type State = Readonly<{
    employeeList: EmployeeResponse
}>
const initialState: State = {
    employeeList: undefined
}

export function getEmployee(params: EmployeeRequest, callback: () => void) {
    return (dispatch: Dispatch) => {
        get(GET_EMPLOYEE_URL, params).then((res) => {
            dispatch({
                type: GET_EMPLOYEE,
                payload: res.data
            })
            callback()
        })
    }
}

export function createEmployee(param: CreateRequest, callback: () => void) {
    return (dispatch: Dispatch) => {
        post(CREATE_EMPLOYEE_URL, param).then(res => {
            dispatch({
                type: CREATE_EMPLOYEE,
                payload: {
                    name: param.name,
                    departmentId: department[param.dapartmentId],
                    hiredate: param.hiredate,
                    level: level[param.levelId],
                    leveId: param.levelId,
                    ...res.data
                }
            })
        })

        callback()
    }
}

export function deleteEmployee(params: DeleteRequest) {
    return (dispatch: Dispatch) => {
        post(DELETE_EMPLOYEE, params).then((res) => {
            dispatch({
                type: DELETE_EMPLOYEE,
                id: params.id
            })
        })
    }
}

export function updateEmployee(param: UpdateRequest, callback: () => void) {
    return (dispatch: Dispatch) => {
        post(UPDATE_EMPLOYEE_URL, param).then(res => {
            dispatch({
                type: UPDATE_EMPLOYEE,
                payload: param
            })
        })
        callback()
    }
}

export default function (state = initialState, action: Action) {
    switch(action.type) {
        case GET_EMPLOYEE :
            return {
                ...state,
                employeeList: action.payload
            }
        case CREATE_EMPLOYEE: 
            let newList = [action.payload, ...(state.employeeList as EmployeeInfo [])];
            return {
                ...state,
                employeeList: newList
            }
        case DELETE_EMPLOYEE:
            let reducerList = [...(state.employeeList as EmployeeInfo [])]
            _remove(reducerList, (item) => item.id = action.payload)

            return {
                state,
                employeeList: reducerList
            }
        case UPDATE_EMPLOYEE:
            let updateList = [...(state.employeeList as EmployeeInfo [])];
            let item: UpdateRequest = action.payload;
            let index = _.findIndex(updateList, {
                id: item.id
            })
            updateList[index] = {
                id: item.id,
                key: item.id,
                name: item.name,
                department: department[item.departmentId],
                departmentId: item.departmentId,
                hiredate: item.hiredate,
                level: level[item.levelId],
                levelId: item.levelId
            }

            return {
                ...state,
                employeeList: updateList
            }
        default :
            return state
    }
}