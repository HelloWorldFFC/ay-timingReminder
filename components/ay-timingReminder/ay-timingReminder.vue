<template>
	<view>
		<view v-if="!isCountDown" class="cu-form-group">
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
		</view>
		
		
	</view>
</template>

<script>
	import preDupliClick from '../../api/preDupliClick.js'
		import storage from '@/store/storage.js'
		import timeConvert from '../../api/timeConvert.js'
		export default {
			components: {
				
			},
			props: {
				
				list: {
					type: Array,
					default () {
						return []
					}
				},
				padding: {
					type: Number,
					default: 0
				},
				isCountDown: {
					type: [Boolean, String],
					default: false
				},
				
				countDownTip: {
					type: String,
					default: '',
				},
			},
			data() {
				return {
					timeTip:'分',
					timeUnitList:['分钟','小时','秒'],
					timeUnitMaoList:['60','3600','1'],
					
					timeUnitLength: 0,
					
					timeLength: 0,
					timeList: ['10','5', '15', '20', '23','1','2','3','4','6', '7', '8', '9', '11', '12', '13','30','40','50','60'],
					
					
				}
			},
			
			
			methods: {
				toCancelRemander(){
					
					this.$emit('toCancelRemander', '');
				},
				
				toStart(){
					
					let that = this;
					let timeUnitMao = that.timeUnitMaoList[that.timeUnitLength] ;
					let time = that.timeList[that.timeLength] ;
					let addS = parseInt(time)*parseInt(timeUnitMao) ;
					console.log('addS:'+addS)
					
					let data = {
						addS :addS ,
					}
					this.$emit('toStart', data);
				},
				changeTimeUnitLength(e) {
					let that = this;
					let value = e.detail.value;
					this.timeUnitLength = value;
					that.timeTip = that.timeUnitList[value];
					
				},
				changeTimeLength(e) {
					let that = this;
					let value = e.detail.value;
					this.timeLength = value;
				},
			}
	
		}
	
</script>

<style>
</style>
