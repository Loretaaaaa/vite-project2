import { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Switch,
  VStack,
  Grid,
  GridItem,
  Spinner,
  Center,
} from '@chakra-ui/react';

import { Todo, createTodo, deleteTodo, getTodos } from '../api/todos';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoModal } from '../components/CreateTodoModal';
import { SingleTodo } from '../components/SingleTodo';
import { DeleteButton } from '../components/DeleteButton';
import useQuery from '../hooks/useQuery';

export const Todos = () => {
  const { data: todos, isLoading, refetch: refetchTodos } = useQuery<Todo[]>(getTodos);

  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(
    localStorage.getItem('selectedTodo')
      ? JSON.parse(localStorage.getItem('selectedTodo') as string)
      : null
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    await refetchTodos();

    // If the deleted todo was selected, clear the selection
    if (selectedTodoId === id) {
      setSelectedTodoId(null);
    }
  };

  const onAdd = async (newTodo: { title: string; description: string }) => {
    // step 1. create new todo and add it to the list
    if (!newTodo.title.trim() || !newTodo.description.trim()) {
      return;
    }

    const addedTodo = await createTodo({
      ...newTodo,
      id: uuidv4(),
      completed: false,
      status: 'notStarted',
      createdAt: Date.now(),
    });
    onSelectTodo(addedTodo.id);
    console.log('Added todo:', addedTodo);
    await refetchTodos();
    closeModal();

    //   setTodos((prevTodos) => {
    //     console.log('Previus todos:', prevTodos);
    //     return [...prevTodos, addedTodo];
    //   })
    //   // step 2. close modal
    //   closeModal();

    //   const updatedTodos = await getTodos();
    //   setTodos(updatedTodos);
  };

  const onSelectTodo = async (todoId: string) => {
    setSelectedTodoId(todoId);
    localStorage.setItem('selectedTodo', JSON.stringify(todoId));
  };

  if (isLoading) {
    return (
      <Center width="100vw" height="100vh">
        <Spinner />
      </Center>
    );
  }

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4} p={4}>
      <GridItem colSpan={1}>
        <VStack align="stretch" spacing={4} maxH="70vh" overflowY="auto">
          <Button onClick={openModal} colorScheme="blue">
            Add new
          </Button>

          {modalIsOpen && <CreateTodoModal onClose={closeModal} onAdd={onAdd} />}

          <TableContainer>
            <Table width="full" maxHeight={'70vh'} variant="stripped">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th>Completed</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {todos?.map(todo => (
                  <Tr
                    key={todo.id}
                    bg={selectedTodoId === todo.id ? 'blue.100' : ''}
                    _hover={{ bg: 'blue.50' }}
                    cursor="pointer"
                    onClick={() => onSelectTodo(todo.id)}
                  >
                    <Td>{todo.title}</Td>
                    <Td>{todo.description}</Td>
                    <Td>
                      <Switch
                        defaultChecked={todo.completed}
                        size={'lg'}
                        colorScheme={todo.completed ? 'blue' : 'gray'}
                      />
                    </Td>
                    <Td>
                      <DeleteButton onClick={() => onDeleteTodo(todo.id)} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </GridItem>
      <GridItem colSpan={2}>
        {selectedTodoId && (
          <SingleTodo onUpdateTodoFinished={refetchTodos} id={selectedTodoId} />
        )}
      </GridItem>
    </Grid>
  );
};
