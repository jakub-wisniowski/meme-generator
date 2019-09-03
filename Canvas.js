import React from "react";

class Canvas extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.ctx = this.refs.canvas.getContext("2d");
        this.refs.canvas.style.width = '100%';
        this.refs.canvas.style.height = '100%';
        this.resizeCanvas();
        this.redraw();

        this.refs.image.onload = () => {
            this.redraw();
        }
    }

    resizeCanvas() {
        this.refs.canvas.width = this.refs.canvas.offsetWidth;
        this.refs.canvas.height = this.refs.canvas.offsetHeight;
        this.ctx.font = "40px Courier";
        this.ctx.textAlign = "center";
    }

    redraw() {
        this.scaleToFit();
        this.ctx.fillStyle = this.props.color;
        this.ctx.fillText(this.props.top, this.refs.canvas.width / 2, 75, this.refs.canvas.width * 0.9);
        this.ctx.fillText(this.props.bottom, this.refs.canvas.width / 2, this.scale * this.refs.image.height - 75, this.refs.canvas.width * 0.9);

    }

    scaleToFit() {
        const image = this.refs.image;
        const canvas = this.refs.canvas;
        // get the scale
        this.scale = Math.min(canvas.width / image.width, canvas.height / image.height);
        // get the top left position of the image
        const x = (canvas.width / 2) - (image.width / 2) * this.scale;
        const y = (canvas.height / 2) - (image.height / 2) * this.scale;
        this.ctx.drawImage(image, x, 0, image.width * this.scale, image.height * this.scale);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props === prevProps) return;
        this.resizeCanvas();
        this.redraw();
    }

    render() {
        return (
            <div className="meme">
                <canvas ref="canvas"/>
                <img ref="image" src={this.props.image} className="hidden"/>
            </div>
        )
    }

}

export default Canvas;