import {createStore} from 'vuex'
const store = createStore({
    state() {
        return {
            IsShowLogin :false,
            IsShowFind : false,
            IsShowAdd : false,
            IsShowChange : false,
            IsShowPhoto : false,
            UId: localStorage["UId"],
            AAA: localStorage["AAA"],
            ObjName : localStorage["ObjName"]  
        }
    },
    mutations:{
        OpenChange(state){
            state.IsShowChange = true;
        },
        CloseChange(state){
            state.IsShowChange = false;
        },
        OpenFind(state){
            state.IsShowFind = true;
        },
        CloseFind(state){
            state.IsShowFind = false;
        },
        OpenPhoto(state){
            state.IsShowPhoto = true;
        },
        ClosePhoto(state){
            state.IsShowPhoto = false;
        },
        OpenLogin(state){
            state.IsShowLogin = true;
        },
        CloseLogin(state){
            state.IsShowLogin = false;
        },
        OpenAdd(state){
            state.IsShowAdd = true;
        },
        CloseAdd(state){
            state.IsShowAdd = false;
        },
        SettingUId(state, UId){
            state.UId = UId;
        },
        SettingAAA(state, AAA){
            state.AAA = AAA;
        },
        SettingObjName(state, ObjName){
            state.ObjName = ObjName;
        },
    }
})
export default store;