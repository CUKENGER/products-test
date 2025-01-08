import { Container, Skeleton } from "@mui/material"

export const EditProductSkeleton = () => {
  return (
    <Container maxWidth="sm" className="pb-10 mt-12">
      <Skeleton variant="text" width="50%" height={40} />
      <form>
        <Skeleton variant="rectangular" width="100%" height={150} className="mb-4" />
        <Skeleton variant="text" width="100%" height={40} className="mb-2" />
        <Skeleton variant="text" width="100%" height={40} className="mb-2" />
        <Skeleton variant="text" width="100%" height={40} className="mb-2" />
        <Skeleton variant="text" width="100%" height={40} className="mb-2" />
        <Skeleton variant="text" width="100%" height={40} className="mb-2" />
        <Skeleton variant="rectangular" width="20%" height={40} className="mt-4" />
      </form>
    </Container>
  )
}