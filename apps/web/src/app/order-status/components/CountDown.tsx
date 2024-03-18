import { ICountdownTimerProps } from '@/types/props.type';
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ orderId }: ICountdownTimerProps) => {
  const [countdown, setCountdown] = useState<number>(3600);
  const [cancel, setCancel] = useState<boolean>(false);

  useEffect(() => {
    const storedOrderId: string = localStorage.getItem('orderId') as string;
    const storedCountdown: number = parseInt(
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

        const newCountdown: number = prevCountdown - 1;
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
    <div className="text-center text-xl border-b-2 pb-10">
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
