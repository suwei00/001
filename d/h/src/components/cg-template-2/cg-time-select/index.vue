<script setup lang='ts'>
import { reactive, watch, PropType } from 'vue';
import { CgDivider, CgItem, CgIcon } from '@cg-template-2-components/index';
import { useOption } from '@/hooks/useOption';
import dayjs from 'dayjs'

const timeToString = (time: number, format = 'DD/MM/YYYY') => {
	return dayjs(time).format(format);
}

const props = defineProps<{
	type: string;
	start_time: PropType<string | undefined>;
	end_time: PropType<string | undefined>;
}>();

const emit = defineEmits(['change']);

let minDate = new Date();
minDate.setDate(minDate.getDate() - 30);
let maxDate = new Date();

class TimeSelect {

	// 分割符号
	#splitFlag: string = '/';

	timeFlag: any;

	currentSelect: string;

	customState: boolean = props.type.toString().includes('-');

	currentTimeName: string = '';

	start_time: Date = new Date();

	end_time: Date = new Date();

	constructor() {
		const { option } = useOption('timeFlag');
		this.timeFlag = option;
		this.currentSelect = props.type.toString().includes('-') ? 'custom' : props.type;
		this.initTime()
	}

	/**
	 * 初始化时间
	 * @param startTime 默认是当天
	 * @param endTime 默认往前推30天
	 */
	initTime() {
		if (props.start_time && props.end_time) {
			this.start_time = TimeSelect.transformDate(props.start_time);
			this.end_time = TimeSelect.transformDate(props.end_time);
		} else {
			this.end_time = this.maxDate;
			this.start_time = this.minDate;
		}
	}

	static transformDate(time: string) {
		let date: Date;
		const arr: any = time.split('/');
		if (arr[0].length === 4) {
			date = new Date(arr[0], arr[1] - 1, arr[2]);
		} else {
			date = new Date(arr[2], arr[1] - 1, arr[0]);
		}
		return date;
	}

	changeCurrentToCustom() {
		this.currentSelect = 'custom';
		this.customState = !this.customState;
	}

	get startTime() {
		return timeToString(this.start_time.getTime(), 'DD/MM/YYYY');
	}

	get endTime() {
		return timeToString(this.end_time.getTime(), 'DD/MM/YYYY');
	}

	get collapseState() {
		return this.customState && this.currentSelect === 'custom';
	}

	// 往前推30天
	get minDate() {
		const date = new Date();
		date.setDate(date.getDate() - 30);
		return date;
	}

	get maxDate() {
		return new Date();
	}
}
const timeSelect = reactive(new TimeSelect())

watch(timeSelect, () => {
	emit('change', {
		type: timeSelect.currentSelect !== 'custom' ? timeSelect.currentSelect : '',
		start_time: timeSelect.startTime,
		end_time: timeSelect.endTime,
	})

	if (timeSelect.currentSelect !== 'custom') {
		timeSelect.customState = false;
	}
})

</script>
<template>
	<div class="cg-time-select">
		<cg-item v-model="timeSelect.currentSelect" :list="timeSelect.timeFlag" />
		<div class="custome" @click="timeSelect.changeCurrentToCustom" :class="{
			active: timeSelect.currentSelect === 'custom'
		}">
			<div class="item">
				Tự Định Nghĩa
				<cg-icon :width="40" :class="[timeSelect.customState ? 'rotate' : '', 'item-icon']" name="i_arrow_down" />
			</div>
			<cg-divider />
		</div>
		<van-collapse v-model="timeSelect.currentTimeName" v-show="timeSelect.collapseState" accordion>
			<van-collapse-item name="1">
				<template #title>
					<div class="start">
						<div class="label">Thời Gian Bắt Đầu</div>
						<div class="value">{{ timeSelect.startTime }}</div>
					</div>
				</template>
				<div style="height: 130px; display: flex; align-items: center; overflow: hidden">
					<van-datetime-picker style="width: 100%;" v-model="timeSelect.start_time" type="date" :show-toolbar="false"
						:columns-order="['day', 'month', 'year']" :min-date="minDate" :max-date="maxDate" />
				</div>
			</van-collapse-item>
			<van-collapse-item name="2">
				<template #title>
					<div class="start">
						<div class="label">Thời Gian Kết Thúc</div>
						<div class="value">{{ timeSelect.endTime }}</div>
					</div>
				</template>
				<div style="height: 130px; display: flex; align-items: center; overflow: hidden">
					<van-datetime-picker style="width: 100%;" v-model="timeSelect.end_time" type="date" :show-toolbar="false"
						:columns-order="['day', 'month', 'year']" :min-date="minDate" :max-date="maxDate" />
				</div>
			</van-collapse-item>
		</van-collapse>
	</div>
</template>
<style lang='scss' scoped>
.cg-time-select {
	background-color: var(--cg-color-white);

	.start {
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.label {
		font: var(--cg-font-text6);
	}

	.value {
		padding-right: 16px;
		font: var(--cg-font-text2);
		color: var(--cg-color-gray);
	}

	:deep(.van-cell) {
		height: 80px;
		align-items: center;
		padding: 0;
	}

	:deep(.van-cell__right-icon) {
		color: var(--cg-color-black1);
		font-size: var(--cg-font-30);
	}

	// .van-collapse-item {
	// 	border-bottom: 1px solid var(--cg-color-white1);
	// 	border-top: 1px solid var(--cg-color-white1);
	// }
	:deep(.van-collapse-item__content) {
		padding: 0 !important;
	}

	:deep(.van-picker-column__item) {
		font: var(--cg-font-text6);
		color: var(--cg-color-black1);
	}

	:deep(.van-picker-column__item--selected) {
		font: var(--cg-font-h4);
		color: var(--cg-color-black1);
	}

	:deep(.van-picker__mask) {
		background-image: none;
	}

	:deep(.van-picker__frame) {
		left: 0;
		right: 0;
		border-top: 0.8px solid var(--cg-color-white1);
		border-bottom: 0.8px solid var(--cg-color-white1);
	}

	:deep(.van-cell:after) {
		left: 0;
		right: 0;
		border-top: 2px solid var(--cg-color-white1);
	}

	:deep(.van-collapse-item--border:after) {
		left: 0;
		right: 0;
		border-bottom: 2px solid var(--cg-color-white1);
	}

	.custome {
		height: 80px;
		font: var(--cg-font-text6);
		color: var(--cg-color-black1);

		&.active {
			font: var(--cg-font-h4);
			background: var(--cg-color-blue17);
		}

		.item {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 80px;
			transition: all 0.3s ease-in-out;

			.item-icon {
				position: absolute;
				right: 168px;
				top: 20px;

				&.rotate {
					transform: rotate(180deg);
				}
			}


		}


	}
}
</style>