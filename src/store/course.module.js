import { api as ApiService } from "../services/api.service";
import router from '../router'

const state = {
    moduleStates: null,
    module: null,
    isModuleInfoShown: false,
    targetPosition: {
        x: 812,
        y: 540
    },
    // target should have identical id as a syllabus
    targets: { // target on the map
        0: {
            title: 'First Module',
            position: { x: 50, y: 200 },
        },
        1: {
            title: 'Second Module',
            position: { x: 180, y: 375 }
        },
        2: {
            title: 'Third Module',
            position: { x: 330, y: 90 }
        },
        3: {
            title: 'Fourth Module',
            position: { x: 485, y: 290 }
        },
        4: {
            title: 'Fifth Module',
            position: { x: 550, y: 250 }
        },
        5: {
            title: 'Sixth Module',
            position: { x: 525, y: 380 }
        },
        6: {
            title: 'Seventh Module',
            position: { x: 600, y: 300 }
        },
        7: {
            title: 'Eighth Module',
            position: { x: 750, y: 178 }
        },
        8: {
            title: 'Ninth Module',
            position: { x: 890, y: 215 }
        },
        9: {
            title: 'Tenth Module',
            position: { x: 765, y: 250 }
        },
        10: {
            title: 'Eleventh Module',
            position: { x: 725, y: 346 }
        },
        11: {
            title: 'Twelfth Module',
            position: { x: 657, y: 300 }
        },
        12: {
            title: 'Thirtennth Module',
            position: { x: 275, y: 485 }
        },
        13: {
            title: 'Fourteenth Module',
            position: { x: 530, y: 425 }
        },
        14: {
            title: 'Fifteenth Module',
            position: { x: 800, y: 525 }
        },
    },
    moduleId: 0,
    colors: {
        'OPEN': '#00ff00',
        'ACTIVE': '#f79a2e',
        'IN_PROCESS': '#f79a2e',
        'CLOSE': '#ff0000',
        'FINISHED': '#0000F0',
    }
};

const getters = {
    currentModuleUuid(state) {
        console.log(state.moduleStates)
        if (!state.moduleStates)
            return null
        return state.moduleStates[state.moduleId].uuid
    },
    videoLinks(state) {
        if (!state.module)
            return []
        return state.module.theories[0].theory_videos
    },
};

const actions = {
    fetchModules({ state, commit, dispatch }) {
        // if not fetched yet
        if (!state.moduleStates) {
            return new Promise((resolve, reject) =>
                ApiService.get('/weeks/weeks/')
                .then(({ data }) => {
                    commit('setModuleStates', data)
                    dispatch('fetchModule')
                    resolve()
                })
                .catch(() => {
                    dispatch('logout', null, { root: true })
                    router.push('/auth/login')
                    reject()
                })
            )
        }
    },
    fetchModule({ commit, getters, dispatch }) {
        commit('setModule', null)
        return new Promise((resolve, reject) =>
            ApiService.get('/weeks/weeks/' + getters.currentModuleUuid + '/')
            .then(({ data }) => {
                // console.log(data)
                commit('setModule', data)
                resolve()
            })
            .catch(() => {
                dispatch('logout', null, { root: true })
                router.push('/auth/login')
                reject()
            })
        )
    },
    openModule({ state, commit, dispatch }, { id }) {
        if (state.moduleStates[id].state === 'CLOSE')
            return
        commit('setModuleId', id)
        dispatch('fetchModule')
        commit('setIsModuleInfoShown')
        commit('changePosition', state.targets[id].position)
    },
    closeModule({ commit }) {
        commit('setIsModuleInfoShown', false)
    },
    getCurrentModuleId({ commit }) {
        let moduleId = +localStorage.getItem('moduleId')
        commit('setModuleId', moduleId)
    },
    initApp({ dispatch }) {
        dispatch('fetchModules');
        dispatch('getCurrentModuleId');
    }
}

const mutations = {
    setIsModuleInfoShown(state, value = true) {
        state.isModuleInfoShown = value
    },
    setModuleStates(state, data) {
        state.moduleStates = data
    },
    changePosition(state, position) {
        state.targetPosition = position
    },
    setModuleId(state, id) {
        localStorage.setItem('moduleId', id)
        state.moduleId = id
    },
    setModule(state, data) {
        state.module = data
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};