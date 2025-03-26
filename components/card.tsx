"use client";
import React from "react";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Card = ({ product }) => {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.includes(product.productid)) {
      cart.push(product.productid);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const truncateTitle = (name: string) => {
    return name.length > 20 ? name.substring(0, 18) + " ..." : name;
  };

  const truncateDescription = (description: string) => {
    return description.length > 50
      ? description.substring(0, 29) + " ..."
      : description;
  };

  return (
    <StyledWrapper>
      <div className="card rounded-lg">
        <div className="card-img">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="card-info">
          <p className="text-title">{truncateTitle(product.name)}</p>
          <p className="text-body">{truncateDescription(product.description)}</p>
        </div>
        <div className="card-footer">
          <span className="text-title">${product.price}</span>
          <div className="card-button" onClick={addToCart}>
            <Dialog>
              <DialogTrigger asChild>
                <svg className="svg-icon" viewBox="0 0 20 20">
                  <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z" />
                  <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z" />
                  <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z" />
                </svg>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Successfully added to your cart</DialogTitle>
                  <DialogDescription>
                    {product.title} has been added to your cart.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
<<<<<<< HEAD
                  <Button type="submit">Continue Shopping</Button>
                  <Button><a href="order">Go to my Order</a></Button>
=======
                  <Button type="button">Continue Shopping</Button>
                  <Button type="button">Go to my Order</Button>
>>>>>>> 71ac07582edeedbe5778ce34738fc7cf55d2f66d
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    background: white;
    width: 190px;
    height: 254px;
    padding: 0.8em;
    position: relative;
    overflow: visible;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .card-img {
    background-color: #6699ff;
    height: 40%;
    width: 100%;
    border-radius: 0.5rem;
    transition: 0.3s ease;
  }

  .card-info {
    padding-top: 10%;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  .card-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid #ddd;
  }

  /*Text*/
  .text-title {
    font-weight: 900;
    font-size: 1em;
    line-height: 1.5;
  }

  .text-body {
    font-size: 0.7em;
    padding-bottom: 10px;
  }

  /*Button*/
  .card-button {
    border: 1px solid #252525;
    display: flex;
    padding: 0.3em;
    cursor: pointer;
    border-radius: 50px;
    transition: 0.3s ease-in-out;
  }

  /*Hover*/
  .card-img:hover {
    transform: translateY(-25%);
    box-shadow: rgba(226, 196, 63, 0.25) 0px 13px 47px -5px,
      rgba(180, 71, 71, 0.3) 0px 8px 16px -8px;
  }

  .card-button:hover {
    border: 1px solid #6699ff;
    background-color: #6699ff;
  }
`;

export default Card;
