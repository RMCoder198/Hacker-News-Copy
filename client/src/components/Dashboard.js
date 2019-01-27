import React, { Component } from "react";
import axios from "axios";
import List from "./List";
import Logout from "./Logout";
import jwt_decode from 'jwt-decode';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      page: 0,
      search:'',
      username:''
    };
  }

  componentDidMount() {
    var flag =0;
    const self = this;
     let url =
      "http://hn.algolia.com/api/v1/search?query=&tags=story&page=" +
      this.state.page;
    const token  = localStorage.getItem('jwtToken');
     axios.defaults.headers.common['Authorization'] = token;
    const decoded = jwt_decode(token);
   
     axios.get('/api/users/current')
     .then(function(response){
     	if(response.data.status == true){

             flag =1;
     		 delete axios.defaults.headers.common['Authorization'];
     		 axios
			      .get(url)
			      .then(function(response) {
			        return response;
			      })
			      .then(function(response) {
			    
			        self.setState({ content: response.data.hits ,username:decoded.name});
			       
			      })
			      .catch(function(error) {
			        console.log(error);
			      });
     	}
     	
     })
     .catch( function(error){
     	console.log(error);
      self.props.history.push('./error');
     }
     	);

   
  }


  onChange(e){
  	
    this.setState({search:e.target.value});
    const self = this;
    let url =
      "http://hn.algolia.com/api/v1/search?query="+e.target.value+"&tags=story";
    axios
      .get(url)
      .then(function(response) {
        return response;
      })
      .then(function(response) {
       
        self.setState({ content: response.data.hits });
      
      })
      .catch(function(error) {
        console.log(error);
      });


  }
  pageChange(e) {
    const self = this;

    var pageNo= this.state.page + parseInt(e.target.value);
    if(pageNo>-1){
    this.setState({ page: pageNo });
  
    let url =
      "http://hn.algolia.com/api/v1/search?query=&tags=story&page=" +
      pageNo;
    axios
      .get(url)
      .then(function(response) {
        return response;
      })
      .then(function(response) {
        self.setState({ content: response.data.hits });
       
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  }

filterShow(e){
    let url= "";
      const self = this;
 if(e.target.value == "date"){
     url =
      "http://hn.algolia.com/api/v1/search_by_date?query=&tags=story&page=0" ;
    }
     if(e.target.value == "popularity"){
     url =
      "http://hn.algolia.com/api/v1/search?query=&tags=story&page=0" ;
    }
      if(e.target.value == "stories"){
     url =
      "http://hn.algolia.com/api/v1/search?query=&tags=story&page=0" ;
    }
      if(e.target.value == "comment"){
     url =
      "http://hn.algolia.com/api/v1/search?query=&tags=comment&page=0" ;
    }



    axios
      .get(url)
      .then(function(response) {
        return response;
      })
      .then(function(response) {
        self.setState({ content: response.data.hits });
      
      })
      .catch(function(error) {
        console.log(error);
      });


}

removeSearch(e){
	 const self =this;
	 let url =
      "http://hn.algolia.com/api/v1/search?query=&tags=story&page=0";
	this.setState({search:''});
	axios
			      .get(url)
			      .then(function(response) {
			        return response;
			      })
			      .then(function(response) {
			        // console.log(response.data.hits)
			        self.setState({ content: response.data.hits });
			      })
			      .catch(function(error) {
			        console.log(error);
			      });

}
  render() {
  	   


    return (

      <div className="container">
		
		<div className="bg-orange padding">
		  <span className=" text-xl text-white">{this.state.username}</span>
		  <span className=" ml-xl box" bg-white >
		       <input type="text" className="input-width input-search" value={this.state.search} onChange={this.onChange.bind(this)}></input><a className="dot" onClick={this.removeSearch.bind(this)}></a>
          
          </span>
          <span>
          <Logout/>
          </span>
		</div>
        <div>
        <span>search <select onChange={this.filterShow.bind(this)}>
                    <option value="stories" >stories</option>
                    <option value="comments" >comments</option>
                 </select></span>
        <span>  by <select onChange={this.filterShow.bind(this)}>
                    <option value="popularity" >popularity</option>
                    <option value="date" >date</option>
                 </select>
        </span>         
        </div>
        <List items={this.state.content} />
        <center>
          <p className="bg-color">
            <button type="button" className="btn" value="-1" onClick={this.pageChange.bind(this)}>
              Pre
            </button>
            <button type="button" className="btn" value="1" onClick={this.pageChange.bind(this)}>
              Next
            </button>
          </p>
        </center>
      </div>
    );
  }
}

export default Dashboard;
