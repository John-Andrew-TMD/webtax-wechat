// state.js
let defaultCity = '深圳市'
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {}

import { getToken } from '@/utils/util';
const state = {
  filterData: {
    taxTags: [],
    regionFilterData: {},
    sort: [],
    recordArticleTimeFilterData:[],
    availabilityFilterData:[],
    secondaryCategoryFilterData:[]
  },
  listResult: {
    total: 0,
  },
  listParams: {
    condition: {
      searchCondition: '',
      taxTags:[],
      livePlaybackTypes:[],
      livePlaybackTeachers:[],
    },
    pageNo: 1,
    pageSize: 10,
  },
  minutes:15,
  seconds:0,
  examId:"1",
  userInfo: null,
  token: getToken(),
  showLogin: false,
  showLoad: false,
  skeleton: null,
  registerStatus: 0,
  selectItem: '',
  city: defaultCity,
  isDeepColor: false // 是否是深色模式
};
export default state;
