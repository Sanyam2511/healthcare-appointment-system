import React, { useState } from 'react';
import { X, CreditCard, Lock, Loader2, ShieldCheck } from 'lucide-react';
import Button from './Button';

const PaymentModal = ({ isOpen, onClose, onSuccess, amount, doctorName }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '', name: '' });

  if (!isOpen) return null;

  const handleFakePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(); 
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" onClick={!isProcessing ? onClose : null}></div>

      <div className="bg-white rounded-3xl w-full max-w-md p-6 md:p-8 relative z-10 shadow-2xl animate-in fade-in zoom-in duration-200">
        {!isProcessing && (
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        )}
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
            <Lock size={20} className="text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-brand-dark mb-1">Secure Checkout</h2>
          <p className="text-sm text-gray-500">Consultation with {doctorName}</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-center border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Due</p>
          <p className="text-4xl font-bold text-brand-dark">${amount}</p>
        </div>

        <form onSubmit={handleFakePayment} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Card Information</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <CreditCard size={18} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                required
                placeholder="0000 0000 0000 0000"
                maxLength="16"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none font-mono text-sm transition-all shadow-sm"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({...cardDetails, number: e.target.value.replace(/\D/g, '')})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input 
                type="text" 
                required
                placeholder="MM/YY"
                maxLength="5"
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none font-mono text-sm transition-all shadow-sm"
              />
            </div>
            <div>
              <input 
                type="text" 
                required
                placeholder="CVC"
                maxLength="4"
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none font-mono text-sm transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <input 
              type="text" 
              required
              placeholder="Name on card"
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none text-sm transition-all shadow-sm"
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className={`w-full py-4 text-lg rounded-2xl flex items-center justify-center gap-2 ${isProcessing ? 'bg-brand-dark' : 'bg-brand-blue hover:bg-blue-600'} text-white transition-all shadow-lg shadow-brand-blue/30`}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Processing...
                </>
              ) : (
                `Pay $${amount}`
              )}
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400 font-medium">
            <ShieldCheck size={14} /> Payments are secure and encrypted
          </div>

        </form>
      </div>
    </div>
  );
};

export default PaymentModal;