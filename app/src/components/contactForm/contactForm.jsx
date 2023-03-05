import React from 'react'
import './contactForm.css'

const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState('Send')
  const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')
    const { name, email, message } = e.target.elements
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
    console.log(conFom)
  }
  return (

      <form id="contactForm"onSubmit={onSubmit}>
          <input className="name-input" type="text" id="name" required placeholder='Enter Name'/>
          <input className="email-input" type="text" id="email" required placeholder='Enter Email' />
          <textarea className="message-input" id="message" required placeholder='Enter Message'/>
        <button className="contactButton" type="submit">{formStatus}</button>
      </form>
  )
}
export default ContactForm