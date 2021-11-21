import React, { Component } from 'react';
import Select from 'react-select';


class App extends Component {

    constructor() {
        super();
        this.state = {
            pair: '',
            originalRate: '',
            fee: '',
            feeTotal: '',
            rateWithFee: '',
            pairs: [],
            symbols: [],
            coin1: null,
            coin2: null
        };
        this.changeCoin = this.changeCoin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addPair = this.addPair.bind(this);
    }


     componentDidMount() {
        this.fetchSymbols()
        this.fetchPairs()
    }


    fetchSymbols() {
        fetch('/api/symbols')
            .then(res => res.json())
            .then(data => {
                let selectSymbols = []
                
                for(const key in data.symbols){
                    selectSymbols.push({label: key + ' - ' + data.symbols[key], value: key})
                }
                this.setState({symbols: selectSymbols});
            });
    }

    addPair(e) {
        fetch('/api/pairs', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            M.toast({html: 'Pair added'})
            
            this.fetchPairs();
        })
        .catch(err => console.log(err));
        
        e.preventDefault();
    }


    fetchPairs() {
        fetch('/api/pairs')
            .then(res => res.json())
            .then(data => {
                this.setState({pairs: data});
            });
    }


    deletePair(id) {
    console.log("deleting " + id)
        fetch('api/pairs/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            M.toast({html: 'Pair deleted'})
            this.fetchPairs();
        });
    };


    handleChange(e) {
        console.log(e)
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    };


    changeCoin(name, option) {
        console.log(option)
        const { label, value } = option;
        this.setState({[name]: value})
       
    };


    render () {
        return (
             
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <h3 className="container">
                        <a className="brand" href="/">Exchange Rates</a>
                    </h3>
                </nav>
            
            
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addPair}>
                                       
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <Select name="coin1" onChange={(op) => this.changeCoin("coin1", op)} placeholder="From..." options={this.state.symbols} />                                          
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <Select name="coin2" onChange={(op) => this.changeCoin("coin2", op)} placeholder="To..." options={this.state.symbols} />                                          
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="fee" value={this.state.fee} onChange={this.handleChange} type="text" pattern="[0-9]*" placeholder="Fee %"/>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Pair</th>
                                        <th>Free Rate</th>
                                        <th>Fee %</th>
                                        <th>Absolute Fee</th>
                                        <th>Rate with Fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.pairs.map(pair => {
                                            return (
                                                <tr key={pair._id}>
                                                    <td>{pair.pair}</td>
                                                    <td>{pair.originalRate}</td>
                                                    <td>{pair.fee}</td>
                                                    <td>{pair.feeTotal}</td>
                                                    <td>{pair.rateWithFee}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.deletePair(pair._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;