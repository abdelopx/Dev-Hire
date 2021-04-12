import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';


export default {
    state() {
        return {
            userId: null,
            token: null,
            tokenExpiration: null,
        };
    },
    actions,
    mutations,
    getters,
}