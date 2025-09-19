import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannel: {
    name: null,
    id: null
  },
  // showChannelModal: false,
  // channelModalType: null,
  // channelModalData: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    // showChannelModal: (state, action) => {
    //   state.showChannelModal = true;
    //   state.channelModalType = action.payload.type;
    //   state.channelModalData = action.payload.data || null;
    // },
    // hideChannelModal: (state) => {
    //   state.showChannelModal = false;
    //   state.channelModalType = null;
    //   state.channelModalData = null;
    // },
    resetChannels: (state) => {
      state.currentChannel = { id: null, name: null };
    },
  },
});

export const {
  setCurrentChannel,
  showChannelModal,
  hideChannelModal,
  resetChannels,
} = channelsSlice.actions;

export const SelectCurrentChannelId = (state) => state.channels.currentChannel.id;
export const SelectCurrentChannel = (state) => state.channels.currentChannel;

export default channelsSlice.reducer;
