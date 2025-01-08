import {
  Card,
  CardHeader,
  CardActions,
  IconButton,
  Skeleton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProductItemSkeleton = () => {
  return (
    <Card className="flex flex-col h-full max-w-[345px]">
      <Card className="flex flex-col h-full gap-1 cursor-pointer hover:bg-gray-50">
        <CardHeader
          title={<Skeleton variant="text" width="60%" />}
          className="flex items-center h-24"
          sx={{
            '& .MuiCardHeader-title': {
              fontSize: '20px',
            },
          }}
        />
        <Skeleton variant="rectangular" width="100%" height={256} />
        <Skeleton variant="rectangular" width="100%" height={110} />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" disabled>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="delete" disabled>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Card>
  );
};
