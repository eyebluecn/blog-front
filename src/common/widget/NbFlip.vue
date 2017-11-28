<template>
	<div ref="flipper">
		<div class="front">
			<slot name="front"></slot>
		</div>
		<div class="back">
			<slot name="back"></slot>
		</div>
	</div>
</template>


<script>

	import $ from "jquery"
	import JqueryFlip from "../fork/flip/flip-vue"
	JqueryFlip($);

	export default {
		//这个值代表的是开或者关的状态。
		model: {
			prop: 'flipped',
			event: 'toggle'
		},
		data(){
			return {
				val: null
			}
		},
		props: {
			flipped: {
				type: Boolean,
				required: false,
				"default": false
			}
		},
		computed: {
			$flipper(){
				return $(this.$refs.flipper);
			}
		},
		watch: {
			"flipped"(newVal, oldVal){
				this.$flipper.flip(newVal);
			}
		},
		methods: {},
		mounted(){
			this.$flipper.flip({
				trigger: 'manual'
			});
			this.$flipper.flip(this.flipped);


		}
	}
</script>



