import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  List,
  ListItem,
} from '@chakra-ui/core'
import { Text } from './Text'

type TeamModalProps = {
  isOpen: boolean
  onClose(): void
}

export const TeamModal = ({ isOpen, onClose }: TeamModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.800">
        <Text>
          <ModalHeader>Equipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List styleType="disc">
              <ListItem>Helio Potelicki</ListItem>
              <ListItem>Luis Felipe Zaguini</ListItem>
              <ListItem>Pedro Henrique Roweder</ListItem>
            </List>
          </ModalBody>
          <ModalFooter>
            <Button variantColor="blue" onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </Text>
      </ModalContent>
    </Modal>
  )
}
