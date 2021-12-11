import React, { Component } from 'react'
import "./MemoryGame.css"

export default class MemoryGame extends Component {

    state = {counter:0 ,time: null, message:"", arrayOfNums: [] ,first:null, color: "blue",backgroundColor: "blue"}
    firstTargetDiv

    turns= 0
    stopGame=false

    rightChoice = null

    arrayLength = 6

    componentDidMount(){
        this.bord();
        this.setState({time:setInterval(() => {
            this.setState({counter: this.state.counter+1})
        }, 1000)});
    }
    componentDidUpdate(){
        console.log("was rendered");
    }

    bord = () =>{
        let temp = [...this.state.arrayOfNums];
        for (let i = 0; i < this.arrayLength/2; i++) {
            temp.push({number: i, clicked:false});
        }
        temp = [...temp,...temp]
        temp.sort(()=>Math.random() -0.5)
        this.setState({arrayOfNums: temp})
    }

    clickHandler =(e,i)=>{
        if (this.stopGame) {
            return
        }
        console.log(i);
        const temp = [...this.state.arrayOfNums];
        // this.setState({first:temp[i].number});
        if (this.state.first == null) {
            this.setState({first:temp[i].number});
            e.target.style.backgroundColor="gray";
            this.firstTargetDiv= e.target
        }
        else{
            e.target.style.backgroundColor="gray";
            setTimeout(()=>{
                if (this.state.first == temp[i].number) {
                console.log("same");
                this.turns = this.turns +1
                this.rightChoice = this.rightChoice +1
                if(this.rightChoice===this.state.arrayOfNums.length/2){
                    this.setState({message:"Game Over"})
                    clearInterval(this.state.time);
                }
            }else{
                console.log("try again!1");
                e.target.style.backgroundColor=this.state.backgroundColor;
                this.firstTargetDiv.style.backgroundColor=this.state.backgroundColor;
                this.turns = this.turns +1
            }
            this.setState({first:null});
           }, 800)
        }
    }

    render() {
        const {arrayOfNums} = this.state
        const newArray = arrayOfNums.map((itme, i)=>{
            return(
                <div key={i}>
                    <button style={{color:this.state.color, backgroundColor:this.state.backgroundColor}} className="singleCard" onClick={(e)=> this.clickHandler(e,i) } > {itme.number} </button>
                </div>
            )
        })
        return (
            <div className="card">
                {newArray} <br></br> <h3>turns: {this.turns} time: {this.state.counter} sec</h3> <br/> <button style={{backgroundColor:"grey", color:"blue"}} onClick={() => window.location.reload(false)}>start new game</button> <br/> <button style={{backgroundColor:"grey", color:"blue"}} onClick={()=> {clearInterval(this.state.time) ;this.stopGame=true}}> stop the game </button> <br/> <h2> {this.state.message}  </h2>
            </div>
        )
    }
}
