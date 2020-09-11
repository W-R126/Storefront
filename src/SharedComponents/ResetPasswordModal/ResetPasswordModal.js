import React, { useState, useEffect } from 'react';

import AuthModal from '../AuthModal';
import InputContactView from './Components/InputContactView';

const INPUT_CONTACT_VIEW = 0;
const LOGIN_VIEW = 1;

const ResetPasswordModal = ({ isShow, hideModal, gotoLogin }) => {
  const [curView, setCurView] = useState(INPUT_CONTACT_VIEW);
  const [formData, setFormData] = useState({
    email: {
      value: '',
      validate: true,
      errorMsg: '',
    },
  });

  return (
    <AuthModal isShow={isShow} hideModal={hideModal}>
      {curView === INPUT_CONTACT_VIEW && (
        <InputContactView
          formData={formData}
          onChange={(value) => {
            setFormData({
              ...formData,
              email: { ...value },
            });
          }}
          gotoNext={() => setCurView(LOGIN_VIEW)}
          gotoLoing={gotoLogin}
        />
      )}
    </AuthModal>
  );
};

export default ResetPasswordModal;
