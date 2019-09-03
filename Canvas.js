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

    resizeCanvas() {
        this.refs.canvas.width = this.refs.canvas.offsetWidth;
        this.refs.canvas.height = this.refs.canvas.offsetHeight;
        this.ctx.font = "40px Courier";
        this.ctx.textAlign = "center";
    }

    exportMeme(event) {
        const image = this.refs.image;

        const newCanvas = document.createElement('canvas');
        newCanvas.width = this.scale * image.width;
        newCanvas.height = this.scale * image.height;

        // crop the white straps on the sides
        newCanvas
            .getContext('2d')
            .drawImage(
                this.refs.canvas,
                this.getImagePosition(),
                0,
                newCanvas.width,
                newCanvas.height,
                0,
                0,
                newCanvas.width,
                newCanvas.height);

        event.target.href = newCanvas.toDataURL('image/png');
        event.target.download = `${this.props.top} ${this.props.bottom}`;
    };


    redraw() {
        this.scaleToFit();
        this.ctx.fillStyle = this.props.color;
        this.ctx.fillText(this.props.top, this.refs.canvas.width / 2, 75, this.refs.canvas.width * 0.9);
        this.ctx.fillText(this.props.bottom, this.refs.canvas.width / 2, this.scale * this.refs.image.height - 75, this.refs.canvas.width * 0.9);
    }

    setScale() {
        const image = this.refs.image;
        const canvas = this.refs.canvas;

        this.scale = Math.min(canvas.width / image.width, canvas.height / image.height)
    }

    getImagePosition() {
        return (this.refs.canvas.width / 2) - (this.refs.image.width / 2) * this.scale
    }

    scaleToFit() {
        const image = this.refs.image;
        const canvas = this.refs.canvas;

        this.setScale();

        // fix Mozilla bug - images on top of each other
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.ctx.drawImage(image, this.getImagePosition(), 0, image.width * this.scale, image.height * this.scale);
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