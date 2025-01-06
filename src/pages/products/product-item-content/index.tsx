import Typography from "@mui/material/Typography";
import React from "react";
import Button from "@mui/material/Button";
import { CardContent } from "@mui/material";

interface ProductContentProps {
  description: string;
  expanded: boolean;
  descriptionRef: React.RefObject<HTMLDivElement>;
  showMoreButton: boolean;
  handleExpandClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProductContent: React.FC<ProductContentProps> = ({
  description,
  expanded,
  descriptionRef,
  showMoreButton,
  handleExpandClick,
}) => {
  return (
    <CardContent 
      className="flex flex-col justify-between flex-grow" 
      sx={{
        paddingBottom: 0
      }}
    >
      <Typography
        variant="body2"
        className={`text-ellipsis overflow-hidden text-gray-600 ${expanded ? '' : 'line-clamp-3'}`}
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
        }}
        ref={descriptionRef}
      >
        {description}
      </Typography>
      {showMoreButton && (
        <Button
          sx={{
            marginLeft: 'auto',
            fontSize: "12px"
          }}
          className="transition-transform duration-150"
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? "Скрыть" : "Показать больше"}
        </Button>
      )}
    </CardContent>
  );
};

export default ProductContent;
