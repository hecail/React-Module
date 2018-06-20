import React from 'react';
export default class InputView extends React.Component {
    constructor(props) {
    	super(props);
    	this.state={
    		inputValue:""
    	}
    	this.inputRef = "";
    	this.isCompositions = true;
    	this.onChangeInput = this.onChangeInput.bind(this)
    }
    componentDidMount (){
    	this.inputRef.addEventListener('compositionstart', function(){//非直接的文字输入时（键盘输入中文的拼音）
		    this.isCompositions = false;
		}.bind(this))
		this.inputRef.addEventListener('compositionend', function(){//直接输入文字后（键盘选择真实的汉字）
			this.isCompositions = true;
		}.bind(this))
		this.inputRef.addEventListener('input', function(){
			 setTimeout(function(){
                if(this.isCompositions){
                	this.props.onChange({target:{value:this.inputRef.value}})
                }
            }.bind(this),100)
		}.bind(this));
    }
    onChangeInput(e){
		this.setState({
			inputValue: e.target.value
		});
    	
    }

     componentWillReceiveProps (newProps){
     	if (newProps.value!=this.state.inputValue) {
     		this.setState({
     			inputValue: newProps.value
     		});
     	}
     }
    render() {
    	let type = "";
    	let value = "";
    	let maxLength = "";
    	let placeholder = "";
    	let className = "";
    	let style = {};
    	if (this.props.type) {
    		type = this.props.type
    	}
    	if (this.props.value) {
    		value = this.props.value
    	}
    	if (this.props.maxLength) {
    		maxLength = this.props.maxLength
    	}
		if (this.props.placeholder) {
    		placeholder = this.props.placeholder
    	}
    	if (this.props.className) {
    		className = this.props.className
    	}
    	if (this.props.style) {
    		style = this.props.style
    	}
    	return(
			<input 
				type={type}
				maxLength={maxLength} 
				value={this.state.inputValue}
				placeholder={placeholder} 
				onChange = {this.onChangeInput}
				className={className}
				style={style}
				ref = {ref=>{this.inputRef=ref}}
			/>
    		)
    }
}