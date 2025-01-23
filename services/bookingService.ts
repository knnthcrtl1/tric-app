import { supabase } from "../configs/supabaseConfig";

async function handleBooking(userId: any, serviceId: any, bookingDate: any) {
  // Step 1: Check if the user already has a booking for the same service on the same date
  const { data, error } = await supabase
    .from("tbl_bookings")
    .select("*")
    .eq("user_id", userId)
    .eq("booking_date", bookingDate)
    .single(); // Using single() to get a single row if it exists

  if (error) {
    console.error("Error checking booking:", error);
    return;
  }

  if (data) {
    // Step 2: If a booking exists, increment the booking count
    const { error: updateError } = await supabase
      .from("tbl_bookings")
      .update({ booking_count: data.booking_count + 1 })
      .eq("id", data.id); // Update the specific booking

    if (updateError) {
      console.error("Error updating booking:", updateError);
    } else {
      console.log("Booking count incremented");
    }
  } else {
    // Step 3: If no booking exists, create a new booking
    const { error: insertError } = await supabase.from("tbl_bookings").insert([
      {
        user_id: userId,
        service_id: serviceId,
        booking_date: bookingDate,
        booking_count: 1, // New booking starts with count 1
      },
    ]);

    if (insertError) {
      console.error("Error inserting booking:", insertError);
    } else {
      console.log("New booking created");
    }
  }
}
