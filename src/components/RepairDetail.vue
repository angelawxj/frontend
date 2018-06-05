<template>
  <div>
    <div class="nav-sub clearfix">
      {{ $route.name }}
      <a class="nav-sub-btn pull-left" @click="goBack">
        <i class="fa fa-chevron-left"></i>
      </a>
      <a class="nav-sub-btn pull-right" @click="allSave">
       <i  class="fa fa-save"></i>
      </a>
    </div>
    <div class="pull-to-wrap">
      <pull-to>
        <ul class="detail clearfix">
        	<li v-for="item in state.data.baseList">
        			<span>姓名:</span><span>{{state.data.baseList[0].ch_nme}}</span> 
        			<img v-show="item.cd_lvl == '01'" src="../assets/customer_card01.png" >
	            <img v-show="item.cd_lvl == '02'" src="../assets/customer_card02.png" >
	            <img v-show="item.cd_lvl == '03'" src="../assets/customer_card03.png" >
	            <img v-show="item.cd_lvl == '04'" src="../assets/customer_card04.png" >
        	</li>
        	<li v-for="item in state.data.baseList">
        		<span>性别: {{item.gdr}}</span> 
        	</li>
        	<li v-for="item in state.data.baseList"><span>卡号: {{item.ffp_cd_num}}</span> <span><i></i></span></li>
        </ul>
        <div class="sep"></div>
       <ul class="list">
					<li>	
							<p>基本信息
								<a class="nav-sub-btn pull-right save" @click="baseSave()">
									<i  class="fa fa-save"></i>
									<!--保存-->
								</a>
							</p>
							<ul class="subList" id="base">
								<li v-for="item in state.data.baseList" class="mingzi">
										<input type="text" value="姓名" disabled>
										<input type="text" :class="inputstyle1" :placeholder="item.ch_nme"  disabled>
								</li>
								<li v-for="item in state.data.baseList">
										<input type="text" value="性别" disabled>
										<input type="text" :class="item.if_ext_tel== '0' ? 'liangse' : ''"  :placeholder="item.gdr"  :name="item.cont_typ_code" @click="showPopupbasePicker($event)" disabled readonly>
								<!--<input type="text" :class="inputstyle1"  :placeholder="item.gdr" id="gdr" disabled>-->
										<!--<select :class="inputstyle1" id="xingbie">
										  <option>男</option>
										  <option>女</option>
										</select>-->
										<div class="shengri">
											<input type="text" value="生日" disabled>
											<input type="text" :class="inputstyle1" :placeholder="item.birth" disabled required>
										</div>
										<a>
											<span class="mint-field-state is-error error" @click="clickError($event,'','','base',item.gdr,item.birth)"><i class="mintui mintui-field-error hui1" id="colorf"></i></span>
											<span class="mint-field-state is-success success" @click="clickSuccess($event,'','','base',item.gdr,item.birth)"><i class="mintui mintui-field-success hui2" id="colory"></i></span>
										</a>
								</li>
						</ul>
					</li>
					<li>	
							<p>证件信息
								<a class="nav-sub-btn pull-right save" @click="crdetSave()"><i  class="fa fa-save"></i></a>
								<a class="nav-sub-btn pull-right save" @click="showSearchPanel"><i class="fa fa-plus"></i></a>
							</p>
							<ul class="subList" id="crdets">
								<li v-for="(item,index) in state.data.crdetsList">
										<input :name="item.cret_typ_code"  type="text" :placeholder="item.cret_typ"  required="required" @click="showPopupPicker($event,index)" disabled readonly />
										<input type="text" :class="inputstyle1" :placeholder="item.cret_num" required="required" disabled><i class="mintui mintui-field-error del" @click="delInput($event)" ></i>
										<a v-show="item.if_psg_cret=='2'&&item.add_flg=='N' ">
											<span class="mint-field-state is-error error" @click="clickError($event,index,'','crdets',item.cret_typ,item.cret_num,item.cret_typ_code)"><i class="mintui mintui-field-error hui1" ></i></span>
											<span class="mint-field-state is-success success" @click="clickSuccess($event,index,'','crdets',item.cret_typ,item.cret_num,item.cret_typ_code)"><i class="mintui mintui-field-success hui2"></i></span>
										</a>
										<a v-if="item.add_flg=='Y'" class="dele" @click="dele(index,'crdets')">
											<span>删除</span>
										</a>
										<a v-if="item.delete" class="dele" @click="deletew($event,index,'crdets')">
											<span>删除</span>
										</a>
								</li>
							</ul>
					</li>
					<li>	
							<p>  
								<span class="tixing">以下是待修复联系信息</span>
								联系信息
								<a class="nav-sub-btn pull-right save" @click="contactSave()"><i  class="fa fa-save"></i></a>
								<a class="nav-sub-btn pull-right save"  @click="showSearchContactPanel"><i class="fa fa-plus"></i></a>
							</p>
							<ul class="subList" id="contact">
								<li v-for="(item,index) in state.data.contList"> 
										<input type="text" :class="item.if_ext_tel== '0' ? 'liangse' : ''"  :placeholder="item.cont_typ"  :name="item.cont_typ_code" @click="showPopupContactPicker($event,index)" disabled readonly>
										<textarea type="text" :class="item.if_ext_tel== '0' ? 'liangse' : ''"  :placeholder="item.cont_cntnt" wrap='off' readonly></textarea><i class="mintui mintui-field-error del" @click="delInput($event)"></i>
										<a v-if="!item.noshow && item.add_flg=='N'">
											<span class="mint-field-state is-error error" @click="clickError($event,index,'','contact',item.cont_typ,item.cont_cntnt,item.cont_typ_code)"><i class="mintui mintui-field-error hui1" ></i></span>
											<span class="mint-field-state is-success success" @click="clickSuccess($event,index,'','contact',item.cont_typ,item.cont_cntnt,item.cont_typ_code)"><i class="mintui mintui-field-success hui2" ></i></span>
										</a>
										<a v-if="item.add_flg=='Y'" class="dele" @click="dele(index,'cont')">
											<span>删除</span>
										</a>
											<a v-if="item.delete" class="dele" @click="deletew($event,index,'contact')">
											<span>删除</span>
										</a>
								</li>
							</ul>
					</li>
					<!--<li class="dizhili">	
							<p>地址信息
								<a class="nav-sub-btn pull-right save" @click="addrSave()"><i  class="fa fa-save"></i></a>
								<a class="nav-sub-btn pull-right save"  @click="showSearchAddrPanel"><i class="fa fa-plus"></i></a>
							</p>
							<ul class="subList" id="addr">
								<li v-for="(item,index) in state.data.addrList">
										<input type="text" :value="item.addr_typ" :name="item.addr_typ_code"  @click="showPopupAddrPicker($event,index)" disabled>
										<textarea type="text" :class="inputstyle1" :value="item.addr_cntnt" disabled> {{item.addr_cntnt}}</textarea>
										<div  v-if="!item.noshow && item.add_flg=='N'">
											<input type="text" value="公司名称" disabled>
											<textarea type="text"  :value="item.comp" disabled>{{item.comp}}</textarea>
										</div>
										<a v-if="!item.noshow && item.add_flg=='N'" class="dizhi">
											<span class="mint-field-state is-error error" @click="clickError($event,index,'','addr')"><i class="mintui mintui-field-error hui" ></i></span>
											<span class="mint-field-state is-success success" @click="clickSuccess($event,index,'','addr')"><i class="mintui mintui-field-success hui" ></i></span>
										</a>
										<a v-if="item.add_flg=='Y'" class="dele" @click="dele(index,'addr')">
											<span>删除</span>
										</a>
										<a v-if="item.delete" class="dele" @click="deletew($event,index,'addr')">
											<span>删除</span>
										</a>
								</li>
							</ul>
					</li>-->
				</ul>
     </pull-to>
    </div>
    <!--<ul class="buttons">
        <li>
          <a>
            保存
          </a>
        </li>
        <li>
          <a>
           取消
          </a>
        </li>
      </ul>-->
    <router-view class="router-view-personal-remark" />
    <mt-popup
      v-model="popupTop"
      popup-transition="popup-fade"
      position="top">
      <div class="wrap" id="crdetsAdd">
        <input type="text"  placeholder="证件类型" readonly @click="showPopupPicker($event)" value=""/>
       	<input type="text"  placeholder="证件内容"  />
      </div>
      <div class="wrap">
        <mt-button type="primary" @click="crdets">确定</mt-button>
      </div>
    </mt-popup>
    <mt-popup
      v-model="popupContact"
      popup-transition="popup-fade"
      position="top">
      <div class="wrap" id="contactAdd">
        <input type="text" id="" placeholder="联系类型" readonly @click="showPopupContactPicker($event)" />
       	<input type="text" id="" placeholder="联系内容"  />
      </div>
      <div class="wrap">
        <mt-button type="primary" @click="contact">确定</mt-button>
      </div>
    </mt-popup>
     <mt-popup
      v-model="popupAddr"
      popup-transition="popup-fade"
      position="top">
      <div class="wrap" id="addrAdd" >
        <input type="text" id="" placeholder="地址类型" readonly @click="showPopupAddrPicker($event)" />
       	<input type="text" id="" placeholder="地址内容"  />
      </div>
      <div class="wrap">
        <mt-button type="primary" @click="addr">确定</mt-button>
      </div>
    </mt-popup>
     <mt-popup-picker
      ref="popupPicker"
      :dataSource="pickerData"
      @confirm="popupPickerConfirm"
      v-model="currentLvl"/>
      <mt-popup-picker
      ref="popupPickerContact"
      :dataSource="pickerContactData"
      @confirm="popupPickerContactConfirm"
      v-model="contactLvl"/>
      <mt-popup-picker
      ref="popupPickerAddr"
      :dataSource="pickerAddrData"
      @confirm="popupPickerAddrConfirm"
      v-model="addrLvl"/>
      <mt-popup-picker
      ref="popupPickerbase"
      :dataSource="pickerbaseData"
      @confirm="popupPickerbaseConfirm"
      v-model="baseLvl"/>
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import {mapState, mapActions} from 'vuex'
import { Field } from 'mint-ui';
import { Toast, MessageBox } from 'mint-ui'
import MtPopupPicker from '@/components/MtPopupPicker'
import sa from'sa-sdk-javascript';

const pickerData = [{name: '身份证',value:"01"}, {name: '护照',value:"02"}, {name: '返乡证',value:"03"}, {name: '军官证',value:"04"}, {name: '台胞证',value:"05"}, {name: '港澳通行证',value:"06"}, {name: '军残证',value:"07"}, {name: '未知',value:"98"}, {name: '其他证件',value:"99"}]
const pickerContactData = [{name: '手机',value:"01"}, {name: '固定电话',value:"02"}, {name: '传真',value:"03"}, {name: '电子邮件',value:"05"}, {name: '乘机电话',value:"06"}, {name: '微信',value:"07"}, {name: 'QQ',value:"08"}, {name: '空值',value:"98"}, {name: '其他号码',value:"99"}]
const pickerAddrData = [{name: '家庭地址',value:"01"}, {name: '公司地址',value:"02"}, {name: '未知',value:"09"}]
const pickerbaseData = [{name: '男',value:"男"}, {name: '女',value:"女"}]
//var gdrf = this.state.customer.repairDetail

// 	this.gdr = this.state.data.baseList[0].gdr
export default {
  name: 'remark',
  components: {
    PullTo,
     MtPopupPicker
  },
  data() {
    return {
      iconLink: '',
      email: '',
      bian: 'fa fa-edit',
      inputstyle1:'yuan',
      inputstyle2:'yuan',
      popupTop: false,
      popupContact: false,
      popupAddr: false,
      type: null,
      Lvl: [],
      pickerData: pickerData,
      currentLvl: pickerData[0],
      LvlContact: [],
      pickerbaseData: pickerbaseData,
      baseLvl:pickerContactData[0],
      Lvlbase: [],
      pickerContactData: pickerContactData,
      contactLvl: pickerContactData[0],
      LvlAddr: [],
      pickerAddrData: pickerAddrData,
      addrLvl: pickerAddrData[0],
      nowIndex:0,
      error:false,
      Success: '#4caf50',
     	Error: '#f44336',
     	Hui1: '#FFC1C1',
     	Hui2: '#EEEED1',
     	Num: 0,
     	colorSuccess:'',
     	colorError:'',
     	ajaxno :'',
     	et: {},
			crdetflag: '',
			contflag: '',
			baseflag: ''
    }
  },
  
  methods: {
		delInput(e) {
			var toggle = event.currentTarget.parentNode;
			toggle.children[1].value = '';
			toggle.children[1].placeholder= ''
			
    },
    allSave() {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '待修复客户详情',
        firstModel: '',
        secondModel: '',
        buttonName:'保存客户信息',
        buttonID:'',
	    });
      var crdetsData = this.crdetSave('all');
      var baseData= this.baseSave('all');
      var contData = this.contactSave('all');
      if(!crdetsData && !baseData && !contData){
      	Toast({
          message: '没有做操作，不能保存',
          position: 'bottom',
          duration: 2000
        })
      }else{
      	this.crdetflag= '1'
      	this.contflag = '1'
      	this.baseflag = '1'
	      this.allcrdetsSave({
		      	params: {
		        	"login_cd": Login_cd,
		        	"crdetsData":((crdetsData== '') ? '' : JSON.stringify(crdetsData)),
		        	"baseData": ((baseData== '') ? '' : JSON.stringify(baseData)),
		        	"contData":((contData== '') ? '' : JSON.stringify(contData)),
		       },
		        merg_cust_id:this.$route.query.merg_cust_id,
		        refreshRepairDetail:this.refreshRepairDetail,
		     	})
	    }
    },
    deletew(event,index,flag){
    	  MessageBox({
        title: '提示',
        message: '信息没有保存，是否确定删除？',
        showCancelButton: true,
        confirmButtonText: '是',
        cancelButtonText: '否',
        confirmButtonHighlight: false
      }).then((action) => {
        if(action == 'confirm') {
         		Toast({
			          message: '删除成功',
			          position: 'bottom',
			          duration: 2000
			      });
			     var data = {
			     		index:index,
			     		flag:flag
			     }
			     this.setDelete(data)
        } 
      })
    },
    dele(index,deleteFlag){
    	var arrData = [];
    	if(deleteFlag == 'addr'){
    		  var ele = this.state.data.addrList[index];
    		  var batDate = ele.bat_date;
 //   			var BATDATE = new Date(batDate).toLocaleString().substring(0,10).replace(/\//g,"-");
    			var BATDATE = new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getFullYear()+"-"+(new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getMonth()+1)+"-"+new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getDate();
	  		  var FFP_CD_NUM = this.state.data.baseList[0].ffp_cd_num;
    			var list = {'MERG_CUST_ID': ele.merg_cust_id,'ADDR_TYP': ele.addr_typ_code,'ADDR':ele.addr_cntnt,'BAT_NUM':ele.bat_num,'BAT_DATE':BATDATE,'COMP':ele.comp,'FFP_CD_NUM':FFP_CD_NUM}
				  arrData.push(list);
    	}else if(deleteFlag == 'cont'){
    		  var ele = this.state.data.contList[index];
    		  var batDate = ele.bat_date;
//    			var BATDATE = new Date(batDate).toLocaleString().substring(0,10).replace(/\//g,"-");
					var BATDATE = new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getFullYear()+"-"+(new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getMonth()+1)+"-"+new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getDate();
	  		  var FFP_CD_NUM = this.state.data.baseList[0].ffp_cd_num;
    			var list = {'MERG_CUST_ID': ele.merg_cust_id,'CONT_TYP': ele.cont_typ_code,'CONT_CNTNT':ele.cont_cntnt,'BAT_NUM':ele.bat_num,'BAT_DATE':BATDATE,'FFP_CD_NUM':FFP_CD_NUM}
				  arrData.push(list);
    	}else if(deleteFlag == 'crdets'){
    			var ele = this.state.data.crdetsList[index];
    			var batDate = ele.bat_date;
 //   			var BATDATE = new Date(batDate).toLocaleString().substring(0,10).replace(/\//g,"-");
 					var BATDATE = new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getFullYear()+"-"+(new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getMonth()+1)+"-"+new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getDate();
	  		  var FFP_CD_NUM = this.state.data.baseList[0].ffp_cd_num;
    			var list = {'MERG_CUST_ID': ele.merg_cust_id,'CRET_TYP':ele.cret_typ_code,'CRET_NUM':ele.cret_num,'BAT_NUM':ele.bat_num,'BAT_DATE':BATDATE,'FFP_CD_NUM':FFP_CD_NUM}
				  arrData.push(list);
    	}
    	MessageBox({
        title: '提示',
        message: '是否确定删除？',
        showCancelButton: true,
        confirmButtonText: '是',
        cancelButtonText: '否',
        confirmButtonHighlight: false
      }).then((action) => {
        if(action == 'confirm') {
         		this.crdetsDelete({
		      	params: {
		        	"login_cd": Login_cd,
		        	"data":JSON.stringify(arrData),
		        	"deleteFlag": deleteFlag
		       },
		       merg_cust_id:this.$route.query.merg_cust_id,
		       refreshRepairDetail:this.refreshRepairDetail,
		       
		     	})
        } 
      })
    	
    },
    crdetSave(all) {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '待修复客户详情',
        firstModel: '',
        secondModel: '',
        buttonName:'保存证件信息',
        buttonID:'',
	    });
    	this.ajaxno = ""
    	var length = document.getElementById("crdets").children.length;
    	var ele = document.getElementById("crdets").children;
    	var arrData = [];
    	for(var i= 0 ; i< length; i++){
    		if(ele[i].children[1].value==''&& ele[i].children[1].placeholder==''){
	    			var affer_cret_num = '置空'
    		}else if(ele[i].children[1].value==''&& ele[i].children[1].placeholder!==''){
    			var affer_cret_num = ele[i].children[1].placeholder;
    		}else{
    			var affer_cret_num = ele[i].children[1].value;
    		}

    		var batDate = this.state.data.crdetsList[i].bat_date;
//    		batDate = new Date(batDate).toLocaleString().substring(0,10).replace(/\//g,"-");
				batDate = new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getFullYear()+"-"+(new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getMonth()+1)+"-"+new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getDate();
    		var a = ele[i].children[0].style.color;
    		var CRET_TYP = this.state.data.crdetsList[i].cret_typ_code;
    		var CRET_NUM = this.state.data.crdetsList[i].cret_num;
    		var AFTER_CRET_TYP = ele[i].children[0].name;
    		var AFTER_CRET_NUM = affer_cret_num;
    		var OPERAT_TYPE = '';
    		var BAT_NUM = this.state.data.crdetsList[i].bat_num
    		var BAT_DATE = batDate;
    		var MERG_CUST_ID = this.state.data.crdetsList[i].merg_cust_id;
    		var FFP_CD_NUM = this.state.data.baseList[0].ffp_cd_num;
    		var el = this.state.data.crdetsList[i];
    		if(el.success=="2" || el.error=="1" || el.operat=="0"){
    			if(el.success == "2"){
    				var OPERAT_TYPE ="2";
    				
    		//		alert(OPERAT_TYPE);
    			}else if(el.error=="1"){
    				var OPERAT_TYPE = "1";
    				AFTER_CRET_NUM = '删除';
    		//		alert(OPERAT_TYPE);
    			}else{
    				var OPERAT_TYPE = "0";
    				var CRET_TYP = this.currentLvl.value;
    				var CRET_NUM = this.state.data.crdetsList[i].cret_num;
    				var AFTER_CRET_TYP = this.currentLvl.value;
    				var AFTER_CRET_NUM = this.state.data.crdetsList[i].cret_num;
    				var OPERAT_TYPE = "0";
    				console.log(OPERAT_TYPE)
    			
    			}
    			var list = {'CRET_TYP': CRET_TYP,'CRET_NUM': CRET_NUM,'AFTER_CRET_TYP':AFTER_CRET_TYP,'AFTER_CRET_NUM':AFTER_CRET_NUM,'OPERAT_TYPE':OPERAT_TYPE,'BAT_NUM':BAT_NUM,'BAT_DATE':BAT_DATE,'MERG_CUST_ID':MERG_CUST_ID,'FFP_CD_NUM':FFP_CD_NUM}
    			arrData.push(list);
	    	}
    	}
    	var arrDatadel = [];
    	for(var i = 0; i<arrData.length ; i++){
    			if(arrData[i].OPERAT_TYPE == '1'){
//  					if(arrData[i].CRET_TYP==arrData[i].AFTER_CRET_TYP && arrData[i].CRET_NUM== arrData[i].AFTER_CRET_NUM){	
//  						arrData.splice(i, 1);
//  					}else{
    						arrDatadel.push(arrData[i]);
//  					}
    			}else{
    				arrDatadel.push(arrData[i]);
    			}
    	}
    	arrData = arrDatadel;
    	if(all == 'all'){
    			if(arrData.length == 0){
    				arrData = ''
    			}
    		  return arrData
			}else{
				if(arrData.length==0){
    				arrData = ''
    		}else{
					this.ajaxno = "提示"
				}
			}
    	if(this.ajaxno == "提示"){
    		 this.crdetflag ='1'
    		 if(arrData.length == 0){
    				arrData = ''
    			}
    		 this.crdetsSave({
	      	params: {
	        	"login_cd": Login_cd,
	        	"data":JSON.stringify(arrData),
	        	"writeFlag": "crdets"
	       },
	        merg_cust_id:this.$route.query.merg_cust_id,
	        refreshRepairDetail:this.refreshRepairDetail,
	     	})	
    	}else{
    		if(all !== 'all'){
	    		Toast({
	          message: '没有做操作，不能保存',
	          position: 'bottom',
	          duration: 2000
	       })
	    	}else{
	    		return ''
	    	}
	    }
    	
    },
    baseSave(all) { 
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '待修复客户详情',
        firstModel: '',
        secondModel: '',
        buttonName:'保存基本信息',
        buttonID:'',
	    });
	    
    	this.ajaxno = ""
    	var errEle = document.getElementById("colorf");
    	var sucEle = document.getElementById("colory");
    	var optype = "";
    	console.log(sucEle.style.color)
    	if(errEle.style.color== "rgb(244, 67, 54)" || sucEle.style.color == "rgb(76, 175, 80)"){
    		if(errEle.style.color== "rgb(244, 67, 54)"){
    			optype = "1";
    		}else{
    			optype = "2";
    		}
    		var ele = document.getElementById("base").children;
	    	var arrData = [];
	    	var batDate = this.state.data.baseList[0].bat_date;
	//    	batDate = new Date(batDate).toLocaleString().substring(0,10).replace(/\//g,"-");
	    	 batDate = new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getFullYear()+"-"+(new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getMonth()+1)+"-"+new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getDate();
	    		if(ele[1].children[1].value==''&& ele[1].children[1].placeholder==''){
	    			var affer_gdr = ele[1].children[1].placeholder;
	    		}else if(ele[1].children[1].value==''&& ele[1].children[1].placeholder!==''){
	    			var affer_gdr = ele[1].children[1].placeholder;
	    		}else{
	    			var affer_gdr = ele[1].children[1].value;
	    		}
	    		if(ele[1].children[2].children[1].value==''&& ele[1].children[2].children[1].placeholder==''){
	    			var affer_birth = ele[1].children[2].children[1].placeholder;
	    		}else if(ele[1].children[2].children[1].value==''&& ele[1].children[2].children[1].placeholder!==''){
	    			var affer_birth = ele[1].children[2].children[1].placeholder;
	    		}else{
	    			var affer_birth = ele[1].children[2].children[1].value;
	    		}
	    		var MERG_CUST_ID = this.state.data.baseList[0].merg_cust_id;
	    		var CH_NME = this.state.data.baseList[0].ch_nme;
	    		var GDR = this.state.data.baseList[0].gdr;
	    		var BIRTH = this.state.data.baseList[0].birth;
	    		var BAT_NUM = this.state.data.baseList[0].bat_num;
	    		var BAT_DATE = batDate;
	    		var AFTER_GDR = affer_gdr;
	    		var AFTER_BIRTH = affer_birth;
	    			var OPERAT_TYPE = optype;
		    		var FFP_CD_NUM = this.state.data.baseList[0].ffp_cd_num;
						var list = {'MERG_CUST_ID': MERG_CUST_ID,'CH_NME': CH_NME,'GDR':GDR,'BIRTH':BIRTH,'AFTER_GDR':AFTER_GDR,'AFTER_BIRTH':AFTER_BIRTH,'OPERAT_TYPE':OPERAT_TYPE,'BAT_NUM':BAT_NUM,'BAT_DATE':BAT_DATE,'FFP_CD_NUM':FFP_CD_NUM }
				    arrData.push(list);
						if(all == 'all'){
							if(GDR==AFTER_GDR && BIRTH==AFTER_BIRTH &&  OPERAT_TYPE == '1'){
	    					return ''
		    			}else{
		    				return arrData
		    			}
	    			}else{
	    				if(GDR==AFTER_GDR && BIRTH==AFTER_BIRTH &&  OPERAT_TYPE == '1'){
	    						Toast({
					          message: '没有做操作，不能保存',
					          position: 'bottom',
					          duration: 2000
					       })
	    				}else{
	    					this.baseflag ='1'
		    				this.crdetsSave({
				      	params: {
				        	"login_cd": Login_cd,
				        	"data":JSON.stringify(arrData),
				        	"writeFlag": "base"
				       },
				        merg_cust_id:this.$route.query.merg_cust_id,
				          refreshRepairDetail:this.refreshRepairDetail,
				     		})
		    			}
	    			}
			    	
	    		
    	}else{
    		if(all !== 'all'){
	    		Toast({
	          message: '没有做操作，不能保存',
	          position: 'bottom',
	          duration: 2000
	       })
	    	}else{
	    		return ''
	    	}
    	}
    },
    contactSave(all) { 
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '待修复客户详情',
        firstModel: '',
        secondModel: '',
        buttonName:'保存联系信息',
        buttonID:'',
	    });
    	this.ajaxno = ""
    	var length = document.getElementById("contact").children.length;
    	var ele = document.getElementById("contact").children;
    	var arrData = [];
    	for(var i= 0 ; i< length; i++){
    		if(ele[i].children[1].value==''&& ele[i].children[1].placeholder==''){
	    			var affer_cont_cntnt = '置空'
    		}else if(ele[i].children[1].value==''&& ele[i].children[1].placeholder!==''){
    			var affer_cont_cntnt = ele[i].children[1].placeholder;
    		}else{
    			var affer_cont_cntnt = ele[i].children[1].value;
    		}

    		var batDate = this.state.data.contList[i].bat_date;
//    		batDate = new Date(batDate).toLocaleString().substring(0,10).replace(/\//g,"-");
				batDate = new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getFullYear()+"-"+(new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getMonth()+1)+"-"+new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getDate();
    		var a = ele[i].children[0].style.color;
      	var MERG_CUST_ID = this.state.data.contList[i].merg_cust_id;
	  		var CONT_TYP = this.state.data.contList[i].cont_typ_code;
	  		var CONT_CNTNT = this.state.data.contList[i].cont_cntnt;
	  		var AFTER_CONT_TYP = ele[i].children[0].name;
	  		var AFTER_CONT_CNTNT = affer_cont_cntnt;
	  		var BAT_NUM = this.state.data.contList[i].bat_num
    		var BAT_DATE = batDate;
    		var FFP_CD_NUM = this.state.data.baseList[0].ffp_cd_num;
    		var el = this.state.data.contList[i];
    		if(el.success=="2" || el.error=="1" || el.operat=="0"){
    			if(el.success == "2"){
    				var OPERAT_TYPE ="2";
    			}else if(el.error=="1"){
    				var OPERAT_TYPE = "1";
    				var AFTER_CONT_CNTNT = '删除';
    			}else{
    				var CONT_TYP = this.contactLvl.value;
    				var CONT_CNTNT =this.state.data.contList[i].cont_cntnt;
    				var AFTER_CONT_CNTNT = this.state.data.contList[i].cont_cntnt;
    				var AFTER_CONT_TYP = this.contactLvl.value;
    				var OPERAT_TYPE = "0";
    				
    				
    				
    			}
    				var list = {'MERG_CUST_ID': MERG_CUST_ID,'CONT_TYP': CONT_TYP,'CONT_CNTNT':CONT_CNTNT,'AFTER_CONT_TYP':AFTER_CONT_TYP,'AFTER_CONT_CNTNT':AFTER_CONT_CNTNT,'OPERAT_TYPE':OPERAT_TYPE,'BAT_NUM':BAT_NUM,'BAT_DATE':BAT_DATE,'FFP_CD_NUM':FFP_CD_NUM}
    				arrData.push(list);		
	    	}
    	}
    	var arrDatadel = [];
    	for(var i = 0; i<arrData.length ; i++){
    			if(arrData[i].OPERAT_TYPE == '1'){
    					if(arrData[i].CONT_TYP==arrData[i].AFTER_CONT_TYP && arrData[i].CONT_CNTNT== arrData[i].AFTER_CONT_CNTNT){	
//  						  arrData.splice(0, 1);
    					}else{
    						arrDatadel.push(arrData[i]);
    					}
    			}else{
    				arrDatadel.push(arrData[i]);
    			}
    	}
    	arrData = arrDatadel;
    	if(all == 'all'){
    			if(arrData.length==0){
    				arrData = ''
    			}
    		  return arrData
			}else{
				if(arrData.length==0){
    				arrData = ''
    		}else{
					this.ajaxno = "提示"
				}
			}
    	if(this.ajaxno == "提示"){
    		 this.contflag = '1'
    		 this.crdetsSave({
	      	params: {
	        	"login_cd": Login_cd,
	        	"data":(arrData== '')? arrData: JSON.stringify(arrData),
	        	"writeFlag": "cont"
	       },
	        merg_cust_id:this.$route.query.merg_cust_id,
	        refreshRepairDetail:this.refreshRepairDetail,
	     	})
    	}else{
	    	if(all !== 'all'){
	    
	    		Toast({
	          message: '没有做操作，不能保存',
	          position: 'bottom',
	          duration: 2000
	       })
	    	}else{
	    		return ''
	    	}
	    }
    },
    addrSave() { 
    	this.ajaxno = ""
    	var length = document.getElementById("addr").children.length;
    	var ele = document.getElementById("addr").children;
    	var arrData = [];
    	for(var i= 0 ; i< length; i++){
    		if(this.state.data.addrList[i]){
    			var batDate = this.state.data.addrList[i].bat_date;
//    			batDate = new Date(batDate).toLocaleString().substring(0,10).replace(/\//g,"-");
					batDate = new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getFullYear()+"-"+(new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getMonth()+1)+"-"+new Date(parseInt(("/Date("+batDate+")/").substr(6, 13))).getDate();
 		    	var MERG_CUST_ID = this.state.data.addrList[i].merg_cust_id;
	  			var ADDR_TYP = this.state.data.addrList[i].addr_typ_code;
	    		var ADDR = this.state.data.addrList[i].addr_cntnt;
	    		var COMP = this.state.data.addrList[i].comp;
	  		  var AFTER_ADDR_TYP = ele[i].children[0].name;
	  		  var AFTER_ADDR = ele[i].children[1].value;
	  		  var AFTER_COMP = '';
		  		var OPERAT_TYPE = "";
					var BAT_NUM = this.state.data.addrList[i].bat_num;
    			var BAT_DATE = batDate;
    			var FFP_CD_NUM = this.state.data.addrList[i].ffp_cd_num;
    			var el = this.state.data.addrList[i];
	    		if(el.success=="2" || el.error=="1" || el.operat=="0"){
	    			if(el.success == "2"){
	    				var OPERAT_TYPE ="2";
	    				var AFTER_COMP = ele[i].children[2].children[1].value? ele[i].children[2].children[1].value : '';
	    			}else if(el.error=="1"){
	    				var OPERAT_TYPE = "1";
	    				var AFTER_COMP = ele[i].children[2].children[1].value? ele[i].children[2].children[1].value : '';
	    				var flag = '';
	    			}else{
	    				var ADDR_TYP = this.addrLvl.value;
	    				var ADDR = this.state.data.addrList[i].addr_cntnt;
	    				var AFTER_ADDR_TYP = this.addrLvl.value;
	    				var AFTER_ADDR = this.state.data.addrList[i].addr_cntnt;
	    				var OPERAT_TYPE = "0";
	    			}
	    			var list = {'MERG_CUST_ID': MERG_CUST_ID,'ADDR_TYP': ADDR_TYP,'ADDR':ADDR,'COMP':COMP,'AFTER_ADDR_TYP':AFTER_ADDR_TYP,'AFTER_ADDR':AFTER_ADDR,'AFTER_COMP':AFTER_COMP,'OPERAT_TYPE':OPERAT_TYPE,'BAT_NUM':BAT_NUM,'BAT_DATE':BAT_DATE,'FFP_CD_NUM':FFP_CD_NUM}
    				arrData.push(list);
	    			this.ajaxno = "提示"
		    	}
    		}
    	}
    	if(this.ajaxno == "提示"){
    		this.crdetsSave({
	      	params: {
	        	"login_cd": Login_cd,
	        	"data":JSON.stringify(arrData),
	        	"writeFlag": "addr"
	       },
	        merg_cust_id:this.$route.query.merg_cust_id,
	        refreshRepairDetail:this.refreshRepairDetail,
	     })
    	}else{
	    	Toast({
          message: '没有做操作，不能保存',
          position: 'bottom',
          duration: 2000
        })
	    }
    	
    },
    edit(id) {
      this.setRemark(id)
      this.$router.push('/search/customer/detail/remark/edit')
    },
    goBack() {
    	var crdetsData = this.crdetSave('all');
      var baseData= this.baseSave('all');
      var contData = this.contactSave('all');
      if(crdetsData || baseData || contData){
      	if((this.crdetflag == '0'&& crdetsData) || (this.contflag=='0'&& contData)|| (this.baseflag=='0'&&baseData) ){
	      	MessageBox({
		        title: '提示',
		        message: '存在未保存的数据，是否确认返回？',
		        showCancelButton: true,
		        confirmButtonText: '是',
		        cancelButtonText: '否',
		        cancelButtonTextHighlight: false
		      }).then((action) => {
		      	if(action == 'confirm') {
		          this.$router.go(-1)
		        }
		      })
	      }else{
	      	this.$router.go(-1)
	      }
	    }else{
	    	this.$router.go(-1)
	    }
    },
    clickError (event,num,flag,type,typ,content,typ_code){
    	
	    var toggle = event.currentTarget.parentNode;
	    if(toggle.firstChild.firstChild.style.color == '' || toggle.firstChild.firstChild.style.color == 'rgb(255, 193, 193)'){
	    	if(type == 'crdets'){
	    		this.crdetflag = '0'
	    	}else if(type == 'base'){
	    		this.baseflag = '0'
	    	}else if(type == 'contact'){
	    		this.contflag = '0'
	    	}
	    	toggle.firstChild.firstChild.style.color = this.Error;
	    	toggle.lastChild.firstChild.style.color = this.Hui2;
				toggle.lastChild.firstChild.name = "1";
     			this.colorError = "1";
	    	if(flag){
	    		//变成输入框
//		    	toggle.parentNode.children[1].style.border = '1px solid #999'
//		    	toggle.parentNode.children[1].disabled = '';
	    	}else if(type =="addr"){
//	    		toggle.parentNode.children[0].style.border = '1px solid #999'
//		    	toggle.parentNode.children[1].style.border = '1px solid #999'
//		    	toggle.parentNode.children[2].children[1].style.border='1px solid #999'
//		    	toggle.parentNode.children[0].disabled = '';
//		    	toggle.parentNode.children[1].disabled = '';
//		    	toggle.parentNode.children[2].children[1].disabled = '';
		    }else if(type =="base"){
		    	toggle.parentNode.children[1].style.border = '1px solid #999';
		    	toggle.parentNode.children[2].children[1].style.border='1px solid #999';
		    	toggle.parentNode.children[1].disabled = '';
		    	toggle.parentNode.children[2].children[1].disabled = '';
	    	}else{
	    		//变成输入框
//		    	toggle.parentNode.children[0].style.border = '1px solid #999';
//		    	toggle.parentNode.children[1].style.border = '1px solid #999';
//		    	toggle.parentNode.children[2].style.display = 'inline-block'
//		    	toggle.parentNode.children[0].disabled = '';
//		    	toggle.parentNode.children[1].disabled = '';
	    	}
	    	var data ={
	    		"type": type,
	    		"index": num,
	    		"error":"1",
	    		"success":"3",
	    	}
	   		this.setColor(data)
	    }else{
	    	var one = toggle.parentNode.children[0].value;
	    	var one1 = toggle.parentNode.children[0].placeholder;
	    	var two = toggle.parentNode.children[1].value;
	    	var two1 = toggle.parentNode.children[1].placeholder;

	    	if(flag){
	    		
	    	}else if(type =="addr"){
	    	
		    }else if(type =="base"){
		    	var one = toggle.parentNode.children[1].value;
		    	var one1 = toggle.parentNode.children[1].placeholder;
		    	var two = toggle.parentNode.children[2].children[1].value;
		    	var two1 = toggle.parentNode.children[2].children[1].placeholder;
		    	this.colorError = "";
					toggle.firstChild.firstChild.style.color = this.Hui1;
					toggle.lastChild.firstChild.name = " ";
					toggle.parentNode.children[1].style.border = '1px solid #fff';
		    	toggle.parentNode.children[2].children[1].style.border='1px solid #fff';
		    	toggle.parentNode.children[1].disabled = 'disabled';
	    		toggle.parentNode.children[2].children[1].disabled = 'disabled';
		    	if((one==typ  || (one1==typ&&one=='')) && (two==content || (two1==content&&two==''))){
		    	}else{
		    		toggle.parentNode.children[1].value= typ;
		    		toggle.parentNode.children[2].children[1].value=content;
		    	}
	    	}else{	
	    			toggle.parentNode.children[2].style.display = 'none';
						toggle.parentNode.children[0].style.border = '1px solid #fff';
		    		toggle.parentNode.children[1].style.border = '1px solid #fff';
		    		toggle.parentNode.children[0].disabled = 'disabled';
		    		toggle.parentNode.children[1].disabled = 'disabled';
		    		this.colorError = "";
						toggle.firstChild.firstChild.style.color = this.Hui1;
						toggle.lastChild.firstChild.name = " ";
	    		if((one==typ  || (one1==typ&&one=='')) && (two==content || (two1==content&&two==''))){
		    		
		    	}else{
		    		toggle.parentNode.children[1].value = '';
		    		toggle.parentNode.children[1].placeholder = content;
		    		toggle.parentNode.children[0].value = '';
		    		toggle.parentNode.children[0].placeholder = typ;
		    		toggle.parentNode.children[0].name = typ_code;
		    	}
	    	}
	    		var data ={
		    		"type": type,
		    		"index": num,
		    		"error":"3",
		    	}
		   		this.setColor(data)
	    }
		},
		clickSuccess (event,num,flag,type,typ,content){
			
			var toggle = event.currentTarget.parentNode;
			 if(toggle.lastChild.firstChild.style.color == '' || toggle.lastChild.firstChild.style.color == 'rgb(238, 238, 209)'){
	      this.colorSuccess = "2";
	      if(type == 'crdets'){
	    		this.crdetflag = '0'
	    	}else if(type == 'base'){
	    		this.baseflag = '0'
	    	}else if(type == 'contact'){
	    		this.contflag = '0'
	    	}
				var one = toggle.parentNode.children[0].value;
	    	var one1 = toggle.parentNode.children[0].placeholder;
	    	var two = toggle.parentNode.children[1].value;
	    	var two1 = toggle.parentNode.children[1].placeholder;
	    	if(flag){
	    		
	    	}else if(type =="addr"){
	    	
		    }else if(type =="base"){
		    	var one = toggle.parentNode.children[1].value;
		    	var one1 = toggle.parentNode.children[1].placeholder;
		    	var two = toggle.parentNode.children[2].children[1].value;
		    	var two1 = toggle.parentNode.children[2].children[1].placeholder;
		    	if((one==typ  || (one1==typ&&one=='')) && (two==content || (two1==content&&two==''))){
		    		toggle.parentNode.children[1].style.border = '1px solid #fff';
			    	toggle.parentNode.children[2].children[1].style.border='1px solid #fff';
			    	toggle.parentNode.children[1].disabled = 'disabled';
		    		toggle.parentNode.children[2].children[1].disabled = 'disabled';
		    		toggle.lastChild.firstChild.style.color = this.Success;
			    	toggle.firstChild.firstChild.style.color = this.Hui1;
			    	toggle.firstChild.firstChild.name="2";
		    	}
	    	}else{	
	    		if((one==typ  || (one1==typ&&one=='')) && (two==content || (two1==content&&two==''))){
			    	toggle.parentNode.children[0].style.border = '1px solid #fff';
			    	toggle.parentNode.children[1].style.border = '1px solid #fff';
			    	toggle.parentNode.children[2].style.display = 'none';
			    	toggle.parentNode.children[0].disabled = 'disabled';
			    	toggle.parentNode.children[1].disabled = 'disabled';
			    	toggle.lastChild.firstChild.style.color = this.Success;
			    	toggle.firstChild.firstChild.style.color = this.Hui1;
			    	toggle.firstChild.firstChild.name="2";
			    }
	    	}
//	    	toggle.lastChild.firstChild.style.color = this.Success;
//	    	toggle.firstChild.firstChild.style.color = this.Hui1;
//	    	toggle.firstChild.firstChild.name="2";
//	    	//取消输入框
//	    	toggle.parentNode.children[0].style.border = '1px solid #fff';
//	    	toggle.parentNode.children[1].style.border = '1px solid #fff';
//	    	toggle.parentNode.children[2].style.display = 'none';
//	    	toggle.parentNode.children[0].disabled = 'disabled';
//	    	toggle.parentNode.children[1].disabled = 'disabled';
//	    	toggle.parentNode.children[2].children[1].style.border = '1px solid #fff';
//	    	toggle.parentNode.children[2].children[1].disabled = 'disabled';
	    	var data ={
	    		"type": type,
	    		"index": num,
	    		"success":"2",
	    		"error":"3"
	    	}
	   		this.setColor(data)
	    }else{
	    	this.colorSuccess = "";
	    	toggle.firstChild.firstChild.name=" ";
				toggle.lastChild.firstChild.style.color = this.Hui2;		
				var data ={
	    		"type": type,
	    		"index": num,
	    		"success":"3",
	    	}
				this.setColor(data)
	    }
		},
		showPopupPicker(event,num,flag) {
      this.$refs.popupPicker.open()  
      this.Num = num  
      this.et = event.currentTarget
   	},
    popupPickerConfirm() {	
    	var toggle = this.et;
    	console.log(toggle)
    	toggle.value = this.currentLvl.name;
    	toggle.name = this.currentLvl.value;
    },
    showPopupContactPicker(event,num) { 
      this.$refs.popupPickerContact.open()  
      this.Num = num  
      this.et = event.currentTarget
   	},
   	showPopupbasePicker(event,num) { 
      this.$refs.popupPickerbase.open()  
      this.Num = num  
      this.et = event.currentTarget
   	},
   	popupPickerbaseConfirm() {	
    	var toggle = this.et;
    	toggle.value = this.baseLvl.name;
    	toggle.name = this.baseLvl.value;
    },
    popupPickerContactConfirm() {	
    	var toggle = this.et;
    	toggle.value = this.contactLvl.name;
    	toggle.name = this.contactLvl.value;
    },
    showPopupAddrPicker(event,num) { 
    	this.et = event.currentTarget
    	this.et.value = "";
      this.$refs.popupPickerAddr.open()  
      this.Num = num  
      
   	},
    popupPickerAddrConfirm() {	
    	var toggle = this.et;
    	console.log(toggle)
    	toggle.value = this.addrLvl.name;
    	toggle.name = this.addrLvl.value;
    },
    showSearchPanel() {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '待修复客户详情',
        firstModel: '',
        secondModel: '',
        buttonName:'添加证件信息',
        buttonID:'',
	    });
//    	this.gdr = document.getElementById("gdr").value
 //   	console.log(this.gdr)
//  	this.gdr = this.state.data.baseList[0].gdr
      this.popupTop = true
    },
    showSearchContactPanel() {
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '待修复客户详情',
        firstModel: '',
        secondModel: '',
        buttonName:'添加联系信息',
        buttonID:'',
	    });
      this.popupContact = true
    },
    showSearchAddrPanel() {
      this.popupAddr = true
    },
    plus(){
    	alert("22")
    },
    crdets(){
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '待修复客户详情',
        firstModel: '添加证件信息',
        secondModel: '',
        buttonName:'提交证件信息',
        buttonID:'',
	    });
    	var ele = document.getElementById("crdetsAdd");
    	var type = ele.children[0].value;
    	var content = ele.children[1].value;
    	if(content == '') {
        Toast({
          message: '请填写必填项',
          position: 'bottom',
          duration: 2000
        })
        return;
     }
    	this.popupTop = false
    	var data = {
    		"bat_num":this.state.data.baseList[0].bat_num,
    		"cret_num": content,
    		"cret_typ":type,
    		"if_psg_cret":"",
    		"bat_date":this.state.data.baseList[0].bat_date,
    		"merg_cust_id":this.state.data.baseList[0].merg_cust_id,
    		"operat": "0",
    		"flag":"crdets",
    		"delete":true,
    		"ffp_cd_num":this.state.data.baseList[0].ffp_cd_num
    		
    	};
    	this.setAdd(data)
    	this.crdetflag ='0'
    	ele.children[0].value = '';
    	ele.children[1].value = '';
    },
    contact(){
    	sa.track('importButtonClick', {
        AppOfButton: '尊鹏之音',
        AppId:'11646658',
        loginId:Login_cd,
        PageOfButton: '待修复客户详情',
        firstModel: '添加联系信息',
        secondModel: '',
        buttonName:'提交联系信息',
        buttonID:'',
	    });
    	var ele = document.getElementById("contactAdd");
    	var type = ele.children[0].value;
    	var content = ele.children[1].value;
    	if(content == '') {
        Toast({
          message: '请填写必填项',
          position: 'bottom',
          duration: 2000
        })
        return;
     	}
    	this.popupContact= false
    	var data = {
    		"bat_num":this.state.data.baseList[0].bat_num,
    		"biz_date": null,
    		"cont_cntnt": content,
    		"cont_typ":type,
    		"if_ext_tel":"",
    		"merg_cust_id":this.state.data.baseList[0].merg_cust_id,
    		"bat_date":this.state.data.baseList[0].bat_date,
    		"stat":"",
    		"flag":"contact",
    		"operat": "0",
    		"noshow":true,
    		"delete":true,
    		"ffp_cd_num":this.state.data.baseList[0].ffp_cd_num
    	};
    	this.setAdd(data)
    	this.contflag ='0'
    	ele.children[0].value = '';
    	ele.children[1].value = '';
    },
    addr(){
    	var ele = document.getElementById("addrAdd");
    	var type = ele.children[0].value;
    	var content = ele.children[1].value;
    	if(content == '') {
        Toast({
          message: '请填写必填项',
          position: 'bottom',
          duration: 2000
        })
        return;
      }
    	this.popupAddr=  false
    	var data = {
    		"addr_cntnt":content,
    		"addr_typ":type,
    		"bat_date":this.state.data.baseList[0].bat_date,
    		"merg_cust_id":this.state.data.baseList[0].merg_cust_id,
    		"bat_num":this.state.data.baseList[0].bat_num,
    		"biz_date": null,
    		"comp":"",
    		"operat": "0",
    		"noshow":true,
    		"flag":"addr",
    		"delete":true,
    		"ffp_cd_num":this.state.data.baseList[0].ffp_cd_num
    	};
    	this.setAdd(data)
    	ele.children[0].value = '';
    	ele.children[1].value = '';
    },
    refresh(loaded) {
      this.refreshRemark({
        params: null,
        loaded: loaded
      })
    },
    stateChange(state) {
      if (state === 'pull' || state === 'trigger') {
        this.iconLink = '#icon-arrow-bottom'
      } else if (state === 'loading') {
        this.iconLink = '#icon-loading'
      } else if (state === 'loaded-done') {
        this.iconLink = '#icon-finish'
      }
    },
    ...mapActions([
      'refreshRepairDetail',
      'setAdd',
      'setColor',
      'crdetsSave',
      'crdetsDelete',
      'setDelete',
      'allcrdetsSave'
    ])
  },
  computed: {
    ...mapState({
      state: function (state) {
        return {
          customer: state.customer.customer,
          data: state.customer.repairDetail
        }
        console.log('33',this.state.data.baseList[0].gdr)
       
      }
    })
  },
  beforeMount () {
  	sa.init({
			server_url: urlmai, 
		});
		sa.login(Login_cd);
		sa.quick('autoTrack');
		
    this.refreshRepairDetail({
      	params: {
        	"login_cd": Login_cd,
        	"merg_cust_id":this.$route.query.merg_cust_id,
        },
      loaded: null,
    })
  },
//beforeUpdate() {
// 	console.log('11',this.state.data.baseList[0].gdr)
// 	this.gdr = this.state.data.baseList[0].gdr
//},

}
</script>

<style scoped rel="stylesheet/less" lang="less">
  @import "../less/vue-pull-to.less";
  @import "../less/common.less";
  .list li {
    overflow: hidden;
    height: auto;
    line-height: @line-height-normal;
    padding: 0;
    input{
    	border: 1px solid #fff;
    }
    a{
    	display: inline;
    }
       /* border-bottom: 1px solid #eee;
*/    p{
    	padding: 10px;
    	background-color: #fafafa;
    }
    .wrap {
      padding: 10px 0;
      line-height: @line-height-normal;
      p {
        font-size: @font-size-normal;
        color: @font-color-gray;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
          font-color: @font-color-normal;
        }
      }
    }
  }
  .list li:nth-child(even) {
    background-color: white;
  }
  .list li:last-child {

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
  .router-view-personal-remark {
    position: absolute;
    top: 0;
    bottom: 0;
    display:block;
    width: 100%;
    overflow: hidden;
    background-color: white;
  }
  .wrap img{
  	width: 20px;
  	padding: 0 5px;
  }
  .wrap p{
  	width:50% !important;
  	display: inline-block;
  	
  }
  .list input{
  	
  }
  .list .mint-field .mint-cell-value input{
  	/*border: 1px soild #000;*/
  }
  .mint-field-state{
  	left: 10px !important;  
  	}
  .title{
  	width:20%;
  	display: inline-block;
  }
  .info{
  	
  }
  .row{
  	padding: 10px 10px;

  }
  .row .yuan{
  	    border: 1px solid #fff;
  	    line-height: 21px;
  	        width: 40%;
  }
  .row label{
  	padding: 0 20px;
  	line-height: 21px;
  	width:20%
  }
  .mint-indexlist-content{
  	height: 300px !important;
  }
  .mint-cell-wrapper{
  	background-image: none;
  }
  .detail{
    padding: 10px;
    padding-top: 0px;
    border-bottom: 1px solid #eee;
}
.detail li{
    float: left;
    width: 49%;
    margin-top: 10px;
}
.sep {
    background-color: #f7f7f7;
    height: 5px;
}
.mint-field-state .mintui {
    font-size: 25px;
}
.inputkan{
	border: #666666;
	  width: 40%;
}
.hui1{
	color: #FFC1C1;
	
}
.hui2{
	color: #EEEED1;
	
}
.list{
	li p a.save{
		padding: 0 0 0 20px;
	}
	.subList li{
		padding: 10px;
		font-size: 14px;
		line-height: 30px;
		label{
			display: inline-block;
	    width: 20%;
	    padding-left: 5%;
		}
		input{
			width:45%;
			padding-right: 30px;
			border: 1px solid #fff;
		}
		textarea{
			border: 1px solid #fff;
			line-height: 21px;
			height: 20.8px;
		}
		input:nth-child(1) {
		    width: 16%;
		    float: left;
		    padding-right: 10px;
		    margin-right: 5px;
	    }
		.error{
			float: right;
		}
		.success{
			float: right;
			padding-right: 4%;
		}
		.opt{
			display: inline;
		}
	}
}
li img{
	    width: 23px;
    margin-bottom: -8px;
}
.hui{
	color: #ccc;
}
.last span{
	padding-right: 10px;
}
.gongsi{
	padding: 0 10px!important;
}
.gongsi input{
	padding: 15px 10px !important;
}
textarea{
	line-height: 18px;
	border: #fff;
}
.buttons {
    position: absolute;
    bottom: 0;
    width: 100%;
    li {
      float:left;
      width: 50%;
      background: @color-theme-2;
      a {
        display: block;
        height: 44px;
        line-height: 44px;
        color: @font-color-white;
        text-align: center;
      }
    }
    li:first-child {

    }
    li:last-child {
      border-left: 1px solid white;
      margin-left: -1px;
    }
  }
  .pull-to-wrap{
  	bottom: 0px !important;
  }
  .dele{
  	float: right;
  	font-size: 12px;
  	padding: 0 10px;
  	background: rgb(244, 67, 54);
    border-radius: 5px;
    color: #fff;
  }
  .mingzi{
  	padding-bottom: 0px !important;
  }
  .shengri{
  	padding-top: 10px !important;
  }
  .tixing{
  	font-size: 12px;
  	color: red;
  	display: block;
  }
  input[disabled]{color:#999;opacity:1}
  .liangse::placeholder{color:#000;opacity:1}
  /*.dele{
  	float: right;
    font-size: 12px;
    padding: 0 10px;
    background: rgb(244, 67, 54);
    color: #fff;
    border-radius: 5px;
    line-height: 20px;
    height: 20px !important;
    text-align: center;
  }*/
 .del{
 	  color: #ccc;
    margin-left: -30px;
    display: none;
 }
 /*input[placeholder], [placeholder], *[placeholder] {
    color: red !important;
}*/
 #xingbie{
 	      width: 57%;
    padding-right: 30px;
    line-height: 21px;
    height: auto;
    margin-bottom: 5px;
    padding: 7px 10px;
    border-radius: 3px;
    outline: 0;
    background-color: #fff;
    font-size: 14px;
        border: 1px solid #fff;
 }
  #xingbie option {
  	appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  }
</style>
