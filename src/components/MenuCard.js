import React, { Children } from "react";
import style from "styled-components";

const Card = style.div`
   width: 200px;
   border: 1px solid black;
   background-color: grey;
   display: flex;
   justify-content: column;

`;

const MenuCard = ({ title }) => {
  return (
    <Card>
      <div>{title}</div>
    </Card>
  );
};

export default MenuCard;
