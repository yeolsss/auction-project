import React from "react";
import { styled } from "styled-components";
import unLikedImage from "../../../images/heart.svg";
import likedImage from "../../../images/heart2.svg";

interface LikeButtonProps {
  isLiked: boolean;
  onLike: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onLike }) => {
  return (
    <StLikeBtn onClick={onLike}>
      <img src={isLiked ? likedImage : unLikedImage} alt="like-icon" />
    </StLikeBtn>
  );
};

export default LikeButton;

const StLikeBtn = styled.button`
  border: none;

  background-color: transparent;
  position: absolute;
  bottom: 5px;
  right: 0;
  img {
    width: 30px !important;
  }
`;
