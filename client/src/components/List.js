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
         <Highlight search={props.word}>
        {item.story_title}
         </Highlight>
         </p>
        <p className="text-xm">
          {item.points} points | {item.author} | {TimeDifference(item.created_at)}| {item.num_comments} comments | (<Highlight search={props.word}>{item.url}</Highlight>)
        </p>
        <p>
        <Highlight search={props.word}>
        {item.comment_text}
        </Highlight>
        </p>
        <hr />
      </a>
    ))}
  </div>
);

export default List;
