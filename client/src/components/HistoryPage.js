import React from 'react';
import {Record,History} from '../utils/RecordHistory';
import HistoryList from './HistoryList';
class HistoryPage extends React.Component{
constructor(props){
	super(props)
    this.state={
    	history:[]
    }
}

componentDidMount(){
	this.setState({history:JSON.parse(localStorage.getItem("history"))});
console.log(JSON.parse(localStorage.getItem("history")));
}

onClick(e){
		this.setState({history:JSON.parse(localStorage.getItem("history"))});
console.log(JSON.parse(localStorage.getItem("history")));
}

render(){
	return(
        <div className="container">
		  
           <h1 className="display-4">Last 5 Search History</h1>
		 
		 
		  <table className="table">
		  <thead>
		  <th>
		     S No.
		   </th>		  
		  <th>
		     Search Word
		   </th> 
		   		  <th>
		     Time
		   </th> 
		   </thead>
		   
           <HistoryList items={this.state.history}/>
		   
		   </table>
		  
		  <center>
		  <button type="button" className="btn" onClick={this.onClick.bind(this)}>Refresh</button>
          </center>
         
        </div>
		);
}
}

export default HistoryPage;