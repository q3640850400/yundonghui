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
			visible:false
		},
		RunSpeed:{
			default:0,
			type:cc.float
		},
		RunSpeedMax:{
			default:40,
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
		JumpPower:{
			default:40,
			type:cc.float
		},
		FallSpeed:{
			default:0,
			type:cc.float,
			visible:false
		},
		distanceAlreadyRun:{
			default:0,
			type:cc.float,
			visible:false
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
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
		{
		this.STATE.IDLE=0;
		this.STATE.RUN=1;
		this.STATE.JUMP=2;
		this.STATE.FALL=3;
		}
		this.Origin_Y=this.node.y;
	},
	onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
	onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.d:{
                console.log('Press d key');
                break;
			}
			case cc.macro.KEY.space:{
				console.log('Press space key');
				break;
			}
        }
    },

    onKeyUp: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.d:{
                console.log('release d key');
                break;
			}
			case cc.macro.KEY.space:{
                console.log('release space key');
                break;
			}
        }
    },
	execGravity(dt){
		if(this.Origin_Y==this.node.y){return;}
		this.FallSpeed+=this.GRAVITY*dt;
		this.node.y=Math.max(this.Origin_Y,this.node.y-this.FallSpeed*dt);
	},
	ChangeState(sta){
		switch(sta){
			case:this.STATE.RUN:{
				if(_CurrentState===this.STATE.IDLE){
					this._CurrentState=this.STATE.RUN;
				}
				break;
			}
			case:this.STATE.JUMP:{
				if(_CurrentState===this.STATE.IDLE){
					this.FallSpeed=-this.JumpPower;
					this._CurrentState=this.STATE.JUMP;
				}
				if(_CurrentState===this.STATE.RUN){
					this.FallSpeed=-this.JumpPower;
					this._CurrentState=this.STATE.JUMP;
				}
				break;
			}
			case: this.STATE.IDLE:{
				if(_CurrentState===this.STATE.JUMP){
					this._CurrentState=this.STATE.IDLE;
				}
				break;
			}
		}
	},
	onState(dt){
		switch(this._CurrentState){
			case this.STATE.IDLE:{
				this.RunSpeed=Math.max(0,this.RunSpeed-this.RunSpeedPlus*2*dt);
				this.distanceAlreadyRun+=this.RunSpeed*dt;
				break;
			}
			case this.STATE.RUN:{
				//animation
				this.RunSpeed=Math.min(this.RunSpeedMax,this.RunSpeed+this.RunSpeedPlus*dt);
				this.distanceAlreadyRun+=this.RunSpeed*dt;
				break;
			}
			case this.STATE.JUMP:{
				if(FallSpeed<0){break;}
				if(this.Origin_Y==this.node.y){
					ChangeState(this.STATE.IDLE);
				}
				break;
			}
			case this.STATE.FALL:{break;}
		}
	},
	onControl(){
		
	}
	start () {

    },
    update (dt) {
		onState(dt);
		execGravity(dt);
	}
});
