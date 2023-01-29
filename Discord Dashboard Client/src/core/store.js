import { Store } from 'vuex';
import axios from '@/core/axios';

const store = new Store({
    state: {
        user: null,
        logged: false,
        gitprojects: [],
        loading: true
    },

    mutations: {
        updateUser(state, user) {
            state.user = user;
            if(user == null) {
                state.logged = false;
            } else {
                state.logged = true;
            };
        },
        updateLoading(state, loading) {
            state.loading = loading;
        },
        updateGitProjects(state, gitprojects) {
            state.gitprojects = gitprojects;
        }
    },
    
    actions: {
        async getUser(context) {
            let response = await axios.get('auth/status').then((response) => {
                return response;
            }).catch((err) => {
                return err.response;
            });
            if(response && response.status == 200) {
                context.commit('updateUser', response.data);
            } else {
                context.commit('updateUser', null);
            }
        },
    }
});

export default store;