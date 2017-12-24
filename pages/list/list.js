import { getTodayLists} from './list.service';

/*
[{
  groupId : "",
  groupName : "",
  listItems : [{

  }]
}]
*/
let todayListDatas = [];
let groupIndex = {};


Page({
  data: {
    todayList : []
  },
  onShow : function() {
    getTodayLists((ret) => {

      todayListDatas = [];
      groupIndex = {};


      for(var listItem of ret){
        var listGroupId = listItem.listGroup._id;
        var todayListData = null;
        var index = 0;
        if(groupIndex[listGroupId] === undefined){
          groupIndex[listGroupId] = todayListDatas.length;
          index = groupIndex[listGroupId];
          todayListDatas[index] = {
            groupId : listItem.listGroup._id,
            groupName : listItem.listGroup.name,
            listItems : []
          };
        }else{
          index = groupIndex[listGroupId];
        }

        var dueDate = listItem.dueDate;
        
        if (dueDate.indexOf("-") === -1 ){
          var newDueDateArr = [];
          newDueDateArr.push(dueDate.substr(0,4))
          newDueDateArr.push(dueDate.substr(4,2))
          newDueDateArr.push(dueDate.substr(6,2))
          listItem.dueDate = newDueDateArr.join("-");
        }
        

        todayListDatas[index].listItems.push(listItem);
        
      }

      
      var currentDateArr = [];
      var currentDate = new Date();
      currentDateArr.push(currentDate.getFullYear());
      currentDateArr.push(currentDate.getMonth()+1);
      currentDateArr.push(currentDate.getDate());
      this.setData({
        todayList: todayListDatas,
        currentDate: currentDateArr.join("-")
      })
      
      
    });
  }
})