CHM Network Single-File Admin Fix

This package avoids using an /admin/ folder.

Upload the extracted files directly into the ROOT of your GitHub repository.

Files included:
- index.html
- admin.html
- login.html
- 404.html
- CNAME
- .nojekyll

Test these after GitHub Pages finishes rebuilding:
1. https://chmnetwork.com/
2. https://chmnetwork.com/index.html?admin=1
3. https://chmnetwork.com/admin.html
4. https://chmnetwork.com/login.html
5. https://chmnetwork.com/admin

Important:
- Do NOT upload the ZIP itself.
- Extract the ZIP first.
- Upload the files inside directly to GitHub root.
- No admin folder is required in this version.
- For /admin without .html, GitHub must have 404.html in root so it can redirect to index.html?admin=1.
