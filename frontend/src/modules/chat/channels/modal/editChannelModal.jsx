import Modal from 'react-bootstrap/Modal'
import { ChannelForm } from '../../../../components/form/channelForm.jsx'

export const EditChannelModal = ({
  isOpen,
  onClose,
  onSubmit,
  channelName,
  channelsNames,
  textHeaderModal,
  t,
  textErorr,
}) => {
  if (!isOpen) return null

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{textHeaderModal}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ChannelForm
          initialName={channelName ?? ''}
          onSubmit={onSubmit}
          channelsNames={channelsNames}
          t={t}
          textError={textErorr}
          onClose={onClose}
        />
      </Modal.Body>
    </Modal>
  )
}
