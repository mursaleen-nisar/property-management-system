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
        subject: `New Room Booking: ${bookingDetails.roomName.roomName}`,
        html: `
          <h2>New Room Booking</h2>
          <p>Dear ${bookingDetails.travelAgent.personalName},</p>
          <p>You have a new room booking. Please review the booking details below:</p>
          <h3>Booking Details:</h3>
          <ul>
            <li><strong>Room Category:</strong> ${bookingDetails.roomCategory}</li>
            <li><strong>Room Name:</strong> ${bookingDetails.roomName.roomName}</li>
            <li><strong>Guest Name:</strong> ${bookingDetails.guestName}</li>
            <li><strong>Check-in Date:</strong> ${bookingDetails.checkinDate}</li>
            <li><strong>Check-out Date:</strong> ${bookingDetails.checkoutDate}</li>
            <li><strong>Booked by:</strong> ${bookedBy}</li>
            <li><strong>Assigned to:</strong> ${bookingDetails.travelAgent.personalName}</li>
          </ul>
          <p>Please take the necessary actions to prepare for the guest's arrival.</p>
          <p>Best regards,<br/>Hotel Management Team</p>
        `,
    };
    // send email with voucher

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', agentEmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Helper function to send cancellation email
export const sendCancellationEmail = async (agentEmail, bookingDetails, cancellationReason) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: agentEmail,
    subject: `Booking Cancelled for Room: ${bookingDetails.roomName.roomName}`,
    html: `
      <h2>Booking Cancellation</h2>
      <p>Dear ${bookingDetails.travelAgent.personalName},</p>
      <p>The booking for the room has been cancelled.</p>
      <h3>Booking Details:</h3>
      <ul>
        <li><strong>Room Category:</strong> ${bookingDetails.roomCategory}</li>
        <li><strong>Room Name:</strong> ${bookingDetails.roomName.roomName}</li>
        <li><strong>Guest Name:</strong> ${bookingDetails.guestName}</li>
        <li><strong>Check-in Date:</strong> ${bookingDetails.checkinDate}</li>
        <li><strong>Check-out Date:</strong> ${bookingDetails.checkoutDate}</li>
      </ul>
      <h3>Cancellation Reason:</h3>
      <p>${cancellationReason}</p>
      <p>Best regards,<br/>Hotel Management Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Cancellation email sent successfully to the travel agent.');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send cancellation email.');
  }
};