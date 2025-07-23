import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/frontend_assets/assets';

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const [selectedPayment, setSelectedPayment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Programmatic form validation
    const formIsValid = formRef.current?.checkValidity();
    if (!formIsValid) {
      formRef.current?.reportValidity();
      return;
    }

    if (!selectedPayment) {
      setErrorMessage('Please select a payment method.');
      return;
    }

    setErrorMessage('');

    const orderData = {
      ...formData,
      paymentMethod: selectedPayment,
    };

    console.log('Order submitted:', orderData);

    alert('Order placed successfully!');
    navigate('/order');
  };

  return (
    <div className="min-h-[80vh] border-t px-4 sm:px-8 md:px-12 py-10">
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/* Delivery Form */}
        <form
          ref={formRef}
          className="w-full lg:w-2/3 border-4 rounded-xl p-6 text-black shadow-sm flex flex-col gap-6"
        >
          <div className="text-xl sm:text-xl mb-2">
            <Title text1="Delivery " text2="Information" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="input-box border rounded-sm p-2 w-full"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="input-box border rounded-sm p-2 w-full"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="E-Mail Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-box border rounded-sm p-2 w-full"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              required
              className="input-box border rounded-sm p-2 w-full"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="input-box border rounded-sm p-2 w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              required
              className="input-box border rounded-sm p-2 w-full"
            />
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="input-box border rounded-sm p-2 w-full"
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
            </select>
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit phone number"
            className="input-box border rounded-sm p-2 w-full"
          />
        </form>

        {/* Cart & Payment */}
        <div className="mt-10 w-full lg:w-1/3 lg:mt-0.5">
          <CartTotal />

          <div className="mt-12">
            <Title text1="Payment" text2="Method" />

            <div className="flex flex-col gap-3 lg:flex-row">
              {/* Stripe */}
              <div
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md ${
                  selectedPayment === 'stripe' ? 'border-black' : ''
                }`}
                onClick={() => setSelectedPayment('stripe')}
              >
                <div className="w-4 h-4 border rounded-full flex items-center justify-center">
                  {selectedPayment === 'stripe' && (
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  )}
                </div>
                <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
              </div>

              {/* Razorpay */}
              <div
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md ${
                  selectedPayment === 'razorpay' ? 'border-black' : ''
                }`}
                onClick={() => setSelectedPayment('razorpay')}
              >
                <div className="w-4 h-4 border rounded-full flex items-center justify-center">
                  {selectedPayment === 'razorpay' && (
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  )}
                </div>
                <img
                  className="h-5 mx-4"
                  src={assets.razorpay_logo}
                  alt="Razorpay"
                />
              </div>
                  
              {/* COD */}
              <div
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md ${
                  selectedPayment === 'cod' ? 'border-black' : ''
                }`}
                onClick={() => setSelectedPayment('cod')}
              >
                <div className="w-4 h-4 border rounded-full flex items-center justify-center">
                  {selectedPayment === 'cod' && (
                    <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  )}
                </div>
                <p className="text-gray-700 text-sm font-medium px-4">
                  Cash On Delivery
                </p>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
            )}

            {/* Button at original position (right) */}
            <div className="w-full text-end mt-8">
              <button
                onClick={handlePlaceOrder}
                className="bg-black text-white px-16 py-3 text-sm rounded font-bold hover:opacity-90"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
