import {
  useRemoveChannelMutation,
  useEditChannelMutation,
} from './channelsApi';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { DeleteChannelModal } from './modal/deleteChannelModal.jsx';
import { EditChannelModal } from './modal/editChannelModal.jsx';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import filter from 'leo-profanity';
import { notifySuccess, notifyError } from './notify/notify.js';
import { setCurrentChannel } from './channelsSlice';

const ChannelItem = ({ channel, isActive, onSelect, channelsNames }) => {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [removeChannel] = useRemoveChannelMutation();
  const [editChannel] = useEditChannelMutation();

  const handleOpenModalDelete = () => {
    setIsShowDeleteModal(true);
  };

  const handleCloseModalDelete = () => {
    setIsShowDeleteModal(false);
  };

  const handleOpenModalEdit = () => {
    setIsShowEditModal(true);
  };

  const handleCloseModalEdit = () => {
    setIsShowEditModal(false);
  };

  const handleSelect = () => {
    onSelect({ id: channel.id, name: channel.name });
  };

  const handleEdit = async (values) => {
    try {
      const cleanedChatName = filter.clean(values.chatName.trim());
      await editChannel({
        name: cleanedChatName,
        id: channel.id,
      }).unwrap();

      if (isActive) {
        dispatch(setCurrentChannel({ id: channel.id, name: cleanedChatName }));
      }

      notifySuccess(t('channels.toast.rename'));
      handleCloseModalEdit();
    } catch (error) {
      console.error(error);
      notifyError(t('channels.errors.connectionError'));
    }
  };

  const handleRemove = async () => {
    try {
      await removeChannel(channel.id).unwrap();
      notifySuccess(t('channels.toast.delete'));
    } catch (error) {
      console.error(error);
      handleCloseModalDelete();
      notifyError(t('channels.errors.connectionError'));
    }
  };

  return (
    <ListGroup.Item className="p-0 border-0">
      <Dropdown as={ButtonGroup} className="w-100">
        <Button
          variant={isActive ? 'secondary' : 'light'}
          className="w-100 text-start rounded-0 text-truncate"
          onClick={handleSelect}
        >
          <span className="me-1"># </span>
          {channel.name}
        </Button>

        {channel.removable && (
          <>
            <Dropdown.Toggle
              split
              variant={isActive ? 'secondary' : 'outline-light'}
              id={`dropdown-channel-${channel.id}`}
              className="rounded-0"
            />

            <Dropdown.Menu>
              <Dropdown.Item as="button" onClick={handleOpenModalDelete}>
                {t('channels.actions.delete')}
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleOpenModalEdit}>
                {t('channels.actions.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>

      <DeleteChannelModal
        isOpen={isShowDeleteModal}
        onClose={handleCloseModalDelete}
        onSubmit={handleRemove}
      />

      <EditChannelModal
        isOpen={isShowEditModal}
        onClose={handleCloseModalEdit}
        onSubmit={handleEdit}
        channelName={channel.name}
        channelsNames={channelsNames}
        textHeaderModal={t('channels.modal.renameTitle')}
      />
    </ListGroup.Item>
  );
};

export default ChannelItem;
