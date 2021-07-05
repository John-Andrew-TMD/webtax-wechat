<template>
	<div class="keyword-block " >
		<div class="keyword keyword-checkbox">
			<div class="swCheck" :class="{ 'isChecked':checkedValue.includes(item.code)}"  v-for="(item, index) in options" :key="item.code">
				<span class="checkbox__label">
					{{item.name||item.label}}
					<br/>
					<span class = "checkbox__count" v-if = "showCount">（{{item.count}}条）</span>
				</span>
				<div class="checkbox__original"  @click="onClick(item,index)" :id="item.code">
					
				</div>
			</div>
		</div>
		
	</div>

</template>

<script>
	export default {
		// other code
		props:{
			value:{
				type:Array,
				default:()=>[]
			},
			options:{
				type:Array,
				default:()=>[]
			},
			showCount:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			options: {
				handler(val) {
				
				},
				immediate:true,
				deep:true
			},
			value: {
				handler(val) {
					if(val[0]){
						if(val[0] instanceof Object){
							
						}else{
							this.init(val)
						}
					}else{
						this.init(val)
					}
				},
				immediate:true,
				deep:false
			}
		},
		data() {
			return {
				arr:[],
				checkedValue:[],
				checked: true
			}
		},
		mounted(){
			this.init()
		},
		methods: {
			init(val=this.value){
				this.arr = this.options.map(item => {
					return { ...item,
						key: `${item.name}---${item.code}`
					}
				})
				this.checkedValue = val
			},
			onClick(item,index) {
				if(this.checkedValue.includes(item.code)){
					this.checkedValue = this.checkedValue.filter((el)=>{
						return el!=item.code
					})
				}else{
					this.checkedValue.push(item.code)
				}
				this.$emit('update:check-box-value', this.checkedValue)
				this.$emit("handleReList",this.checkedValue)
			},
			handleResetClick(){
				this.checkedValue = []
				this.$emit('update:check-box-value', [])
			}
		}
	}
</script>

<style lang="scss" scoped>
	.checkbox__original{
		opacity: 0;
		cursor: pointer;
	}
</style>
