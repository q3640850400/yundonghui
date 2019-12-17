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
		_CurrentState:{
			default:0,
			visible:false
		},
		STATE:{
			default:{},
			visible:false
		},
		Origin_Y:{
			default:0,
			type:cc.float,
			visibility:false
		},
		RunSpeed:{
			default:0,
			type:cc.float
		},
		RunSpeedPlus:{
			default:10,
			type:cc.float
		},
		GRAVITY:{
			default:9.8,
			type:cc.float
		},
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
		{
		this.STATE.IDLE=0;
		this.STATE.RUN=1;
		this.STATE.JUMP=2;
		this.STATE.FALL=3;
		}
		this.Origin_Y=this.node.y;
	},
	execGravity(dt){
		if(this.Origin_Y==this.node.y){return;}
		this.node.y=Math.max(this.Origin_Y,this.node.y-this.GRAVITY*dt);
	},

	Running(){
		//this.RunSpeed+=this.RunSpeedPlus*
	},
    start () {

    },

    update (dt) {
		switch(_CurrentState){
			case this.STATE.IDLE:{break;}
			case this.STATE.RUN:{break;}
			case this.STATE.JUMP:{break;}
			case this.STATE.FALL:{break;}
		}
		execGravity(dt);
	},
});
