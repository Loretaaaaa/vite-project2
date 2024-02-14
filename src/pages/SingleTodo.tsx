import { VStack, Select, Text, Button } from '@chakra-ui/react';
import useQuery from '../hooks/useQuery';
import { getTodo as getTodoApi, updateTodo } from '../api/todos';
import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

// export const SingleTodo = ({ id, onUpdateTodoFinished }: SingleTodoProps) => {
//   const [selectedTodo, setSelectedTodo] = useState<Todo | null>();
//   const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
//     if (selectedTodo) {
//       const newStatus: string = e.target.value;

//       // Update the todo's status
//       const todo = await updateTodo({
//         ...selectedTodo,
//         status: newStatus,
//       });
//       setSelectedTodo(todo);

//       if (onUpdateTodoFinished) {
//         onUpdateTodoFinished();
//       }
//     }
//   };
//   useEffect(() => {
//     getTodo(id).then(todo => {
//       setSelectedTodo(todo);
//     });
//   }, [id]);

// type SingleTodoProps = {
//   id: string;
//   onUpdateTodoFinished: () => void;
// };

// export const SingleTodo = ({ id, onUpdateTodoFinished }: SingleTodoProps) => {
export const SingleTodo = () => {
  const { id } = useParams<{ id: string }>();
  // memoize the getTodo function because we don't want to recreate it on every render
  // we only want to recreate it when the id changes (which is why we pass in id as a dependency)
  const getTodo = useCallback(() => getTodoApi(id), [id]);
  const { data: selectedTodo, refetch: refetchTodo, error } = useQuery(getTodo);

  const handleStatusChange = async (newStatus: string) => {
    if (selectedTodo) {
      try {
        await updateTodo({
          ...selectedTodo,
          status: newStatus,
        });

        await refetchTodo();
        // get all todos again
        // if (onUpdateTodoFinished) {
        //   onUpdateTodoFinished();
        // }
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };

  return (
    <VStack>
      <Link to={'/'}>
        <Button>Go Back</Button>
      </Link>

      {error && <div> Todo Not Found</div>}

      {selectedTodo && (
        <>
          <Text fontSize="xl" fontWeight="bold">
            {selectedTodo.title}
          </Text>
          <Text>{selectedTodo.description}</Text>
          <Select
            value={selectedTodo.status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleStatusChange(e.target.value)
            }
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
