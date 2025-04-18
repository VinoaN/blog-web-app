import { useDispatch, useSelector } from 'react-redux';
import {
  firebaseAuth,
  firebaseSignIn,
  firebaseSignOut,
  googleAuthProvider,
} from '@/firebase/firebaseClient';
import { AppDispatch, GlobalRootState } from '@/globalState/rootState/store';
import { authSliceActions } from '@/globalState/stateSlices/authSlice/authSlice';
import { UserDetails } from '@/types/types';
import { useCommonSlice } from './useCommonSlice';
import { useHeaderNavSlice } from './useHeaderNavSlice';
import { useToast } from './useToast';

export const useAuthSlice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    actions: { setAvatarItemsAsLogout, setAvatarItemsAsLogin },
  } = useHeaderNavSlice();
  const {
    actions: { setRootLoading },
  } = useCommonSlice();

  const { successNotify, errorNotify } = useToast();

  // selectors
  const showAuthModal = useSelector(
    (state: GlobalRootState) => state.authSlice.showAuthModal
  );
  const userDetails = useSelector(
    (state: GlobalRootState) => state.authSlice.userDetails
  );

  const initialAuthComplete = useSelector(
    (state: GlobalRootState) => state.authSlice.initialAuthComplete
  );

  // actions
  const setShowAuthModal = (bool: boolean) => {
    dispatch(authSliceActions.setShowAuthModal(bool));
  };
  const setUserDetails = (user: UserDetails | null) => {
    dispatch(authSliceActions.setUserDetails(user));
  };

  const setInitialAuthComplete = () => {
    dispatch(authSliceActions.setInitialAuthComplete());
  };

  const authSignOut = async () => {
    try {
      setRootLoading(true);
      await firebaseSignOut(firebaseAuth);
      // user details is set by authChangeEventListener
      setAvatarItemsAsLogout();
      successNotify('Sign out successful');
    } catch (error) {
      console.error(error);
      errorNotify('Sign out failed');
      throw error;
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
      successNotify('Sign in successful');
    } catch (error) {
      console.error(error);
      errorNotify('Sign in failed');
      throw error;
    } finally {
      setRootLoading(false);
    }
  };

  return {
    selectors: { userDetails, showAuthModal, initialAuthComplete },
    actions: {
      setShowAuthModal,
      setUserDetails,
      authSignOut,
      authSignIn,
      setInitialAuthComplete,
    },
  };
};
