import React, { useState } from "react";

import { displayImage } from "Helpers/utils";

const Image = props => {
  const { altText = "", imgName, imgPath = "images", fallbackImgName, ...rest } = props;
  const [failed, setFailed] = useState(false);

  const fallback = () => {
    if (fallbackImgName) {
      setFailed(true);
    }
  };

  if (failed) {
    return <img alt={altText} src={displayImage(fallbackImgName, imgPath)} {...rest} />;
  } else {
    return <img alt={altText} src={displayImage(imgName, imgPath)} onError={fallback} {...rest} />;
  }
};

export default Image;
