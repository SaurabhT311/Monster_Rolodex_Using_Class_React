import { useState } from 'react';
import { Component } from 'react';
import './App.css';
import SearchBox from './components/search-box/search-box';
import CardList from './components/card-list/card-list';


class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField:''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json()) // whatever we get from response.json will get pass in the users
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users }
          }
        ));
  }


onSearchChange = (event)=> {
  //searchField is the original list array
  const searchField= event.target.value.toLocaleLowerCase() // to make everything into lowercase
  // console.log("searchField",searchField);
  this.setState(
    () => {
    return {searchField}
  })
}



  render() {
    console.log("render")

    const { monsters, searchField } = this.state;
    //filtering from original array which is searchField and will always return 
    // the new array
    const filteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField) // includes return boolean value[true or false]
    });

    return (
      <div className="App">
        <h1 className='app-title'>Monster Rolodex</h1>
        <SearchBox onChangeHandler = {this.onSearchChange}
         placeholder='search monsters'
         className='search-box'
         />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}



export default App;
