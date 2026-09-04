import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function GenerateQR() {
  const [listingId, setListingId] = useState('');
  const [qrValue, setQrValue] = useState('');

  function handleGenerate() {
    if (!listingId.trim()) {
      alert('Please enter a listing ID');
      return;
    }
    const verifyUrl = `${window.location.origin}/verify/${listingId}`;
    setQrValue(verifyUrl);
  }

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="font-heading font-extrabold text-3xl text-text mb-2">Generate QR Code</h1>
      <p className="font-body text-text-muted mb-6">Enter a listing ID to generate its verification QR code</p>

      <input
        type="text"
        value={listingId}
        onChange={(e) => setListingId(e.target.value)}
        placeholder="Enter listing ID"
        className="border border-border rounded-xl px-4 py-2 w-full mb-4 focus:ring-2 focus:ring-brand outline-none font-body"
      />

      <button
        onClick={handleGenerate}
        className="bg-accent text-white font-body font-medium px-6 py-2 rounded-xl shadow-sm hover:opacity-90"
      >
        Generate QR
      </button>

      {qrValue && (
        <div className="mt-6 bg-surface-alt rounded-xl shadow-sm border border-border p-6 inline-block">
          <QRCodeSVG value={qrValue} size={200} />
          <p className="font-body text-sm text-text-muted mt-3 break-all">{qrValue}</p>
        </div>
      )}
    </div>
  );
}