import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <Container
      className="flex flex-col items-center justify-center h-[92vh] text-center"
    >
      <SentimentDissatisfiedIcon
        className='mb-2 text-lg'
      />
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
      >
        Ой! Страница не найдена
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
      >
        Извините, но страница, которую вы ищите, не существует
      </Typography>
      <Box mt={4}>
        <Link to="/" className='no-underline'>
          <Button variant="contained" color="primary">
            На главную
          </Button>
        </Link>
      </Box>
    </Container>
  );
};
