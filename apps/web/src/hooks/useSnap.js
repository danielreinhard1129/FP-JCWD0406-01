import { useEffect, useState } from 'react';

const useSnap = () => {
  const [snap, setSnap] = useState(null);

  useEffect(() => {
    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_ID;
    const script = document.createElement('script');
    script.src = `${process.env.NEXT_PUBLIC_MIDTRANS_API_URL}/snap/snap.js`;
    script.setAttribute('data-client-key', myMidtransClientKey);
    script.onload = () => {
      setSnap(window.snap);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snap_token, embedId, action) => {
    if (snap) {
      snap.embed(snap_token, {
        embedId,
        onSuccess: function (result) {
          console.log('success', result);
          action.onSuccess(result);
        },
        onPending: function (result) {
          console.log('pending', result);
          action.onPending(result);
        },
        onClose: function () {
          action.onClose();
        },
      });
    }
  };

  return { snapEmbed };
};
export default useSnap;
