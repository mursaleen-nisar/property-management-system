import nodemailer from 'nodemailer';

// Configure the transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

// Helper function to send email
export const sendEmailToAgent = async (agentEmail, bookingDetails, bookedBy) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: agentEmail,
        subject: 'New Room Booking Confirmation',
        text: `Hello,

You have a new room booking:

Room Category: ${bookingDetails.roomCategory}
Room Name: ${bookingDetails.roomName}
Guest Name: ${bookingDetails.guestName}
Check-in Date: ${bookingDetails.checkinDate}
Check-out Date: ${bookingDetails.checkoutDate}
Booked by: ${bookedBy}
Assigned to: ${bookingDetails.travelAgent}

Please take the necessary actions.

Thank you!`,
    };
    // send email with voucher

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', agentEmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};