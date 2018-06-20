import React from 'react';


export default class SuspendView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	isShow:this.props.isShow
        }
        this.goHomeRef = "";
	}
    componentDidMount() {
		this.addEventListenerGoHomeImg();
    	
    }
    componentWillReceiveProps(nextProps) {
    	this.setState({
    		isShow: nextProps.isShow
    	});
    }
    /**
     * 页面图标移动
     */
    addEventListenerGoHomeImg(){
    	let mStartX = 0;
    	let mStartY = 0;
    	let mLeft = 0;
    	let mTop = 0;
    	let mWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    	let mHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    	this.goHomeRef.addEventListener("touchstart", function(e) {
    	    let touches = e.touches[0];
    	    mStartX = touches.clientX - this.goHomeRef.offsetLeft;
    	    mStartY = touches.clientY - this.goHomeRef.offsetTop;
    	    //阻止页面的滑动默认事件
    	    // document.addEventListener("touchmove", this.documentListener.bind(this), false);
    	}.bind(this), false);
    	this.goHomeRef.addEventListener("touchmove", function(e) {
    	    let touches = e.touches[0];
    	    mLeft = touches.clientX - mStartX;
    	    mTop = touches.clientY - mStartY;
    	    if (mLeft < 0) {
    	        mLeft = 0;
    	    } else if (mLeft > mWidth - this.goHomeRef.offsetWidth) {
    	        mLeft = (mWidth - this.goHomeRef.offsetWidth);
    	    }
    	    if (mTop < 0) {
    	        mTop = 0;
    	    } else if (mTop > mHeight - this.goHomeRef.offsetHeight) {
    	        mTop = mHeight - this.goHomeRef.offsetHeight;
    	    }
    	    this.goHomeRef.style.left = mLeft + "px";
    	    this.goHomeRef.style.top = mTop + "px";
    	}.bind(this), false);
    	this.goHomeRef.addEventListener("touchend", function() {
    		if (mLeft!=0&&mTop!=0) {
    			if (mWidth/2<mLeft) {
    				this.goHomeRef.style.left = "auto";
    				this.goHomeRef.style.right = "0px";
    			}else{
    				this.goHomeRef.style.left = "0px";
    			}
    			this.goHomeRef.style.top = mTop + "px";
    		}
    		
    	    // document.removeEventListener("touchmove", this.documentListener.bind(this), false);
    	}.bind(this), false);
    }
    documentListener(e){
    	e.preventDefault();
    }
    /**
     * 到首页
     * @return {[type]} [description]
     */
    onGoHomeClick(){
    	// 点击操作

    }
    render() {
    	return (
    		<div>
    			 <img 
    			 	style={{display:this.state.isShow&&this.state.isShow=='1'?"inline":"none"}} 
    			 	onClick={this.onGoHomeClick.bind(this)} 
    			 	src={require("./image/icon_go_home.png")} 
    			 	ref={(ref) => {this.goHomeRef = ref}} 
    			 	className="go-home-img" 
    			 	alt=""/>
    		</div>
    	);
    }
}