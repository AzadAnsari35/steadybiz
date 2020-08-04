import React, { useState, useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

import { Text } from "Widgets";

import "./style.scss";

const LinearLoader = props => {
  const { label, style } = props;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="LinearLoader layout-wrapper" style={style}>
      {!!label && <Text className="LinearLoader-label text-primary-semibold-14" text={label} />}
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

export default LinearLoader;
