import { Button, Modal } from 'react-bootstrap'
import { notifyError } from '../../../../common/utils/notify.js'

export const DeleteChannelModal = ({ isOpen, onClose, onSubmit, t }) => {
  if (!isOpen) return null

  const handleSubmit = async () => {
    try {
      await onSubmit()
    }
    catch (error) {
      console.error(t('auth.errors.connectionError'), error)
      notifyError(t('channels.errors.unsuccessfulDelete'))
    }
  }

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.modal.deleteTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{t('channels.deleteConfirm')}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t('channels.modal.cancel')}
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          {t('channels.modal.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
