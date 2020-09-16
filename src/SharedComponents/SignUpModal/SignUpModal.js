import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import _ from 'lodash';
import AuthModal from '../AuthModal';
import PhoneInputView from './Components/PhoneInputView';
import ContactView from './Components/ContactView';
import CreatePasswordView from './Components/CreatePasswordView';
import ResultView from './Components/ResultView';

import { SIGNUP } from '../../graphql/auth/auth-mutation';
import { CHECK_ACTIVATIONS } from '../../graphql/auth/auth-query';

import { getDialCodeWithCode } from '../../constants';

const SIGNUP_PHONE_VIEW = 0;
const SIGNUP_CONTACT_VIEW = 1;
const SIGNUP_CREATE_PASSWORD_VIEW = 2;
const SIGNUP_RESULT_VIEW = 3;

const SignUpModal = ({ isShow, hideModal, gotoLogin }) => {
  const { countryCode } = useSelector((state) => ({
    countryCode: state.localizationReducer.countryCode,
  }));
  const [curView, setCurView] = useState(SIGNUP_PHONE_VIEW);
  const [formData, setFormData] = useState({
    phoneNumber: {
      dial_code: getDialCodeWithCode(countryCode),
      code: countryCode,
      number: '',
      validate: true,
      errorMsg: '',
    },
    firstName: '',
    lastName: '',
    email: '',
    password: { value: '', validate: true, errorMsg: '' },
    policyAgree: false,
  });

  const [signUp, { data: signUpData, loading: signUpLoading, error: sugnUpError }] = useMutation(SIGNUP);
  const [checkActivation, { loading: checkActivityLoading }] = useLazyQuery(CHECK_ACTIVATIONS);

  const handleSignUp = async () => {
    try {
      setCurView(SIGNUP_RESULT_VIEW);
      signUp({
        variables: {
          email: formData.email,
          firstName: formData.firstName,
          secondName: formData.lastName,
          password: formData.password.value,
          mobile: '+441234567891' || `${formData.phoneNumber.dial_code}${formData.phoneNumber.number}`, // fix
        },
      })
        .then(async (res) => {
          const userData = res.data.createUser.activations[0];

          try {
            const resAct = await checkActivation({
              variables: {
                userID: userData && userData.user_id,
              },
            });
          } catch (err) {
            console.log(err);
          }
          hideModal();
        })
        .catch((err) => {
          debugger;
        });
    } catch (e) {
      console.log(e);
    }
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
          gotoLogin={gotoLogin}
        />
      )}
      {curView === SIGNUP_CONTACT_VIEW && (
        <ContactView
          formData={formData}
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
          signUp={handleSignUp}
        />
      )}
      {curView === SIGNUP_RESULT_VIEW && (
        <ResultView
          userData={signUpData}
          gotoChangeEmail={() => setCurView(SIGNUP_CONTACT_VIEW)}
          hideModal={hideModal}
          loading={checkActivityLoading || signUpLoading}
        />
      )}
    </AuthModal>
  );
};

export default SignUpModal;
