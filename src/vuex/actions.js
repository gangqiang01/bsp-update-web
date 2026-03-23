const actions = {
    showLoading ({ commit }, status) {
        commit('showLoading', status);
    },
    onlineDeviceCount({commit}, status){
        commit('onlineDeviceCount', status);
    },
    licenseStatusCount({commit}, status){
        commit('licenseStatusCount', status);
    },
    systemImg({commit}, status){
        commit('systemImg', status);
    },
    cloudConfig({commit}, status){
        commit('cloudConfig', status);
    },
    repoStateChangeAsync({ commit }, status) {
        commit('repoStateChange', status);
    }
}

export default actions
