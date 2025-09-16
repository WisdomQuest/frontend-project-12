import { useGetChannelsQuery, useAddChannelMutation } from './channelsApi';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel} from './channelsSlice';
import ChannelItem from './ChannelItem';
import AddChanellModal from './modal/addChanellModal';
import { useState } from 'react';

export const ChannelList = () => {
  const dispatch = useDispatch();

  const { data: channels = [], isLoading, error } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { currentChannelId } = useSelector((state) => state.channels);

  const handleChannelSelect = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddChannel = async (values) => {
    try {
      await addChannel({
        name: values.chatName,
        removable: true,
      }).unwrap();
    } catch (error) {
      console.error('Ошибка при создании чата:', error);
      throw error;
    }
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Произошла ошибка</div>;

  return (
    <div className=" bg-info-subtle h-100 border border-primary col">
      <div className="d-flex justify-content-between align-items-center mt-2">
        <b>Каналы</b>
        <button
          onClick={handleOpenModal}
          className="btn text-primary p-0 btn-group-vertical"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-square"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
          </svg>
        </button>
      </div>
      <ul className="p-0 channels-list">
        {channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            channel={channel}
            isActive={currentChannelId === channel.id}
            onSelect={handleChannelSelect}
          />
        ))}
      </ul>

      <AddChanellModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddChannel}
      />
    </div>
  );
};
