<template id="fileReader">
 <label class="text-reader">
  <input type="file" @change="loadTextFromFile" />
 </label>
</template>
<script>
export default {
  name: 'fileReader',
  methods: {
	  loadTextFromFile(ev) {
	  	const file = ev.target.files[0];
		  const reader = new FileReader();
		
		  reader.onload = e => this.$emit("load", e.target.result);
		  reader.readAsText(file,'gb2312');
	  }
	}
}
</script>