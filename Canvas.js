import React from "react";

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.exportMeme = this.exportMeme.bind(this);
    }

    componentDidMount() {
        this.ctx = this.refs.canvas.getContext("2d");
        this.refs.canvas.style.width = '100%';
        this.refs.canvas.style.height = '50%';
        this.resizeCanvas();

        this.refs.image.onload = () => {
            this.redraw();
        };
    }

    exportMeme(event) {
        event.target.href = this.refs.canvas.toDataURL('image/png').replace('image/png', "image/octet-stream");
        event.target.download = `${this.props.top} ${this.props.bottom}`;
    };

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

        // fix Mozilla bug - images on top of each other
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);

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
                <img ref="image" crossOrigin="anonymous" src={this.props.image} className="hidden"/>
                <a href="#" className="exportButton" onClick={this.exportMeme}>Export meme</a>
            </div>
        )
    }

}

export default Canvas;