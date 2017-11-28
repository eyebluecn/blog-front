<template>
	<el-date-picker
		v-model="dateValue" :type="type"
		align="left" placeholder="选择日期范围" :picker-options="pickerOptions">
	</el-date-picker>

</template>

<script>

	export default {
		data(){
			return {
				dateValue: [],
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							end.setTime(end.getTime() + 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一年',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							end.setTime(end.getTime() + 3600 * 1000 * 24 * 365);
							picker.$emit('pick', [start, end]);
						}
					}
					]
				}
			}
		},
		props: {
			type: {
				type: String,
				required: false,
				"default": "daterange"
			},
			startTime: {
				type: Date,
				required: false,
				"default": null
			},
			endTime: {
				type: Date,
				required: false,
				"default": null
			}
		},
		computed: {},
		watch: {
			"dateValue"(newVal, oldVal){

				this.$emit('startTimeChange', newVal[0]);
				this.$emit('endTimeChange', newVal[1]);
			},
			"startTime"(newVal, oldVal){

				if (this.startTime && this.endTime) {

					if (this.startTime.getTime() > this.endTime.getTime()) {
						console.error("起始时间不能晚于结束时间");
					} else {
						this.dateValue.splice(0, this.dateValue.length);
						this.dateValue.push(this.startTime);
						this.dateValue.push(this.endTime);
					}
				} else {
					this.dateValue.splice(0, this.dateValue.length);
					this.dateValue.push(null);
					this.dateValue.push(null);
				}
			},
			"endTime"(newVal, oldVal){

				if (this.startTime && this.endTime) {
					if (this.startTime.getTime() > this.endTime.getTime()) {
						console.error("起始时间不能晚于结束时间");
					} else {
						this.dateValue.splice(0, this.dateValue.length);
						this.dateValue.push(this.startTime);
						this.dateValue.push(this.endTime);
					}
				} else {
					this.dateValue.splice(0, this.dateValue.length);
					this.dateValue.push(null);
					this.dateValue.push(null);
				}
			}
		},
		methods: {},
		mounted(){
			this.dateValue.splice(0, this.dateValue.length);
			this.dateValue.push(this.startTime);
			this.dateValue.push(this.endTime);
		}
	}
</script>



