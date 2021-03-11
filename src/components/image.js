import React, { Component }  from 'react';

class ImageFade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgLoaded:false,
            src: props.src,
            className: props.className,
            opacity: 0
        }
    }
    handleImgLoaded(event) {
        this.setState({
            imgLoaded:true,
            opacity: 1
        });
    }
    render() {
        const style = {
            opacity: this.state.opacity
        };
        return(<img src={this.state.src} style={style} className={this.state.className} onLoad={this.handleImgLoaded.bind(this)} />)
    }
}

export default ImageFade