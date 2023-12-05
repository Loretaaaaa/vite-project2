import { Todos } from './pages/Todos';

import { ChakraProvider, Center } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Center height={'100vh'} width="100vw">
        <Todos />
      </Center>
    </ChakraProvider>
  );
}

export default App;
