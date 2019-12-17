// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
	
    properties: {
		initA:[],
		initB:[],
		initC:[],
		paodao_list:[]
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
		this.initA=[0b0101001100,0b0011001100,0b0100001000];
		this.initB=[0b0101001100,0b0011001100,0b0100001000];
		this.initC=[0b0101001100,0b0011001100,0b0100001000];
	},
	
	//（未完成）
	getRandomLangGang:function(temp){
		return(temp[0]);
	},
	initLanGang:function(){
		var A=this.getRandomLangGang(this.initA);
		for(var i=0;i<10;i++){
			if((A&0b1000000000)>0){
				this.paodao_list.push(10*i);
			}
			A=A<<1;
		}
		A=this.getRandomLangGang(this.initB);
		for(var i=0;i<10;i++){
			if((A&0b1000000000)>0){
				this.paodao_list.push(10*i+100);
			}
			A=A<<1;
		}
		A=this.getRandomLangGang(this.initC);
		for(var i=0;i<10;i++){
			if((A&0b1000000000)>0){
				this.paodao_list.push(10*i+200);
			}
			A=A<<1;
		}
		console.log(this.paodao_list);
	},
    start () {
		this.initLanGang();
    },
    update (dt) {
		
	},
});
