import React from 'react';


class ErrorPage extends React.Component{
	


   render(){

    return(
          <div className="container">
            <div className="jumbotron">
              <h1> Error has Occured</h1>
              <a href="/login">Try again by loggin in</a>
            </div>
          </div>
    	);

   }

}

export default ErrorPage;
