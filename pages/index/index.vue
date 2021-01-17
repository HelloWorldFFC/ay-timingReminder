<template>
	<view>
		<!-- <view v-if="!isCountDown" class="cu-form-group">
			<view class="title">时间单位：</view>
			<picker @change="changeTimeUnitLength" :value="timeUnitLength" :range="timeUnitList">
				<view class="picker">
					{{timeUnitList[timeUnitLength]}}
				</view>
			</picker>
		</view>
		
		<view v-if="!isCountDown" class="cu-form-group">
			<view class="title">时间间隔：</view>
			<picker @change="changeTimeLength" :value="timeLength" :range="timeList">
				<view class="picker">
					{{timeList[timeLength]}} {{timeTip}}
				</view>
			</picker>
		</view>
		
		<view v-if="isCountDown" class="cu-form-group">
			<view class="title">倒计时：</view>
			<view class="picker cf-colorRed">
				{{countDownTip}}
			</view>
		</view>
		
		<view v-if="!isCountDown" style="margin-top: 100upx;" @tap="toStart">
			<button style="width: 400upx;" class="cf-bgcolorTheme">开始</button>
		</view>
		<view v-else style="margin-top: 100upx;" @tap="toCancelRemander">
			<button style="width: 400upx;" class="cf-bgcolorTheme">取消</button>
		</view> -->
		
		<aytimingReminder :isCountDown="isCountDown" :countDownTip="countDownTip"
		@toStart="toStart" @toCancelRemander="toCancelRemander"></aytimingReminder>
	</view>
</template>

<script>
	import preDupliClick from '../../api/preDupliClick.js'
	import storage from '@/store/storage.js'
	import timeConvert from '../../api/timeConvert.js'
	import aytimingReminder from '../../components/ay-timingReminder/ay-timingReminder.vue'
	export default {
		components: {
			aytimingReminder
		},
		data() {
			return {
				
				timerName : '',
				valid_timerName : false,
				time_timerName : 1000,
				
				isCountDown : false ,
				countDown : '',
				countDownTip : '',
			}
		},
		async onLoad() {
			let that = this;

		},
		onShow() {
			let that = this;
			let timingReminder = storage.getTimingReminder() ;
			if(timingReminder!==''){
				//表明有需要提醒的时间
				let timingReminder_date = new Date(timingReminder.replace(/-/g,"/"));
				let now = new Date() ;
				if(timingReminder_date>now){
					//说明需要提醒
					let addS = timeConvert.getDatedifferenceS(timingReminder,timeConvert.getTime(now));
					that.startRemander(addS);
				}
				
			}
		},
		onUnload:function(){
			let that = this ;
			console.log('onUnload')
			that.toCancelRemander();
		},
		// #ifdef MP-WEIXIN
		//微信小程序的分享
		onShareAppMessage: function(options) {

		},
		// #endif
		watch: {
			//页面显示更友好
			countDown(e) {
				let that = this ;
				if(e!==''){
					let countDownTip = timeConvert.secondsToHMs(e);
					that.countDownTip = countDownTip ;
				}
			}
		},
		methods: {
			toCancelRemanderFun(){
				let that = this ;
				that.toCancelRemander(true)
			},
			toCancelRemander(isCancel = false){
				let that = this ;
				
				//移除定时器
				let timerName = that.timerName;
				that.valid_timerName = false ;
				if(timerName!==''){
					clearTimeout(timerName);
					that.timerName = '';
					that. isCountDown = false ;
					that .countDown = '';
				}
				
				if(isCancel){
					//清除提醒时间
					storage.clearTimingReminder();
					
				}
			},
			//定时器实现车位1分钟刷新一次
			timerNameFun() {
				let that = this;
				//移除定时器
				let timerName = that.timerName;
				if (timerName !== '') {
					clearTimeout(timerName);
				}
				console.log(timeConvert.getTimeM()+'定时器执行！！！！！！')
				that.countDown --;
				if(that.countDown == 0){
					that.playAnswerAudio();
					that.toCancelRemander(true);
					return ;
				}
				timerName = setTimeout(function() {
					if(that.valid_timerName){
						that.timerNameFun();
					}
				}, that.time_timerName)
				// 保存定时器name
				that.timerName = timerName;
			
			},
			toStart(e){
				let isonce = preDupliClick.setpreDupliClickVal(preDupliClick.preDupli.one);
				if (!isonce) return;
				
				let that = this;
				let addS = e.addS ;
				console.log('addS:'+addS)
				let timingReminder = timeConvert.dateAddToTime('s',addS , new Date()) ;
				console.log('timingReminder:'+timingReminder)
				storage.setTimingReminder(timingReminder);
				
				that.startRemander(addS);
				
			},
			startRemander(addS){
				let that = this ;
				that. isCountDown = true ;
				that .countDown = addS;
				
				//定时器实现倒计时
				let timerName = setTimeout(function() {
					that.valid_timerName = true ;
					that.timerNameFun();
				}, that.time_timerName)
				// 保存定时器name
				that.timerName = timerName;
			},
			
			//播放提醒声音
			playAnswerAudio(){
				
				// var srcurl = "/audio/answer.mp3" ;
				 
				// const audio = wx.createInnerAudioContext('answer')
				// audio.src = srcurl ;
				// audio.autoplay = true ; 
				// audio.startTime = 0 ;
				// audio.loop = true ;
				 
				//  audio.onPlay(() => {
				// 	////////////console.log('开始播放')
				// })
				
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = '/audio/answer.mp3';
				innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
			}
		}

	}
</script>

<style lang="scss">
</style>
