import {createStore} from 'vuex'
const store = createStore({
    state() {
        return {
            IsShowLogin :false,
            IsShowFind : false,
            UId: localStorage["UId"],
            UName: localStorage["UName"],         
        }
    },
    mutations:{
        OpenFind(state){
            state.IsShowFind = true;
        },
        CloseFind(state){
            state.IsShowFind = false;
        },
        OpenLogin(state){
            state.IsShowLogin = true;
        },
        CloseLogin(state){
            state.IsShowLogin = false;
        },
        SettingUName(state, UName){
            state.UName = UName;
        },
        SettingUId(state, UId){
            state.UId = UId;
        },
    }
})
export default store;