import React, { Component } from 'react';
import Word from './Word';
import Adapter from '../Adapter';
import UUID from 'uuid'

class WordList extends Component {
    state={
        words:[]
    }
    
    componentDidMount(){
        this.getWords();
    }

    getWords=() => {
        const token = localStorage.getItem("token");
        Adapter.getUserWords(this.props.id, token).then(r => r.json())
        .then(data => this.setState({
            words: data["words"]
        }, console.log))
    }

    toDisplay=() => {
        return this.state.words.map(e => 
            <Word word={e.word} def={e.def} key={UUID()}/>
        )
    }

    render() {
        console.log(this.state.words)
        console.log(this.toDisplay());
        
        return (
            <div>
                {this.toDisplay()}
            </div>
        );
    }
}

export default WordList;