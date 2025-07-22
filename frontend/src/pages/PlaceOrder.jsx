import { useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Send to backend
  };

  return (
    <div className="min-h-[80vh] border-t px-4 sm:px-8 md:px-12 py-10">
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/* Delivery Info Section */}
        <div className="w-full lg:w-2/3  border-4 rounded-xl p-6 text-black shadow-sm">
          <div className="text-xl sm:text-xl mb-6">
            <Title text1="Delivery " text2="Information" />
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Name */}
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

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="E-Mail Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-box border rounded-sm p-2 w-full"
            />

            {/* Street + City */}
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

            {/* Zip + Country */}
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
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
                className="input-box border rounded-sm p-2 w-full"
              />
            </div>

            {/* Phone */}
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

            {/* Submit */}
            {/* <button
              type="submit"
              className="bg-black text-white rounded-lg py-3 px-6 mt-4 w-full sm:w-fit hover:opacity-90 transition"
            >
              Place Order
            </button> */}
          </form>
        </div>

        {/* Cart Total Section */}
        <div className="w-full lg:w-1/3 mt-10 lg:mt-0.5 ">
          <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
