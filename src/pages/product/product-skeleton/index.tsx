import { Card, CardContent, Skeleton } from '@mui/material'

export const ProductSkeleton = () => {
  return (
    <Card
      className="flex flex-col w-full max-w-4xl p-4 mx-auto mt-4 md:flex-row"
      data-testid="product-page-loader"
    >
      <Skeleton
        variant="rectangular"
        className="object-cover w-540 md:w-1/2 md:h-96"
        height={390}
      />
      <CardContent className="flex flex-col w-full gap-3 md:ml-4">
        <Skeleton variant="text" width={250} height={40} />
        <Skeleton variant="text" width="100%" height={30} />
        <Skeleton variant="text" width="100%" height={24} />
        <Skeleton variant="text" width="100%" height={24} />
        <Skeleton variant="text" width="100%" height={24} />
        <Skeleton variant="text" width="100%" height={24} />
        <Skeleton
          variant="text"
          width="100%"
          height={30}
          className="mt-2 w-min"
        />
        <Skeleton
          variant="text"
          width="100%"
          height={30}
          className="mt-2 w-min"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={40}
          className="mt-4"
        />
      </CardContent>
    </Card>
  )
}
