import { useGetChannelsQuery, useAddChannelMutation } from './channelsApi';
import { useSelector, useDispatch } from 'react-redux';
import ChannelItem from './ChannelItem';
import AddChanellModal from './modal/addChannelModal';
import { useState, useEffect } from 'react';
import { SelectCurrentChannelId, setCurrentChannel } from './channelsSlice';
import { PlusSquareIcon } from '../.././../assets/PlusSquareIcon';

export const ChannelList = () => {
  const dispatch = useDispatch();

  const { data: channels = [], isLoading } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();

  const channelsName = channels.map((channel) => channel.name);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentChannelId = useSelector(SelectCurrentChannelId);

  useEffect(() => {
    if (channels.length > 0 && !currentChannelId) {
      dispatch(
        setCurrentChannel({ id: channels[0].id, name: channels[0].name })
      );
    }
  }, [channels, currentChannelId, dispatch]);

  const handleChannelSelect = (channel) => {
    dispatch(setCurrentChannel({ id: channel.id, name: channel.name }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddChannel = async (values) => {
    try {
      const channel = await addChannel({
        name: values.chatName,
        removable: true,
      }).unwrap();
      dispatch(setCurrentChannel(channel));
    } catch (error) {
      console.error('Ошибка при создании чата:', error);
    }
  };

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className=" bg-info-subtle h-100 border border-primary col">
      <div className="d-flex justify-content-between align-items-center mt-2">
        <b>Каналы</b>
        <button
          onClick={handleOpenModal}
          className="btn text-primary p-0 btn-group-vertical"
        >
          <PlusSquareIcon />
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
        channelsName={channelsName}
      />
    </div>
  );
};
