import React, { useEffect, useState, useRef } from "react";
import { CircularProgress, Typography, Box, Fade } from "@mui/material";

type Props = {
  seconds: number;
  onRefresh: () => void;
  size?: number;
};

const AutoRefreshCounter: React.FC<Props> = ({
  seconds,
  onRefresh,
  size = 80,
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onRefresh();
          return seconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onRefresh, seconds]);

  const percentage = (timeLeft / seconds) * 100;

  return (
    <Fade in>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={size}
          thickness={5}
          color="primary"
        />
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          mt={1}
        >
          Refresca en {timeLeft}s
        </Typography>
      </Box>
    </Fade>
  );
};

export default AutoRefreshCounter;
