import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCoinData = createAsyncThunk('fetchCoin', async () => {
  try {
    const response = await axios.get(
      'https://skycommodity.in/bullsPanel/api/get-market',
    );
    // const result = response.data.Data;
    // return result;
    // Check if the response has a success status code
    if (response.status === 200) {
      const result = response.data.Data;
      return result;
    } else {
      // Handle non-200 status codes (e.g., 429 - rate limit exceeded)
      console.log('Unexpected status code:', response.status);
      return rejectWithValue('Unexpected status code');
    }
  } catch (error) {
    console.log('error aaya', error);
    throw error;
  }
});

// get Pending trade api here

export const getPrndingTrade = createAsyncThunk('PendingTrade', async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      'https://skycommodity.in/bullsPanel/api/pending-trades',
      config,
    );
    const Data = response.data.Data; // <-- Corrected property name
    // console.log('livekkk', Data);
    return Data;
  } catch (error) {
    console.log('error', error);
  }
});

// get Live trade here

export const getLiveTrade = createAsyncThunk('LiveTrade', async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      'https://skycommodity.in/bullsPanel/api/live-trades',
      config,
    );
    const Data = response.data.Data; // <-- Corrected property name
    // console.log('Live data', Data);
    return Data;
  } catch (error) {
    console.log('error', error);
  }
});

// ge Holding trade api here

export const getHoldingTrade = createAsyncThunk('HoldingTrade', async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      'https://skycommodity.in/bullsPanel/api/holding-trades',
      config,
    );
    const Data = response.data.Data; // <-- Corrected property name

    return Data;
  } catch (error) {
    console.log('error', error);
  }
});

export const updateLiveTrade = createAsyncThunk(
  'updateLiveTrade',
  async ({tradeId, payload}) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `https://skycommodity.in/bullsPanel/api/update-trade/${tradeId}`,
        payload,
        config,
      );

      if (response.data.Status === 200) {
        const updatedTrade = response.data.Data;

        return updatedTrade;
      }
    } catch (error) {
      console.error('Error updating trade:', error);
      throw error;
    }
  },
);

export const userBalance = createAsyncThunk('UserBalance', async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      'https://skycommodity.in/bullsPanel/api/user-balance',
      config,
    );
    const Balance = response.data.Balance; // <-- Corrected property name
    return Balance;
  } catch (error) {
    console.log('error', error);
  }
});

export const getPastTrade = createAsyncThunk('PastTrade', async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      'https://skycommodity.in/bullsPanel/api/past-trades',
      config,
    );
    const Data = response.data.Data; // <-- Corrected property name
    // console.log('past Trade', Data);
    return Data;
  } catch (error) {
    console.log('error', error);
  }
});

// update data for blinking api

export const DataUpdateBlink = createAsyncThunk('DataUpdateBlink', async () => {
  try {
    const response = await axios.get(
      'https://skycommodity.in/bullsPanel/api/update-market',
    );
    const Data = response.data.status; // <-- Corrected property name
    // console.log('Updated Data', Data);
    // return Data;
  } catch (error) {
    console.log('error', error);
  }
});

export const initWatchlistData = createAsyncThunk('initWatchlist', async () => {
  try {
    const storedData = await AsyncStorage.getItem('watchlistData');
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return [];
    }
  } catch (error) {
    console.log('error', error);
    throw error;
  }
});

export const coinSlice = createSlice({
  name: 'coin',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
    isTradeModalVisible: false,
    counter: 1,
    watchlistData: [],
    liveTradedata: [],
    pastTradedata: [],
    holdingTradedata: [],
    pendingTradedata: [],
    userBalance: null,
    isLoggedIn: false,
    storedData: null,
    updatedData: null,
  },
  reducers: {
    setIsTradeModalVisible: (state, action) => {
      state.isTradeModalVisible = action.payload;
    },
    incrementCounter: (state, action) => {
      state.counter += 1;
    },
    decrementCounter: (state, action) => {
      state.counter -= 1;
    },
    setUpdatedData: (state, action) => {
      state.updatedData = action.payload;
    },

    setLoggedInStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },

    setLiveTradeData: (state, action) => {
      state.liveTradedata = action.payload;
    },

    setPendingTradeData: (state, action) => {
      state.pendingTradedata = action.payload;
    },

    setHoldingTradeData: (state, action) => {
      state.holdingTradedata = action.payload;
    },

    addToWatchlist: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.watchlistData.find(
        item => item.id === newItem.id,
      );
      if (!existingItem) {
        state.watchlistData.push(newItem);
        AsyncStorage.setItem(
          'watchlistData',
          JSON.stringify(state.watchlistData),
        );
      }
      // console.log("SDs",existingItem)
    },

    removeAllFromWatchlist: state => {
      return [];
    },

    removeFromWatchlist: (state, action) => {
      const itemId = action.payload;
      state.watchlistData = state.watchlistData.filter(
        item => item.id !== itemId,
      );
      AsyncStorage.setItem(
        'watchlistData',
        JSON.stringify(state.watchlistData),
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCoinData.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchCoinData.fulfilled, (state, action) => {
      // console.log("response",response)
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCoinData.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = action.payload; // This could be 'Unexpected status code'
      state.storedData = state.data; // Save the current data to storedData
      state.data = null; // Clear current data to prevent displaying it
      // state.isError = true;
    });

    // watchlist added app refresh data come
    builder.addCase(initWatchlistData.fulfilled, (state, action) => {
      state.watchlistData = action.payload;
    });

    //  Live Trade data fetch here

    builder.addCase(getLiveTrade.fulfilled, (state, action) => {
      state.liveTradedata = action.payload;
    });

    //  pending Trade data fetch here

    builder.addCase(getPrndingTrade.fulfilled, (state, action) => {
      state.pendingTradedata = action.payload;
    });

    // paast trade data fetch here

    builder.addCase(getPastTrade.fulfilled, (state, action) => {
      state.pastTradedata = action.payload;
    });

    //  Holding trade fetch here

    builder.addCase(getHoldingTrade.fulfilled, (state, action) => {
      state.holdingTradedata = action.payload;
    });

    // updated edit stop loss data
    builder.addCase(updateLiveTrade.fulfilled, (state, action) => {
      dispatch(setLiveTradeData(action.payload));
    });

    // Balance  fetch here

    builder.addCase(userBalance.pending, state => {
      state.isLoader = true;
    });

    builder.addCase(userBalance.fulfilled, (state, action) => {
      state.userBalance = action.payload;
    });

    builder.addCase(userBalance.rejected, state => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export const {
  setIsTradeModalVisible,
  incrementCounter,
  decrementCounter,
  addToWatchlist,
  removeFromWatchlist,
  removeAllFromWatchlist,
  setLoggedInStatus,
  setLiveTradeData,
} = coinSlice.actions;
export default coinSlice.reducer;
export const selectIsTradeModalVisible = state =>
  state.coin.isTradeModalVisible;
