'use client'

import './Footer.css'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { JSX, useState } from 'react'

interface FooterProps {
  data: any
}

export default function Footer({ data }: FooterProps) {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <footer id="contact" className="footer">
      <div className="footer-unified-section">
        <div className="footer-unified-container">
          {/* Contact Form Section */}
          <div className="footer-contact-container">
            <motion.div
              className="footer-contact-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="footer-contact-title">
                {data.contactSection?.title?.split('\\n').map((line: string, i: number) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                )) || "Let's Build Something Bold And Better"}
              </h2>
              <p className="footer-contact-subtitle">{data.contactSection?.subtitle || ''}</p>
            </motion.div>

            <motion.div
              className="footer-contact-right"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="footer-form-title">
                {data.contactSection?.formTitle || 'Start The Conversation'}
              </h3>
              <form className="footer-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="footer-input"
                  required
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="footer-input"
                  required
                />
                <div className="footer-input-row">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="footer-input footer-input-half"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="footer-input footer-input-half"
                    required
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="footer-textarea"
                  rows={4}
                  required
                />
                <button type="submit" className="footer-submit-btn">
                  Submit
                </button>
              </form>
            </motion.div>
          </div>

          {/* Footer Info Section */}
          <motion.div
            className="footer-info-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="footer-info-content">
              <div className="footer-brand-section">
                <h1 className="footer-brand-name">
                  {data.companyInfo?.brandName && (
                    <>
                      {data.companyInfo.brandName.split('bold')[0]}
                      <span className="footer-brand-bold">bold</span>
                      <span className="footer-brand-dot">.</span>{' '}
                      {data.companyInfo.advertising && (
                        <span className="footer-brand-advertising">
                          {data.companyInfo.advertising}
                        </span>
                      )}
                    </>
                  )}
                </h1>
                <h1 className="footer-brand-tagline">{data.companyInfo?.tagline}</h1>
              </div>

              <div className="footer-contact-info">
                <div className="footer-info-item">
                  <svg
                    className="footer-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z"
                      fill="currentColor"
                    />
                    <path
                      d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a1 1 0 0 0-.086-1.391l-4.064-3.696z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{data.companyInfo?.phone || '+91 79902 34633'}</span>
                </div>

                <div className="footer-info-item">
                  <svg
                    className="footer-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{data.companyInfo?.email || 'cleanboldadvertising@gmail.com'}</span>
                </div>

                <div className="footer-info-item">
                  <svg
                    className="footer-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{data.companyInfo?.location || 'Ahmedabad, India'}</span>
                </div>
              </div>
            </div>

            <div className="footer-bottom-section">
              <p className="footer-copyright">
                {data.copyright || '© 2025 Cleanbold Advertising. All Rights Reserved.'}
              </p>
              <div className="footer-social-links">
                {data.socialLinks?.map((link: any, index: number) => {
                  const getSocialIcon = (platform: string) => {
                    const icons: { [key: string]: JSX.Element } = {
                      linkedin: (
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      ),
                      facebook: (
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      ),
                      instagram: (
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                      ),
                      twitter: (
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      ),
                    }
                    return icons[platform.toLowerCase()] || null
                  }

                  return (
                    <Link
                      key={index}
                      href={link.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-link"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {getSocialIcon(link.platform)}
                      </svg>
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
