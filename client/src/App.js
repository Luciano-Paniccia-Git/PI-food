import './App.css';
import React from 'react';
import { Route } from 'react-router-dom'

//COMPONENTES
import Landing from './components/Landing/Landing'
//import Home from './components/Home/Home'
//import { RecipeCreate } from './components/RecipeCreate/RecipeCreate'
import { RecipeDetail } from './components/RecipeDetail/RecipeDetail'


function App() {
  return (
    <div className="App">
      <React.Fragment>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/home/:id' component={RecipeDetail}/>
      </React.Fragment>
    </div>
  );
}

export default App;
