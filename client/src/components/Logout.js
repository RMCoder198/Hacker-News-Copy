import React from 'react';


class Logout extends React.Component{
	constructor(props){
		super(props);
   this.onClick= this.onClick.bind(this);
	}

onClick(e){

	  localStorage.removeItem('jwtToken');
      localStorage.removeItem('history');

}

   render(){

    return(
         <span>

         <a href="/login" type="button" onClick={this.onClick} className="btn pull-right">Log Out</a>
         </span>
    	);

   }

}

export default Logout;