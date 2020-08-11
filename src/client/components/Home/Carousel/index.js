import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.scss';
import SignInForm from 'Components/Users/Agent/SignIn';
import ForgotPasswordForm from 'Components/Users/Agent/ForgotPassword';
import ResetPasswordForm from 'Components/Users/Agent/ResetPassword';

import { useLocation } from 'react-router-dom';
import { routes } from 'Constants';
import { utils } from 'Helpers';

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
    <div className="Carousel">
      <Slider {...settings}>
        <div className="Carousel-getStarted"></div>
      </Slider>
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
  );
};

export default Carousel;
