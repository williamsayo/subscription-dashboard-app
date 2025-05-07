import React from 'react'

const Footer = () => {
  return (
      <footer className="py-5 text-sm text-gray-500 text-center bg-white border-t border-gray-100">
          <div className="container mx-auto">
              <span>
                  &copy; {new Date().getFullYear()} RemindPay. All rights
                  reserved.
              </span>
              <span className="mx-2">|</span>
              <a
                  href="mailto:support@remindpay.com"
                  className="underline hover:text-[#000] transition"
                  rel="noopener noreferrer"
              >
                  Contact
              </a>
          </div>
      </footer>
  );
}

export default Footer
