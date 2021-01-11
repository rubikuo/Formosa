import React from "react";
import style from "styled-components";

const Card = style.div`

   width: 300px;
   height: 300px;
   border-radius: 50%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   background-color: white;
   margin: 10px;
   box-shadow: 1px 2px 6px 5px rgba(85, 85, 85, 0.2);
   :hover{
     background-color: rgb(20, 32, 107);
     color: white;
   }

   img{
     width: 100%;
     height: 200px;
     margin-bottom: 5px;
     object-fit: contain;
   }

`;

const MenuCard = ({ title, imageUrl }) => {
  return (
    <Card>
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
    </Card>
  );
};

export default MenuCard;
