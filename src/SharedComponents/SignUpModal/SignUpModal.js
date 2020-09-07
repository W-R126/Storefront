import React, { useState } from 'react';

import AuthModal from '../AuthModal';
import PhoneInputView from './Components/PhoneInputView';
import ContactView from './Components/ContactView';
import CreatePasswordView from './Components/CreatePasswordView';
import ResultView from './Components/ResultView';

const SIGNUP_PHONE_VIEW = 0;
const SIGNUP_CONTACT_VIEW = 1;
const SIGNUP_CREATE_PASSWORD_VIEW = 2;
const SIGNUP_RESULT_VIEW = 3;

const SignUpModal = ({ isShow, hideModal }) => {
  const [curView, setCurView] = useState(SIGNUP_PHONE_VIEW);
  const [formData, setFormData] = useState({
    phoneNumber: { code: '+44', number: '', validate: true, errorMsg: '' },
    firstName: '',
    lastName: '',
    email: '',
    password: { value: '', validate: true, errorMsg: '' },
    policyAgree: false,
  });

  const signUp = () => {
    console.log('asdf');
  };

  return (
    <AuthModal isShow={isShow} hideModal={hideModal}>
      {curView === SIGNUP_PHONE_VIEW && (
        <PhoneInputView
          phoneNumber={formData.phoneNumber}
          onChange={(phoneNumber) => {
            setFormData({
              ...formData,
              phoneNumber: {
                ...phoneNumber,
              },
            });
          }}
          gotoNext={() => {
            setCurView(SIGNUP_CONTACT_VIEW);
          }}
        />
      )}
      {curView === SIGNUP_CONTACT_VIEW && (
        <ContactView
          onChange={(value) => {
            setFormData({
              ...formData,
              ...value,
            });
          }}
          gotoNext={() => setCurView(SIGNUP_CREATE_PASSWORD_VIEW)}
        />
      )}
      {curView === SIGNUP_CREATE_PASSWORD_VIEW && (
        <CreatePasswordView
          password={formData.password}
          policyAgree={formData.policyAgree}
          onChange={(newValue) =>
            setFormData({
              ...formData,
              ...newValue,
            })
          }
          signUp={signUp}
        />
      )}
      {curView === SIGNUP_RESULT_VIEW && <ResultView formData={formData} />}
    </AuthModal>
  );
};

export default SignUpModal;
