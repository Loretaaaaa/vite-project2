import { DeleteIcon } from "@chakra-ui/icons";
import { Text, IconButton, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { useState } from "react";

type DeleteButtonProps = {
  onClick: () => Promise<void>;
};

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <IconButton
        onClick={openModal}
        colorScheme="red"
        aria-label="del"
        icon={<DeleteIcon />}
      />
      {showModal && (
        <Modal isCentered isOpen={true} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to delete this todo?</Text>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={closeModal}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                colorScheme="red"
                onClick={async () => {
                  setIsLoading(true);
                  onClick().then(() => {
                    setIsLoading(false);
                    closeModal();
                  });
                  // await onClick();
                  // setIsLoading(false)
                  // closeModal();
                }}
              >
                DELETE
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* {showModal && (
        <DeleteModal
          onClose={closeModal}
          onSubmit={async () => {
            await onClick();
            closeModal();
          }}
        />
      )} */}
    </>
  );
};