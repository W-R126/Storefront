import React, { useState } from 'react';

import AuthModal from '../AuthModal';
import InputContactView from './Components/InputContactView';
import CheckEmailView from './Components/CheckEmailView';

const INPUT_CONTACT_VIEW = 0;
const RESEND_VIEW = 1;

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
          gotoNext={() => setCurView(RESEND_VIEW)}
          gotoLogin={gotoLogin}
        />
      )}
      {curView === RESEND_VIEW && (
        <CheckEmailView formData={formData} gotoLogin={gotoLogin} gotoBack={() => setCurView(INPUT_CONTACT_VIEW)} />
      )}
    </AuthModal>
  );
};

export default ResetPasswordModal;
