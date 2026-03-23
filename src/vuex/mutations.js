const mutations = {

    showLoading(state, status) {
        state.globalLoading = status
    },
    onlineDeviceCount(state, status){
        state.onlineDeviceCount = status;
    },
    licenseStatusCount(state, status){
        state.licenseStatusCount = status;
    },
    systemImg(state, status){
        state.systemImg = status;
    },

    cloudConfig(state, status){
        state.cloudConfig = status;
    },
    
    repoStateChange(state, status) {
        state.repoState = status;
    }
}

export default mutations
