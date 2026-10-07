CHM Network native contact submission fix

- Removed the AJAX/fetch code that could stay stuck on Sending.
- Contact form now uses a direct native POST to FormSubmit.
- Added a confirmation page: thank-you.html.
- Added automatic reply text for the sender.
- Messages are directed to yodebepro@gmail.com.
- The rest of the approved baseline remains unchanged.
- FormSubmit requires a one-time activation confirmation in yodebepro@gmail.com if it has not already been activated.
