import React, { Component } from 'react'
import "./MemoryGame.css"

export default class MemoryGame extends Component {

    state = {counter:0 ,time: null, message:"", arrayOfNums: [] ,firstClick:null, color: "blue",backgroundColor: "blue"}
    firstTargetDiv
    turns= 0
    stopGame=false
    rightChoice = null
    arrayLength = 6

    componentDidMount(){
        this.creatBoard();
    }
    
    startGame = () =>{
        this.setState({time:setInterval(() => {
            this.setState({counter: this.state.counter+1})
        }, 1000)});
    }

    creatBoard = () =>{
        let temp = [...this.state.arrayOfNums];
        for (let i = 0; i < this.arrayLength/2; i++) {
            temp.push({number: i, clicked:false});
        }
        temp = [...temp,...temp]
        temp.sort(()=>Math.random() -0.5)
        this.setState({arrayOfNums: temp})
    }

    cardClickHandler =(e,i)=>{
        if (this.stopGame) {
            return
        }
        console.log(i);
        const temp = [...this.state.arrayOfNums];
        if (this.state.firstClick == null) {
            this.setState({firstClick:temp[i].number});
            e.target.style.backgroundColor="gray";
            this.firstTargetDiv= e.target
        }
        else{
            e.target.style.backgroundColor="gray";
            setTimeout(()=>{
                if (this.state.firstClick == temp[i].number) {
                console.log("same");
                this.turns = this.turns +1
                this.rightChoice = this.rightChoice +1
                if(this.rightChoice===this.state.arrayOfNums.length/2){
                    this.setState({message:"Game Over, Man!"})
                    clearInterval(this.state.time);
                }
            }else{
                console.log("try again!1");
                e.target.style.backgroundColor=this.state.backgroundColor;
                this.firstTargetDiv.style.backgroundColor=this.state.backgroundColor;
                this.turns = this.turns +1
            }
            this.setState({firstClick:null});
           }, 800)
        }
    }

    render() {
        const {arrayOfNums} = this.state
        const newArray = arrayOfNums.map((itme, i)=>{
            return(
                <div key={i}>
                    <button style={{color:this.state.color, backgroundColor:this.state.backgroundColor}} className="singleCard" onClick={(e)=> this.cardClickHandler(e,i) } > {itme.number} </button>
                </div>
            )
        })
        return (
            <div className="card">
                {newArray} <br/> <h3>turns: {this.turns} time: {this.state.counter} sec</h3> <br/> <button style={{backgroundColor:"grey", color:"blue"}} onClick={() => this.startGame()}>start game</button>  <button style={{backgroundColor:"grey", color:"blue"}} onClick={() => window.location.reload(false)}>new game</button>  <button style={{backgroundColor:"grey", color:"blue"}} onClick={()=> {clearInterval(this.state.time) ;this.stopGame=true}}>stop the game</button> <br/> <h1> {this.state.message} </h1>
            </div>
        )
    }
}
