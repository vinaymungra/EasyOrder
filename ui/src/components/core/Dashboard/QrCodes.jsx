import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateQRCodes } from '../../../services/middlewares/bussiness';

const QrCodes = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.owner);
  const { qrUrls } = useSelector((state) => state.bussiness);

  useEffect(() => {
    if (qrUrls.length === 0) {
      handlePage();
    }
  }, []);

  const handlePage = async () => {
    console.log(token);
    dispatch(generateQRCodes(token));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Generated QR Codes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {qrUrls && qrUrls.map((url, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
            <img 
              src={url} 
              alt={`QR Code ${index + 1}`} 
              className="w-full h-auto object-contain" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QrCodes;
