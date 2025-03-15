import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, GlobalRootState } from '@/globalState/rootState/store';
import {
  firebaseAuth,
  firebaseSignIn,
  firebaseSignOut,
  googleAuthProvider,
} from '@/firebase/firebaseClient';
import { useHeaderNavSlice } from './useHeaderNavSlice';
import { authSliceActions } from '@/globalState/stateSlices/authSlice/authSlice';
import { UserDetails } from '@/types/types';
import { useCommonSlice } from './useCommonSlice';

export const useAuthSlice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    actions: { setAvatarItemsAsLogout, setAvatarItemsAsLogin },
  } = useHeaderNavSlice();
  const {
    actions: { setRootLoading },
  } = useCommonSlice();

  // selectors
  const showAuthModal = useSelector(
    (state: GlobalRootState) => state.authSlice.showAuthModal
  );
  const userDetails = useSelector(
    (state: GlobalRootState) => state.authSlice.userDetails
  );

  // actions
  const setShowAuthModal = (bool: boolean) => {
    dispatch(authSliceActions.setShowAuthModal(bool));
  };
  const setUserDetails = (user: UserDetails | null) => {
    dispatch(authSliceActions.setUserDetails(user));
  };

  const authSignOut = async () => {
    try {
      setRootLoading(true);
      await firebaseSignOut(firebaseAuth);
      // user details is set by authChangeEventListener
      setAvatarItemsAsLogout();
    } catch (e) {
      console.error(e);
    } finally {
      setRootLoading(false);
    }
  };

  const authSignIn = async () => {
    try {
      setRootLoading(true);

      await firebaseSignIn(firebaseAuth, googleAuthProvider);
      // user details is set by authChangeEventListener
      setAvatarItemsAsLogin();
      setShowAuthModal(false);
    } catch (e) {
      console.error(e);
    } finally {
      setRootLoading(false);
    }
  };

  return {
    selectors: { userDetails, showAuthModal },
    actions: {
      setShowAuthModal,
      setUserDetails,
      authSignOut,
      authSignIn,
    },
  };
};
