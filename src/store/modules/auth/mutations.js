export default {
    setUser(state,payload) {
        state.userId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration;
        state.token = payload.token;
    },
}