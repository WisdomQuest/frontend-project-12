import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

/**
 *
 * @param {{ isOpen: boolean, onClose: () => void, onSubmit: () => void }} param0
 * @returns
 */

export const DeleteChannelModal = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      await onSubmit();
    } catch (error) {
      console.error(t('auth.errors.connectionError'), error);
    }
  };

  return (
    <div
      className="modal show "
      style={{ display: 'block', position: 'initial' }}
    >
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
          <Button variant="primary" onClick={handleSubmit}>
            {t('channels.modal.delete')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
