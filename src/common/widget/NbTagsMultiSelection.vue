<template>
	<div @click="focusNewTag()" :class="{'read-only': readOnly}" class="vue-input-tag-wrapper">
    <span v-for="(tag, index) in tags" class="input-tag">
      <span>{{ tag }}</span>
      <a v-if="!readOnly" @click.prevent.stop="remove(index)" class="remove"></a>
    </span>
		<input v-if="!readOnly" :placeholder="getPlaceholder()" type="text" v-model="newTag"
		       @keydown.delete.stop="removeLastTag()" @keydown.enter.prevent.stop="addNew(newTag)" class="new-tag"/>
	</div>
</template>

<script>
	export default{
    props:{
	    tags:{
        type: Array,
        "default": () => []
	    }
    },
    data() {
      return {
        newTag: ''
      };
    },

    methods: {
      focusNewTag() {
        if (this.readOnly) {
          return;
        }
        this.$el.querySelector('.new-tag').focus();
      },
      addNew(tag) {
        if (tag && !this.tags.includes(tag)) {
          this.tags.push(tag);
          this.tagChange();
        }
        this.newTag = '';
      },
      remove(index) {
        this.tags.splice(index, 1);
        this.tagChange();
      },
      removeLastTag() {
        if (this.newTag) {
          return;
        }
        this.tagChange();
        this.tags.pop();
      },
      getPlaceholder() {
        if (!this.tags.length) {
          return this.placeholder;
        }
        return '';
      },
      tagChange() {
        if (this.onChange) {
          // avoid passing the observer
          this.onChange(JSON.parse(JSON.stringify(this.tags)));
        }
      }
    },
		mounted() {


    }
	}
</script>