import {Network, UserMetas} from "~~/composables/types"
import {defineStore} from "pinia";

export const useProfileStore = defineStore("profile", {
    state:  // @ts-ignore
        () => {
        // @ts-ignore
            return {
            metas:  {username: "",
                avatar: "",
                public: false,
                email: ""},
            loading: false,
            editing:false,
            creating: true,
            agreeToRiskPolicy: false,
                agreeToTOS: false,
            agreedToGPRS: false,
            agreeToNewsletter: false,
            canEdit: false,
                // @ts-ignore
            status: ""
        }
    },
    getters: {
        loadingStatus(state) {
            return state.loading;
        },
        formType(state) {
            if(state.creating == true && state.editing == false && state.status != "has_profile") {
                return "creating_form";
            } else if(state.editing == true && state.status == "has_profile") {
                return "editing_form";
            }
        },
        formDataValues(state) {
            return state.metas;
        },
        username(state) {
            return state.metas.username || "";
        },
        avatar(state) {
            return state.metas.avatar || null;
        },
        isPublic(state) {
            return state.metas.public == true;
        },
        email(state) {
            return state.metas.email || null;
        },
        canSubmitCreateForm(state) {
            return state.agreedToGPRS == true && state.agreeToRiskPolicy == true && state.agreeToTOS == true;
        }
    },
    actions: {
        setLoading(payload:boolean) {
            this.loading = payload;
        },
        setUserName(payload:string) {
            this.metas.username = payload;
        },
        setAvatar(payload:string) {
            this.metas.avatar = payload;
        },
        setEmail(payload:string) {
            this.metas.email = payload;
        },
        setGPRSAgreements(gprs:boolean) {
            this.agreedToGPRS = gprs;
        },
        setRiskAgreement(risk:boolean) {
            this.agreeToRiskPolicy = risk;
        },
        setAgreeToTOS(tos:boolean) {
            this.agreeToTOS = tos;
        },
        subscribeNewsletter(nl:boolean) {
            this.agreeToNewsletter = nl;
        },
        setStatus(status:string) {
            this.status = status;
        },
        setEditing(edit:boolean) {
            this.canEdit = edit;
        },
        setCreating(create:boolean) {
            this.creating = create;
        }
    },
    persist: {
        enabled:true
    }
});
