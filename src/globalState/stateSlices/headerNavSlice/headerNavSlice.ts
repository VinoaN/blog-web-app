import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AvatarItem, NavItem } from '@/constants/globalConstants';
import { sliceNames } from '@/globalState/sliceNames';
import { SearchedPostType } from '@/types/types';

export const headerNavSlice = createSlice({
  name: sliceNames.headerNavSlice,
  initialState: {
    navItems: [] as NavItem[],
    navActive: NavItem.HOME,
    avatarItems: [AvatarItem.LOGIN],
    searchItems: [] as SearchedPostType[],
    searchLoading: false,
  },
  reducers: {
    setNavActive: (state, action: PayloadAction<NavItem>) => {
      state.navActive = action.payload;
    },
    setAvatarItems: (state, action: PayloadAction<AvatarItem[]>) => {
      state.avatarItems = action.payload;
    },
    setSearchItems: (state, action: PayloadAction<SearchedPostType[]>) => {
      state.searchItems = action.payload;
    },
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.searchLoading = action.payload;
    },
    setNavItems: (state, action: PayloadAction<NavItem[]>) => {
      state.navItems = action.payload;
    },
  },
});

export const blogNavReducer = headerNavSlice.reducer;

export const { ...headerNavSliceActions } = headerNavSlice.actions;
