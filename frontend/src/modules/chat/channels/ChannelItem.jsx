import {
  useRemoveChannelMutation,
  useEditChannelMutation,
} from './channelsApi';
import { Dropdown } from 'bootstrap';
import cn from 'classnames';
import { useState, useEffect } from 'react';
import { DeleteChannelModal } from './modal/deleteChannelModal.jsx';
import { EditChannelModal } from './modal/editChannelModal.jsx';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import { notifySuccess, notifyError } from './notify/notify.js';

const ChannelItem = ({ channel, isActive, onSelect, channelsNames }) => {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const { t } = useTranslation();

  const [removeChannel] = useRemoveChannelMutation();
  const [editChannel] = useEditChannelMutation();

  useEffect(() => {
    filter.loadDictionary('ru');
  }, []);

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
    <li className="nav-item">
      <div className="btn-group w-100 d-flex">
        <button
          type="button"
          className={cn('btn', 'w-100', 'text-start', 'rounded-0', {
            'btn-secondary': isActive,
            'text-truncate': !isActive,
          })}
          onClick={handleSelect}
        >
          <span className="me-1"># </span>
          {channel.name}
        </button>
        {channel.removable && (
          <div className=" btn-group">
            <button
              type="button"
              className={cn('btn  dropdown-toggle dropdown-toggle-split', {
                'btn-secondary': isActive,
              })}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                href="#"
                onClick={handleOpenModalDelete}
              >
                {t('channels.actions.delete')}
              </button>
              <button
                className="dropdown-item"
                href="#"
                onClick={handleOpenModalEdit}
              >
                {t('channels.actions.rename')}
              </button>
            </div>
          </div>
        )}
      </div>

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
    </li>
  );
};

export default ChannelItem;
