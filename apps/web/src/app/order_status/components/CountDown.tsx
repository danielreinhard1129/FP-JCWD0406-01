import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  orderId: any;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ orderId }) => {
  const [countdown, setCountdown] = useState<number>(3600);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    const storedOrderId = localStorage.getItem('orderId');
    const storedCountdown = parseInt(
      localStorage.getItem('countdown') || '0',
      10,
    );

    if (orderId === storedOrderId) {
      setCountdown(storedCountdown);
    } else {
      localStorage.setItem('orderId', orderId);
      localStorage.setItem('countdown', countdown.toString());
    }

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          clearInterval(interval);
          setCancel(true);
          return prevCountdown;
        }

        const newCountdown = prevCountdown - 1;
        localStorage.setItem('countdown', newCountdown.toString());

        if (newCountdown <= 0) {
          clearInterval(interval);
          setCancel(true);
        }

        return newCountdown;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, orderId]);

  return (
    <div className="text-center">
      {!cancel ? (
        <>
          <p className="font-bold mb-2">Waktu Tersisa</p>
          <p>
            {Math.floor(countdown / 60)} menit {countdown % 60} detik
          </p>
          <p className="text-red-500 mt-2 font-semibold">
            Batas pembayaran selama 1 jam
          </p>
        </>
      ) : null}
    </div>
  );
};

export default CountdownTimer;
