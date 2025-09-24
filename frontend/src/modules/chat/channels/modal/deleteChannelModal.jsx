import { Button, Modal } from 'react-bootstrap';
export const DeleteChannelModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      await onSubmit();
    } catch (error) {
      console.error('Ошибка удаления канала:', error);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Уверены?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Отменить</Button>
          <Button variant="primary" onClick={handleSubmit}>Удалить</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
