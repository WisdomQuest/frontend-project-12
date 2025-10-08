import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentChannel: {
    name: null,
    id: null,
  },
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload
    },
    resetChannels: (state) => {
      state.currentChannel = { id: null, name: null }
    },
    handleChannelRemoval: (state, action) => {
      const removedChannelId = action.payload
      if (state.currentChannel.id === removedChannelId) {
        state.currentChannel = { id: null, name: null }
      }
    },
  },
})

export const {
  setCurrentChannel,
  resetChannels,
  handleChannelRemoval,
} = channelsSlice.actions

export const SelectCurrentChannelId = state => state.channels.currentChannel.id
export const SelectCurrentChannel = state => state.channels.currentChannel

export default channelsSlice.reducer
