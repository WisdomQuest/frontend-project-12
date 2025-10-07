import { useGetChannelsQuery, useAddChannelMutation } from './channelsApi'
import { useSelector, useDispatch } from 'react-redux'
import ChannelItem from './ChannelItem'
import { useState, useEffect, useMemo } from 'react'
import { SelectCurrentChannelId, setCurrentChannel } from './channelsSlice'
import { PlusSquareIcon } from '../.././../assets/PlusSquareIcon'
import { EditChannelModal } from './modal/editChannelModal.jsx'
import { useTranslation } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import { notifySuccess, notifyError } from './notify/notify.js'
import filter from 'leo-profanity'

export const ChannelList = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { data: channels = [], isLoading } = useGetChannelsQuery()
  const [addChannel] = useAddChannelMutation()

  const channelsNames = useMemo(
    () => channels.map(cnannel => cnannel.name),
    [channels],
  )

  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentChannelId = useSelector(SelectCurrentChannelId)

  useEffect(() => {
    if (channels.length > 0 && !currentChannelId) {
      dispatch(
        setCurrentChannel({ id: channels[0].id, name: channels[0].name }),
      )
    }
  }, [channels, currentChannelId, dispatch])

  const handleChannelSelect = channel => {
    dispatch(setCurrentChannel({ id: channel.id, name: channel.name }))
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleAddChannel = async values => {
    try {
      const cleanedchatName = filter.clean(values.chatName.trim())
      const channel = await addChannel({
        name: cleanedchatName,
        removable: true,
      }).unwrap()
      notifySuccess(t('channels.toast.add'))
      dispatch(setCurrentChannel(channel))
    }
    catch (error) {
      console.error(error)
      notifyError(t('channels.errors.connectionError'))
    }
  }

  if (isLoading) return <div>{t('common.loading')}</div>

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.title')}</b>
        <button
          onClick={handleOpenModal}
          className="btn text-primary p-0 btn-group-vertical"
          title={t('channels.add')}
        >
          <PlusSquareIcon />
          <span className="visually-hidden">{t('channels.plus')}</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(channel => (
          <ChannelItem
            key={channel.id}
            channel={channel}
            isActive={currentChannelId === channel.id}
            onSelect={handleChannelSelect}
            channelsNames={channelsNames}
          />
        ))}
      </ul>

      <EditChannelModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddChannel}
        channelsNames={channelsNames}
        channelName={null}
        textHeaderModal={t('channels.modal.addTitle')}
      />
      <ToastContainer />
    </>
  )
}
