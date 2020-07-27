import React, { useState } from "react";

import { displayImage } from "Helpers/utils";

const Image = props => {
  const { altText = "", imgName, imgPath, fallbackImgName } = props;
  const [failed, setFailed] = useState(false);

  const fallback = () => {
    if (fallbackImgName) {
      setFailed(true);
    }
  };

  if (failed) {
    return <img alt={altText} src={displayImage(fallbackImgName, imgPath)} />;
  } else {
    return <img alt={altText} src={displayImage(imgName, imgPath)} onError={fallback} />;
  }
};

export default Image;
