# Test the AFRUS admin portal locally

Local mode writes Decap changes directly to this workspace. GitHub, OAuth, and OVH are not required.

## Start the portal

Open two PowerShell terminals in the project directory.

Terminal 1:

```powershell
npm run dev
```

Terminal 2:

```powershell
npm run cms:local
```

Open `http://localhost:3000/admin/`. Decap should show **Working with local repository** and open without a GitHub login.

## Safe test procedure

1. Edit a low-risk text field and save it.
2. Confirm that the corresponding file under `src/content` changed.
3. Check English, French, and Russian on the public page.
4. Create a temporary draft record in a folder collection.
5. Test an image upload and relationship fields.
6. Delete only the temporary test record when finished.

Local CMS changes are real workspace edits. Keep backups or version control before testing deletion.
