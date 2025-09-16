import {
  useRemoveChannelMutation,
  useEditChannelMutation,
} from './channelsApi';

import { Dropdown } from 'bootstrap';

const ChannelItem = ({ channel, isActive, onSelect }) => {
  const [removeChannel] = useRemoveChannelMutation();
  const [editChannel] = useEditChannelMutation();

  const handleSelect = () => {
    onSelect(channel.id);
  };

  const handleEdit = async (values) => {
    try {
      await editChannel({
        name: values.chatName,
        removable: true,
      }).unwrap();
    } catch (error) {
      console.error('Ошибка при переименовании канала:', error);
      throw error;
    }
  };

  const handleRemove = async (e) => {
    try {
      await removeChannel(channel.id).unwrap();
    } catch (error) {
      console.error('Failed to remove channel:', error);
    }
  };

  return (
    <li className={`channel-item ${isActive ? 'active' : ''}`}>
      <div className="btn-group w-100 d-flex">
        <button
          type="button"
          className="btn btn-secondary w-100 text-start overflow-hidden"
          onClick={handleSelect}
        >
          <span className="me-1"># </span>
          {channel.name}
        </button>
        {channel.removable && (
          <div className=" btn-group">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <div className="dropdown-menu">
              <button className="dropdown-item" href="#" onClick={handleEdit}>
                Переименовать
              </button>

              <button className="dropdown-item" href="#" onClick={handleRemove}>
                Удалить
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default ChannelItem;
