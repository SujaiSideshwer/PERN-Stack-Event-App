import jsPDF from "jspdf";

export function generateTicket(booking) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("🎟 Event Booking Ticket", 20, 20);
  doc.setFontSize(12);
  doc.text(`Booking ID: ${booking.id}`, 20, 40);
  doc.text(`Event ID: ${booking.event_id}`, 20, 50);
  doc.text(`Seats: ${booking.seat_numbers.join(", ")}`, 20, 60);
  doc.text(`Status: ${booking.status}`, 20, 70);
  doc.save(`ticket-${booking.id}.pdf`);
}
