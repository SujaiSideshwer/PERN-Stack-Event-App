//schema name is public. hence we are giving public.____ for the tables in these queries:

export const getAllEventsQuery = `SELECT * FROM public.events
ORDER BY created_at DESC;`;

export const createEventQuery = `INSERT INTO public.events (
    "title",
    "description",
    "image",
    "date",
    "time",
    "location",
    "price",
    "total_seats",
    "available_seats",
    "organizer_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;

export const getEventQuery = `SELECT * FROM public.events WHERE id=$1;`;

export const updateEventQuery = `UPDATE public.events SET 
    "title"=$1,
    "description"=$2,
    "image"=$3,
    "date"=$4,
    "time"=$5,
    "location"=$6,
    "price"=$7,
    "total_seats"=$8,
    "available_seats"=$9,
    "organizer_id"=$10
    WHERE id=$11
    RETURNING *`;

export const deleteEventQuery = `DELETE FROM public.events WHERE id=$1 RETURNING *;`;

export const bookEventQuery = `INSERT INTO public.bookings(user_id, event_id, seat_numbers, status) VALUES ($1, $2, $3, $4) RETURNING *`;

export const cancelEventQuery = `DELETE FROM public.bookings WHERE id=$1 RETURNING *;`;

export const getAllBookingsQuery = `SELECT * FROM public.bookings
ORDER BY created_at DESC;`;

export const getUserBookingsQuery = `SELECT * FROM public.bookings WHERE user_id=$1
ORDER BY created_at DESC;`;
