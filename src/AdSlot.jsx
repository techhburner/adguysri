import React, { useEffect } from "react";

const AdSlot = ({ id, className = "ad-slot", client, slot }) => {
  useEffect(() => {
    if (window.adsbygoogle && client && slot) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("Adsense error", e);
      }
    }
  }, [client, slot]);

  return (
    <div className={className}>
      {/* Placeholder / fallback */}
      {!client ? (
        <div className="ad-placeholder">Ad space — {id}</div>
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      )}
    </div>
  );
};

export default AdSlot;
