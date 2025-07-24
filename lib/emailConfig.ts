// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create an account
// 2. Create a new service (Gmail recommended)
// 3. Create an email template with the following variables:
//    - {{customer_name}}
//    - {{customer_email}} 
//    - {{customer_phone}}
//    - {{cart_items}}
//    - {{total_amount}}
//    - {{booking_date}}
// 4. Get your Public Key, Service ID, and Template ID
// 5. Replace the values below

export const emailConfig = {
  publicKey: 'O9TCBSLnCgPhshiSD', // Replace with your EmailJS public key
  serviceId: 'service_51puaib', // Replace with your EmailJS service ID  
  
  // Admin notification template (sent to business)
  adminTemplateId: 'template_yctnktu', // Replace with your EmailJS template ID for admin notifications
  toEmail: 'info@hikeinhimalaya.com', // Email address to receive booking requests
  
  // Customer confirmation template (sent to customer)
  customerTemplateId: 'template_ndbhcue', // Replace with your customer confirmation template ID
}

// Sample EmailJS templates:

// 1. Admin Notification Template (template_yctnktu)
/*
Subject: New Booking Request - {{customer_name}}

Hello,

You have received a new booking request from HikeinHimalaya website:

Customer Details:
- Name: {{customer_name}}
- Email: {{customer_email}}
- Phone: {{customer_phone}}
- Booking Date: {{booking_date}}

Booking Details:
{{cart_items}}

Total Amount: {{total_amount}}

Please contact the customer to confirm their booking.

Best regards,
HikeinHimalaya Website
*/

// 2. Customer Confirmation Template (template_customer_confirmation)
/*
Subject: Booking Request Confirmation - HikeinHimalaya

Dear {{customer_name}},

Thank you for your booking request with HikeinHimalaya! We have received your request and our team will contact you shortly to confirm your adventure.

Your Booking Details:
{{cart_items}}

Total Amount: {{total_amount}}
Booking Date: {{booking_date}}

What happens next?
1. Our team will review your booking request
2. We will contact you within 24 hours at {{customer_email}} or {{customer_phone}}
3. We'll discuss trek details, preparation requirements, and payment options
4. Once confirmed, you'll receive detailed trek information and preparation guidelines

Important Information:
- Please ensure you meet our fitness and eligibility criteria
- Review our cancellation policy on our website
- For urgent queries, call us at +91 98052 03783

We're excited to help you experience the majestic Himalayas!

Best regards,
The HikeinHimalaya Team

Website: www.hikeinhimalaya.com
Email: info@hikeinhimalaya.com
Phone: +91 98052 03783
*/
