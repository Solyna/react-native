import { handleActions } from 'redux-actions';
import actions from './Actions';

const allUserInfo = handleActions({
    /* [actions.user.login](state, { payload }) {
        return payload
    } */
}, null);

export default {
    allUserInfo
}

