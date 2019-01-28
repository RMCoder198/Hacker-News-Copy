import React from "react";

const HistoryList = props => (
  
 <tbody>    
    {props.items.map((item, index) => (
<tr className="bg-color" key={index}>
      <td  >{index+1}</td>
      <td>{item.word} </td>
      <td> {item.time}</td>
        
  </tr>    
    
    ))}
    </tbody>
  
);

export default HistoryList;
