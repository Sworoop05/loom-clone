import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type initialStateProps = {
    workspaces: {
        id: string,
        name: string,
        type: "PERSONAL" | "PUBLIC"
    }[]
}
const initialState: initialStateProps = {
    workspaces: []
}
export const workspaceSlice = createSlice({
    name: "workspaces",
    reducers: {
        WORKSPACE: (state, action: PayloadAction<initialStateProps>) => {
            return { ...action.payload }
        }

    },
    initialState
})
export const { WORKSPACE } = workspaceSlice.actions
export default workspaceSlice.reducer