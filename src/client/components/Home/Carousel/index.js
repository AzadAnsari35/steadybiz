import React, { useState } from 'react';
import Slider from 'react-slick';
import { useLocation } from 'react-router-dom';

import { routes } from 'Constants';
import { utils } from 'Helpers';
import SignInForm from 'Components/Users/Agent/SignIn';
import ForgotPasswordForm from 'Components/Users/Agent/ForgotPassword';
import ResetPasswordForm from 'Components/Users/Agent/ResetPassword';
import { Text } from 'Widgets/';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.scss';

const Carousel = () => {
  const [selectedForm, setSelectedForm] = useState('SignInForm');

  const location = useLocation();

  const isResetPassword = utils.stringComparison(
    location.pathname,
    routes.user.resetPassword
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="Carousel position-relative">
      <Slider {...settings}>
        <div className="Carousel-getStarted" />
      </Slider>
      <div className="Carousel-content layout-wrapper">
        <div className="d-flex justify-content-between align-items-center height-100">
          <div className="Carousel-content__left">
            <Text
              className="title font-primary-semibold-18"
              text="Leading B2B travel portal"
            />
            <Text
              className="description font-primary-regular-16"
              text="OK Travel & Tourism is UAE's largest B2B travel portal. OK Travel is providing Global B2B booking system powering global travel solution to travel partners to serve their customers efficiently, with the right pricing and inventory."
            />
          </div>
          <div
            className={`Carousel-form ${
              selectedForm === 'SignInForm' ? 'top-115' : 'top-154'
            } ${isResetPassword ? 'top-148' : ''}`}
          >
            <div className="Carousel-getStarted-right">
              {isResetPassword ? (
                <ResetPasswordForm />
              ) : selectedForm === 'SignInForm' ? (
                <SignInForm setSelectedForm={setSelectedForm} />
              ) : (
                <ForgotPasswordForm
                  setSelectedForm={setSelectedForm}
                  selectedForm={selectedForm}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
