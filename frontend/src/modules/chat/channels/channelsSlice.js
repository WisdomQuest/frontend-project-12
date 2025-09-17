import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: null,
  showChannelModal: false,
  channelModalType: null,
  channelModalData: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    showChannelModal: (state, action) => {
      state.showChannelModal = true;
      state.channelModalType = action.payload.type;
      state.channelModalData = action.payload.data || null;
    },
    hideChannelModal: (state) => {
      state.showChannelModal = false;
      state.channelModalType = null;
      state.channelModalData = null;
    },
    resetChannels: (state) => {
      state.currentChannelId = null;
    },
  },
});

export const {
  setCurrentChannel,
  showChannelModal,
  hideChannelModal,
  resetChannels,
} = channelsSlice.actions;

export const SelectCurrentChannelId = (state) => state.channels.currentChannelId;

export default channelsSlice.reducer;
