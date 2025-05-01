import { Container, Box } from '@mui/material';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Container maxWidth="xl">
        <Box mt={4}>{children}</Box>
      </Container>
    </>
  );
};

export default Layout;
