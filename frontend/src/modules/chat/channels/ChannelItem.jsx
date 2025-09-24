import {
  useRemoveChannelMutation,
  useEditChannelMutation,
} from './channelsApi';
import { Dropdown } from 'bootstrap';
import cn from 'classnames';
import { useState } from 'react';
import { DeleteChannelModal } from './modal/deleteChannelModal.jsx';
import { EditChannelModal } from './modal/editChannelModal.jsx';

const ChannelItem = ({ channel, isActive, onSelect, channelsName }) => {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

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

  // const [showModal, setShowModal] = useState(false);

  // const [removeChannel] = useRemoveChannelMutation();
  // const [editChannel] = useEditChannelMutation();

  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  const handleSelect = () => {
    onSelect({ id: channel.id, name: channel.name });
  };

  const handleEdit = async (values) => {
    try {
      await editChannel({
        name: values.chatName,
        id: channel.id,
      }).unwrap();
      handleCloseModalEdit()
    } catch (error) {
      console.error('Ошибка при переименовании канала:', error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeChannel(channel.id).unwrap();
    } catch (error) {
      console.error('Ошибка при удалении канала:', error);
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
              <button className="dropdown-item" href="#" onClick={handleOpenModalEdit}>
                Переименовать
              </button>

              <button
                className="dropdown-item"
                href="#"
                onClick={handleOpenModalDelete}
              >
                Удалить
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
        channelsName={channelsName}
        />
        
    </li>
  );
};

export default ChannelItem;
