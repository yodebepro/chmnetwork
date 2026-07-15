CHM Network contact form success fix

- Built from CHMNETWORK_NEW_BASELINE_STORE_MENUS_RESTORED.zip.
- Everything else in the approved baseline is preserved.
- Added a 15-second timeout so the button can no longer remain stuck on Sending.
- Added AJAX submission with response validation.
- Added a secure hidden-iframe fallback when browser CORS/privacy settings block AJAX.
- Added an on-page success/error status message.
- Contact messages are directed to yodebepro@gmail.com through FormSubmit.
- FormSubmit may require a one-time activation confirmation from the recipient email.
- No separate admin folder.
