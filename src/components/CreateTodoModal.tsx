import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  VStack,
  Input,
  Textarea,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

type CreateTodoModalProps = {
  onClose: () => void;
  onAdd: (newTodo: { title: string; description: string }) => Promise<void>;
};

export const CreateTodoModal = ({ onClose, onAdd }: CreateTodoModalProps) => {
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('component haytvec');

    return () => {
      console.log('component jnjvec');
    };
  }, []);


  useEffect(() => {
    console.log('newTodo update exav');
  }, [newTodo]);

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Input
              placeholder="Title"
              variant=""
              defaultValue={newTodo.title}
              onBlur={e => setNewTodo({ ...newTodo, title: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              defaultValue={newTodo.description}
              onBlur={e => setNewTodo({ ...newTodo, description: e.target.value })}
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={async () => {
              setIsLoading(true);
              await onAdd(newTodo);
              setIsLoading(false);
            }}
            isLoading={isLoading}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
