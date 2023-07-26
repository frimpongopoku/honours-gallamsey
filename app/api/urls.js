import {isEmulator} from '../utils';
let HOST;
if (isEmulator()) HOST = 'http://10.0.3.2:4000/';
else HOST = 'http://192.168.8.100:4000/';

export const ALL_ERRANDS = HOST + 'errands/list';
export const CREATE_ERRAND_URL = HOST + 'errands/create';
export const UPDATE_ERRAND_URL = HOST + 'errands/update';
export const FIND_USER_PROFILE = HOST + 'users/whoami';
export const CREATE_NEW_PROFILE_URL = HOST + 'users/create';
export const UPDATE_USER_URL = HOST + 'users/update';
export const ENGAGE_ERRAND = HOST + 'errands/engage';
export const PICK_ERRAND = HOST + 'errands/pick';
export const RUNNING_ERRANDS_URL = HOST + 'errands/list.running';
export const MY_OWN_ERRANDS_URL = HOST + 'errands/list.mine';
export const NEWS_FEED_URL = HOST + 'news/feed';
export const FIND_ONE_ERRAND = HOST + 'errands/find.one';
export const FINISH_UP_ERRAND = HOST + 'errands/finish';
// export const FETCH_NEWS_FEED = HOST + 'users/update';
