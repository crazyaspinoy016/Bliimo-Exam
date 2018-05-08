import React, { Component } from 'react';
import './App.css';
import API from './API';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentWillMount(){
    this.search();
  }

  search = (query = "harry potter") => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    API.get(url).then((res) => {
      this.setState({data: res.items});
      console.log(res);
    })
  }

  updateSearch = () => {
    this.search(this.refs.query.value);
  }

  onCheckSale = (data) => {
    if(data.saleInfo.retailPrice !== undefined){
      return(
        <p className="App-mutedText" style={{width: 200}}>
          {data.saleInfo.retailPrice.currencyCode + ` ` + data.saleInfo.retailPrice.amount}
        </p>
      )
    } else {
      return(
        <p className="App-mutedText" style={{width: 200}}>
          {data.saleInfo.saleability}
        </p>
      )
    }
  }

  onCheckImage = (data) => {
    if(data.volumeInfo.imageLinks !== undefined){
      return(
        <img style={{width: 150, height: 200}} src={data.volumeInfo.imageLinks.thumbnail} alt="blank" />
      )
    } else {
      return null
    }
  }

  renderContent = () => {
    if(this.state.data){
      return(
        <div className="App-card">
          {
            this.state.data.map ((res, id) => {
              return(
                <div key={id} style={{marginBottom: 20, marginRight: 20}}>
                  {this.onCheckImage(res)}
                  <p className="App-title" style={{width: 200}}>{res.volumeInfo.title}</p>
                  <p className="App-mutedText" style={{width: 200}}>{res.volumeInfo.authors}</p>
                  {this.onCheckSale(res)}
                </div>
              )
           })
          }
        </div>
      );
    }
  }

  render() {
    return (
      <div style={{margin: 20}}>
        <input type="text" ref="query" onChange={() => this.updateSearch()}
          style={{fontSize: 18,  width: '20%', marginBottom: 20}} />
        { this.renderContent() }
      </div>
    );
  }
}

export default App;
