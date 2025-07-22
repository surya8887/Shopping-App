import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="min-h-screen px-6 py-10 sm:px-10 md:px-20 bg-gradient-to-b from-white to-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >

      {/* 🟣 Hero Section */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            Who We Are
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We're a team of creators, technologists, and dreamers dedicated to building seamless online shopping experiences.
            With a focus on quality, speed, and trust, we bring curated collections right to your fingertips.
          </p>
        </div>

        <motion.img
          src="https://prod-brandsgateway-images.s3.fr-par.scw.cloud/2022/11/sendegaro-about-us-page-min-fbafe3f3-e6b.png"
          alt="About us illustration"
          className="w-full md:w-1/2 max-w-md object-cover rounded-xl shadow-2xl"
          whileHover={{ scale: 1.05 }}
        />
      </motion.div>

      {/* 🟠 Mission Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://wwwlpp62711ea95a.blob.core.windows.net/blobwwwlpp62711ea95a/wp-content/uploads/2023/06/lpp-about-us-mission-vision-values-our-mission-photo-1050x600px-96ppi-v1-1000x600.jpg"
            alt="Our mission"
            className="w-full md:w-1/2 max-w-md rounded-lg"
          />
          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to make online shopping simple, smart, and delightful. Whether you’re looking for everyday essentials or exclusive fashion, we’re here to deliver a smooth and secure experience with every order.
          </p>
        </div>
      </div>

      {/* 🟢 Our Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Values</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-700">
          {[
            { title: "Integrity", desc: "We value transparency and honesty with our users and partners." },
            { title: "Innovation", desc: "We constantly evolve to offer cutting-edge tech and experiences." },
            { title: "Customer First", desc: "You are at the heart of everything we do." },
            { title: "Sustainability", desc: "We care about the environment and responsible sourcing." },
            { title: "Collaboration", desc: "Together, we achieve more—teamwork drives our success." },
            { title: "Quality", desc: "We deliver only the best—carefully curated and tested." },
          ].map((value, i) => (
            <div key={i} className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
              <h4 className="font-semibold text-xl mb-2">{value.title}</h4>
              <p className="text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔵 Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Meet Our Team</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {[
            {
              name: "Pushpa Sharma",
              role: "Product Designer",
              image: "https://cdn-icons-png.flaticon.com/512/924/924915.png",
            },
            {
              name: "Surya Kumar",
              role: "Full Stack Developer",
              image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            },
            {
              name: "Nisha Roy",
              role: "Marketing Head",
              image: "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
            },
          ].map((member, i) => (
            <div key={i} className="flex flex-col items-center text-center w-40">
              <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full shadow-md mb-2" />
              <h4 className="font-semibold">{member.name}</h4>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🟣 CTA */}
      <div className="text-center bg-white py-10 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-2 text-gray-800">Want to work with us?</h3>
        <p className="text-gray-600 mb-4">We're always looking for passionate minds to join our team.</p>
        <a
          href="/contact"
          className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Contact Us
        </a>
      </div>
    </motion.div>
  );
};

export default About;
