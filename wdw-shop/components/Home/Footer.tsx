import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <nav className="text-po-1z mt-30">
      {/* Define grid system */}
      <div className="w-4/5 border-b-[1.2px] pb-8 border-b-slate-500 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* First part */}
        <div>
          <h1 className="text-[25px] uppercase font-semibold text-black mb-4">
            WDW Shop
          </h1>
          <p className="text-sm text-black opacity-60">
            WDW Shop is a leading online shopping company in Singapore,
            Malaysia, Thailand, Taiwan, Indonesia, Vietnam and the Philippines.
            In 2025, it expanded its e-commerce services to Brazil.
          </p>
          <p className="text-base mt-6 text-black opacity-80">
            wdwshop@gmail.com
          </p>
        </div>

        {/* 2nd part */}
        <div className="lg:mx-auto">
          <h1 className="footer__title">Information</h1>
          <p className="footer__link">About us</p>
          <p className="footer__link">Privacy Policy</p>
          <p className="footer__link">Return Policy</p>
          <p className="footer__link">Dropshipping</p>
          <p className="footer__link">Shipping Policy</p>
        </div>

        <div className="lg:mx-auto">
          <h1 className="footer__title">Account</h1>
          <p className="footer__link">Dashboard</p>
          <p className="footer__link">My Orders</p>
          <p className="footer__link">Account Details</p>
          <p className="footer__link">Track Orders</p>
        </div>

        <div className="lg:mx-auto">
          <h1 className="footer__title">Shop</h1>
          <p className="footer__link">Affiliate</p>
          <p className="footer__link">Best Sellers</p>
          <p className="footer__link">Latest Products</p>
          <p className="footer__link">Sale Products</p>
        </div>
      </div>

      {/* Copyright section with extra spacing below */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 justify-between w-4/5 mx-auto mb-12">
        {" "}
        {/* Adicionei mb-12 para espaço extra abaixo */}
        <p className="text-sm text-black opacity-60">
          © Copyright Josias Broch 2025
        </p>
        <Image
          src="/images/pay.svg"
          alt="Accepted payment methods"
          width={230}
          height={36}
          className="object-contain sm:ml-auto"
        />
      </div>
    </nav>
  );
};

export default Footer;
