import React, {Component} from "react";
import Canvas from "./Canvas";

class MemeGenerator extends Component {
    constructor() {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: [],
            color: "#ffffff"
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data;
                this.setState({ allMemeImgs: memes })
            })
    }
    
    handleChange(event) {
        const {name, value} = event.target;
        this.setState({ [name]: value })
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
        const randMemeImg = this.state.allMemeImgs[randNum].url;
        this.setState({ randomImg: randMemeImg })
    }
    
    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <div className="text-inputs">
                        <input
                            type="text"
                            name="topText"
                            placeholder="Top Text"
                            value={this.state.topText}
                            onChange={this.handleChange}
                        />
                        <input
                            type="text"
                            name="bottomText"
                            placeholder="Bottom Text"
                            value={this.state.bottomText}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="buttons">
                        <label>
                            <input type="color" name="color" value={this.state.color} onChange={this.handleChange} />
                            <span>Text color</span>
                        </label>
                        <button>Gen</button>
                    </div>

                </form>
                <Canvas
                    image={this.state.randomImg}
                    top={this.state.topText}
                    bottom={this.state.bottomText}
                    color={this.state.color}
                />
            </div>
        )
    }
}

export default MemeGenerator