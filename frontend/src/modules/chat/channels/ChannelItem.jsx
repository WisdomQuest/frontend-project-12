import {
  useRemoveChannelMutation,
  useEditChannelMutation,
} from './channelsApi';
import { Dropdown } from 'bootstrap';
import cn from 'classnames';
import { useState } from 'react';
import { DeleteChanellModal } from './modal/deleteChannelModal.jsx';

const ChannelItem = ({ channel, isActive, onSelect }) => {

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const [removeChannel] = useRemoveChannelMutation();
  const [editChannel] = useEditChannelMutation();

  const handleSelect = () => {
    onSelect({ id: channel.id, name: channel.name });
  };

  const handleOpenModalDelete = () => {
    setIsShowDeleteModal(true);
  };

  const handleCloseModalDelete = () => {
    setIsShowDeleteModal(false);
  };

  const handleEdit = async (values) => {
    try {
      await editChannel({
        name: values.chatName,
        removable: true,
      }).unwrap();
    } catch (error) {
      console.error('Ошибка при переименовании канала:', error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeChannel(channel.id)
        .unwrap()
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
              <button className="dropdown-item" href="#" onClick={handleEdit}>
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
      <DeleteChanellModal
        isOpen={isShowDeleteModal}
        onClose={handleCloseModalDelete}
        onSubmit={handleRemove}
      />
    </li>
  );
};

export default ChannelItem;
