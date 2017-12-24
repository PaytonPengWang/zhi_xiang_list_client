import todayListMockData from '../../mock-data/list/today_list';

const getTodayLists = (callback) => {
  // wx.request({
  //   url: "https://payton.wojiushiwo.cn/mock-data/list/today_list.json",
  //   success : (ret) => {
  //     callback(ret);
  //   }
  // })
  callback(todayListMockData);
}

export {
  getTodayLists
}