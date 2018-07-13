<template>
    <div id="area" style="background: #fff;">
    	{{book}}
    </div>
</template>
<script src="../../static/epub.js"></script>
<script src="../../static/jszip.min.js"></script>
<script>

import pdf from 'vue-pdf'



export default {
    components: {
        pdf
    },
    data() {
        return {
           book:'123'
        }
    },
    beforeMount () {
//			this.book = '455'
//			this.book = ePub("../../static/1.epub"); // With default options
//			this.book = ePub({ restore: true }); 
//			this.book.open("../../static/1.epub");
			this.book = window.ePub("../../static/1.epub", {   restore: true})
      this.book.renderTo(this.$els.area)
//     this.book = window.ePub('../../static/1.epub')

//     console.log(book)
//     var rendition = book.renderTo("area", {width: 600, height: 400});
//     var displayed = rendition.display();
    }
}

</script>
<style scoped rel="stylesheet/less" lang="less">
  @import "../less/vue-pull-to.less";
  @import "../less/common.less";
  .list li {
    overflow: hidden;
    height: auto;
    font-size: @font-size-small;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    .fa-male, .fa-female {
      color: #666;
    }
    a{
    	  display: inline-block;
		    width: 32px;
		    height: 48px;
		    line-height: 48px;
		    text-align: center;
		    color: #d3d3d3;
    }
    a.mint-cell.mint-cell-swipe {
      color: #666;
    }
    .mint-cell-value a {
      display: inline-block;
      width: 32px;
      height: 48px;
      line-height: 48px;
      text-align:center;
      color: lightGray;
    }
  }
  .list li:nth-child(even) {
    background-color: white;
  }
  .list li.warn{
  	text-align: center;
  	font-size: @font-size-normal;
  	font-weight: 500;
  	color: #333;
  }
  .router-view-search-customer {
    position: absolute;
    top: 0;
    bottom: 0;
    display:block;
    width: 100%;
    overflow: hidden;
    background-color: white;
  }
  .mint-cell-wrapper {
    font-size: @font-size-normal;
  }
  .tupian{
  	display: inline-block;
  	position: relative;
  	color: #666;
  }
  .tupian label{
  	padding-left: 32px;
  }
  .tupian img{
  	width:25px;
  	padding-bottom: 1px;
  	position: absolute;
  	top:13px
  }
  .tupian img.behind{
  	width:15px;
  	padding-left: 5px;
  	padding-bottom: 4px;
  }
 	input:nth-child(3){
  	float:left;
  	width:45%;
  }
   .mint-popup-top {
    top: 88px;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid @border-color-normal;
    .wrap:first-child {
      margin-left: 5px;
      margin-right: 30px;
      input[type=text] {
        width: 100%;
        margin-right: -10px;
      }
      input:nth-child(3) {
	    	width:45%;
	    	float: left;
	    }
	    input:nth-child(4) {
	    	width:45%;
	    	float: right;
	    	margin-right: -21.5px;
	    }
    }
    .wrap:last-child {
      margin-left: 5px;
      margin-right: 8px;
    }
  }
  .lianxi{
  	display: inline-block;
  	float: right;
  }
  .fa-lg {
    font-size: 21px;
  }
</style>
