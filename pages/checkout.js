import { useState } from 'react';
import { useRouter } from 'next/router';

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1529679242600910910/89tQikrcx8I1WX9_6PSTNderd6wh2IxwPKbCBnMv7cBtE9ed2nHlXd9snT46op93aQ97";

export default function Checkout() {
  const router = useRouter();
  const { name, price } = router.query;

  const productName = name || "Baby Dress Set";
  const productPrice = price || "500";

  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', size: '1-2 Years', trxId: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const embedData = {
      embeds: [
        {
          title: "🛍️ নতুন কাপড়ের অর্ডার এসেছে!",
          color: paymentMethod === 'bkash' ? 16711680 : paymentMethod === 'nagad' ? 16744192 : 32768,
          fields: [
            { name: "👕 প্রোডাক্ট", value: productName, inline: false },
            { name: "📏 জামার সাইজ", value: formData.size, inline: true },
            { name: "💰 মূল্য", value: `৳${productPrice}`, inline: true },
            { name: "💳 পেমেন্ট মেথড", value: paymentMethod.toUpperCase(), inline: true },
            { name: "👤 কাস্টমারের নাম", value: formData.name, inline: false },
            { name: "📞 মোবাইল নাম্বার", value: formData.phone, inline: true },
            { name: "🏠 ঠিকানা", value: formData.address, inline: false },
            ...(paymentMethod !== 'cod' ? [{ name: "🧾 Transaction ID", value: formData.trxId, inline: true }] : []),
          ],
          timestamp: new Date().toISOString(),
        }
      ]
    };

    try {
      const res = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(embedData)
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      alert("অর্ডার সাবমিট করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full border border-amber-200">
          <div className="text-5xl mb-3">🎉</div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">অর্ডার সফল হয়েছে!</h2>
          <p className="text-gray-600 text-sm mb-6">আপনার সাথে খুব শীঘ্রই যোগাযোগ করা হবে।</p>
          <button onClick={() => router.push('/')} className="bg-[#8c1d40] text-white px-6 py-2.5 rounded-none font-bold text-xs uppercase tracking-widest">
            হোমপেজে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] p-4 flex flex-col items-center justify-center font-sans">
      <div className="max-w-md w-full bg-white rounded-none shadow-md p-6 border border-stone-200">
        <h2 className="text-lg font-bold mb-3 border-b pb-3 text-gray-800 uppercase tracking-wider">অর্ডার কনফার্ম করুন</h2>
        
        <div className="bg-amber-50 border border-amber-200 p-3.5 mb-5">
          <p className="font-bold text-gray-800 text-sm">{productName}</p>
          <p className="text-xs text-gray-600 mt-1">মোট মূল্য: <span className="text-[#8c1d40] font-bold text-base">৳{productPrice}</span></p>
        </div>

        {/* Payment Selection */}
        <div className="grid grid-cols-3 gap-2 mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setPaymentMethod('bkash')}
            className={`py-2.5 transition border ${paymentMethod === 'bkash' ? 'bg-red-600 text-white border-red-600' : 'bg-gray-50 text-gray-700'}`}
          >
            bKash
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('nagad')}
            className={`py-2.5 transition border ${paymentMethod === 'nagad' ? 'bg-orange-500 text-white border-orange-500' : 'bg-gray-50 text-gray-700'}`}
          >
            Nagad
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('cod')}
            className={`py-2.5 transition border ${paymentMethod === 'cod' ? 'bg-green-600 text-white border-green-600' : 'bg-gray-50 text-gray-700'}`}
          >
            Cash on Delivery
          </button>
        </div>

        {paymentMethod === 'bkash' && (
          <div className="bg-red-50 border border-red-200 p-4 text-center mb-5">
            <p className="text-xs text-red-600 font-bold">bKash Personal (Send Money)</p>
            <p className="text-2xl font-mono font-bold text-red-600 my-1">01851242532</p>
            <p className="text-xs text-gray-600">পাঠাতে হবে: <b>৳{productPrice}</b></p>
          </div>
        )}

        {paymentMethod === 'nagad' && (
          <div className="bg-orange-50 border border-orange-200 p-4 text-center mb-5">
            <p className="text-xs text-orange-600 font-bold">Nagad Personal (Send Money)</p>
            <p className="text-2xl font-mono font-bold text-orange-600 my-1">01787775261</p>
            <p className="text-xs text-gray-600">পাঠাতে হবে: <b>৳{productPrice}</b></p>
          </div>
        )}

        {paymentMethod === 'cod' && (
          <div className="bg-green-50 border border-green-200 p-4 text-center mb-5">
            <p className="text-xs text-green-700 font-bold">ক্যাশ অন ডেলিভারি</p>
            <p className="text-xs text-gray-600 mt-1">পণ্য হাতে পেয়ে নগদ মূল্য পরিশোধ করুন: <b>৳{productPrice}</b></p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          
          {/* 👕 জামার সাইজ সিলেক্ট করার অপশন */}
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">জামার সাইজ নির্বাচন করুন:</label>
            <select
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              className="w-full p-2.5 border bg-white focus:outline-none focus:border-[#8c1d40] text-gray-800 font-medium cursor-pointer"
            >
              <option value="0-6 Months">0 - 6 মাস</option>
              <option value="6-12 Months">6 - 12 মাস</option>
              <option value="1-2 Years">1 - 2 বছর</option>
              <option value="2-3 Years">2 - 3 বছর</option>
              <option value="3-4 Years">3 - 4 বছর</option>
              <option value="4-5 Years">4 - 5 বছর</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-semibold">আপনার নাম:</label>
            <input
              type="text"
              required
              placeholder="e.g. Rahim Ahmed"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 border focus:outline-none focus:border-[#8c1d40]"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-semibold">মোবাইল নাম্বার:</label>
            <input
              type="text"
              required
              placeholder="017xxxxxxxx"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2.5 border focus:outline-none focus:border-[#8c1d40]"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-semibold">সম্পূর্ণ ঠিকানা:</label>
            <textarea
              required
              rows="2"
              placeholder="বাসা নং, রোড নং, এলাকা, জেলা"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 border focus:outline-none focus:border-[#8c1d40]"
            ></textarea>
          </div>

          {paymentMethod !== 'cod' && (
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">TrxID (ট্রানজেকশন আইডি):</label>
              <input
                type="text"
                required
                placeholder="e.g. BK98X76YZ"
                value={formData.trxId}
                onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                className="w-full p-2.5 border focus:outline-none focus:border-[#8c1d40]"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-bold transition mt-2 tracking-widest uppercase ${
              paymentMethod === 'bkash' ? 'bg-red-600 hover:bg-red-700' :
              paymentMethod === 'nagad' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'প্রসেসিং...' : 'অর্ডার কনফার্ম করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}