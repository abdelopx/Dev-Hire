export default {
    coaches(state) {
        return state.coaches;
    },
    hasCoaches(state){
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(state,getters,rootState,rootGetters) {
        const userId = rootGetters.userId;
        const coaches = state.coaches;
        const found = coaches.find(coach => coach.id == userId);
        console.log("here is"  + found);

        if (found) {
            return true;
        }
        else {
            return false;
        }
    }

};