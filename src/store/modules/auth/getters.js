export default {
    getUserId(state) {
        return state.user._id;
    },
    user(state) {
        return state.user;
    },
    getToken(state) {
        return state.token;
    },
    budget(state) {
        return state.user.budget;
    },
    goals(state) {
        return state.user.goals;
    },
    balance(state) {
        return state.user.balance;
    },
    fullname(state) {
        return state.user.fullname;
    },
    profileUrl(state) {
        return state.user.profile;
    },
    isAuthenticated(state) {
        return !!state.token;
    },
    getUser(state) {
        return state.user;
    },
    didAutoLogout(state) {
        return state.autoLogout;
    },
    isLoggedIn(state)
    {
        return state.isLoggedIn;
    }
}