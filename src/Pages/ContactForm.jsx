import React from 'react'
import Breadcrumb from '../Common/Breadcrumb'
import Contact from '../Components/Contact'

const ContactForm = () => {
  return (
    <div>
         <Breadcrumb
        pageName="Contact Page"
        description=""
      />

      <Contact />
    </div>
  )
}

export default ContactForm