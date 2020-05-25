import React from "react";
export const Loading: React.FC = () => {
  return <div>
    <span> Loading</span>
  </div>;
};
export const Error: React.FC<{
  message: string;
}> = (props) => {
  return <div>
    <span>Error</span>
    <span>{props.message}</span>
  </div>;
};
