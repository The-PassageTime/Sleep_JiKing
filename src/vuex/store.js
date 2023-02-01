import {createStore} from 'vuex'
const store = createStore({
    state() {
        return {
            IsShowLogin :false,
            IsShowFind : false,
            UId: localStorage["UId"],
            AAA: localStorage["AAA"],   
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
        SettingUId(state, UId){
            state.UId = UId;
        },
        SettingAAA(state, AAA){
            state.AAA = AAA;
        },
    }
})
export default store;