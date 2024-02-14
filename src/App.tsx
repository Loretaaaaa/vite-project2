import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Center } from '@chakra-ui/react';
import { Todos } from './pages/Todos';
import { SingleTodo } from './pages/SingleTodo';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Center height={'100vh'} width="100vw">
          <Routes>
            <Route path="/" element={<Todos />} />
            <Route path="/todo/:id" element={<SingleTodo />} />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </Center>
      </Router>
    </ChakraProvider>
  );
}

export default App;
