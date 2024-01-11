import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit"

interface UserState {
    value: UserValue
}
interface UserValue {
    user: { [key: string]: any }
}
const userSlice = createSlice({
    name: "user",
    initialState: { value: { user: {} } } as UserState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<UserValue>) => {
            state.value = action.payload
        },
        resetUser: (state: UserState) => {
            state.value = { user: {} }
        }
    }
})
// export const { setUser, resetUser } = userSlice.actions


interface LogInState {
    value: LogInStateValue
}
interface LogInStateValue {
    loggedInStatusValue: string
}
const logInSlice = createSlice({
    name: "logInStatus",
    initialState: { value: { loggedInStatusValue: "not logged in" } } as LogInState,
    reducers: {
        setLoggedInStatus: (state: LogInState, action: PayloadAction<LogInStateValue>) => {
            state.value = action.payload
        },
        resetLoggedInStatus: (state: LogInState) => {
            state.value = { loggedInStatusValue: "not logged in" }
        }
    }
})
export const { setLoggedInStatus, resetLoggedInStatus } = logInSlice.actions

export const store = configureStore({
    reducer: {
        logInStatus: logInSlice.reducer
    }
})