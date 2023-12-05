import { VStack, Select, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { updateTodo, getTodo } from '../api/todos';

export const Todo = ({ id }: { id: string }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>();

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedTodo) {
      const newStatus: string = e.target.value;
      console.log({ newStatus });

      // Update the todo's status
      await updateTodo({
        ...selectedTodo,
        status: newStatus,
      });

      // console.log(await getTodos());
      // setTodos(await getTodos());
    }
  };

  useEffect(() => {
    getTodo(id).then(todo => {
      setSelectedTodo(todo);
    });
  }, [id]);

  return (
    <VStack>
      {selectedTodo && (
        <>
          <Text fontSize="xl" fontWeight="bold">
            {selectedTodo.title}
          </Text>
          <Text>{selectedTodo.description}</Text>
          <Select
            value={selectedTodo.status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleStatusChange(e)}
          >
            {[
              { value: 'notStarted', label: 'Not Started' },
              { value: 'inProgress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
              { value: 'cancelled', label: 'Cancelled' },
              { value: 'blocked', label: 'Blocked' },
            ].map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </Select>
        </>
      )}
    </VStack>
  );
};
