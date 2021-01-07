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
