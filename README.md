
MolProp Electron (fixed repo) - ready to push
============================================

This repository is prepared to build a Windows Electron app with a bundled backend exe.

How to use:
1. Unzip and push this repo to GitHub (main branch).
2. Go to Actions -> run 'Build Electron EXE (Windows) - fixed CI' workflow.
3. Wait for the workflow to finish, then download Artifacts -> MolPropElectron.
4. Extract the artifact and run the produced .exe (inside electron_app/dist).

Notes:
- The workflow builds the backend into molecule_api_full.exe using PyInstaller and then packages the Electron app.
- If you want to test locally, install Node.js and npm, then in electron_app run `npm install` and `npm run start`.
