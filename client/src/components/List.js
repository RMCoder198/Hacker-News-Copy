import React from "react";
import TimeDifference from "../utils/TimeDifference";
 import Highlight from 'react-highlighter';

const List = props => (
  <div className="bg-color">
   
    {props.items.map((item, index) => (

      <a key={index} href={item.url}>
        <p><Highlight search={props.word}>
        {item.title}
         </Highlight>
         </p>
        <p className="text-xm">
          {item.points} points | {item.author} | {TimeDifference(item.created_at)}| {item.num_comments} comments | ({item.url})
        </p>
        <hr />
      </a>
    ))}
  </div>
);

export default List;
