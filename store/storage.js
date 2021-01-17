const storageKeyType = {
	timingReminder : 'timingReminder',
}


const setTimingReminder =(info)=>{
	//全局变量和缓存同时存，防止缓存有问题
	getApp().globalData.timingReminder = info;
	uni.setStorage({
	    key: storageKeyType.timingReminder,
	    data: info,
	    success: function () {
	        //console.log('success');
	    }
	});
}
const getTimingReminder =()=>{
	//有缓存就把缓存赋给全局变量
	let ret = '';
	if(getApp().globalData.timingReminder){
		ret = getApp().globalData.timingReminder ;
	}
	return ret || '';
}

const clearTimingReminder =()=>{
	//有缓存就把缓存赋给全局变量
	getApp().globalData.timingReminder = '';
	uni.removeStorage({
	    key: storageKeyType.timingReminder,
	    success: function (res) {
	    }
	});
}
module.exports = {
	storageKeyType : storageKeyType ,
	setTimingReminder ,
	getTimingReminder ,
	clearTimingReminder ,
}