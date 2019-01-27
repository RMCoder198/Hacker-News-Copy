import React from 'react';


class Logout extends React.Component{
	constructor(props){
		super(props);
   this.onClick= this.onClick.bind(this);
	}

onClick(e){

	  localStorage.removeItem('jwtToken');
}

   render(){

    return(
         <span>

         <a href="/login" type="button" onClick={this.onClick} className="btn ml-lg">Log Out</a>
         </span>
    	);

   }

}

export default Logout;