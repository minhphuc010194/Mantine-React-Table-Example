import { Box, Heading } from "@chakra-ui/react";
import VirtualizeTable from "./Virtualized";
import { Container } from "@mantine/core";
import { PaginationTable } from "./Pagination";

function App() {
   return (
      <Box
         __css={{ placeItems: "center" }}
         display="flex"
         minW="320px"
         minHeight="100vh"
      >
         <Container>
            <Heading>Pagination</Heading>
            <PaginationTable />

            <Heading>Virtulazation</Heading>
            <VirtualizeTable />
         </Container>
      </Box>
   );
}

export default App;
