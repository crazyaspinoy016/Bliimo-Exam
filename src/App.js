import React, { Component } from 'react';
import './App.css';
import API from './API';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      search: ''
    }
  }

  componentDidMount(){
    let url = `https://www.googleapis.com/books/v1/volumes?q=harry%20potter`;
    API.get(url).then((res) => {
      this.setState({
        data: res.items,
      });
      console.log("DATA", res);
    })
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

  renderContent = () => {
    let filteredBooks = this.state.data.filter((res) => {
      return res.volumeInfo.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });
    return(
      <div className="App-card">
        {
          filteredBooks.map ((res, id) => {
            return(
              <div key={id} style={{marginBottom: 20, marginRight: 20}}>
                <img style={{width: 150, height: 200}} src={res.volumeInfo.imageLinks.thumbnail} alt="blank" />
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

  onSearch = (text) => {
    this.setState({search: text.target.value.substr(0, 60)});
    console.log('text', this.state.search);
  }

  render() {
    return (
      <div style={{margin: 20}}>
        <input type="text" value={this.state.search} onChange={(text)=>this.onSearch(text)}
          style={{fontSize: 18,  width: '20%', marginBottom: 20}} />
        { this.renderContent() }
      </div>
    );
  }
}

export default App;
