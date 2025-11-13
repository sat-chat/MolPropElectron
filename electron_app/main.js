
const { app, BrowserWindow } = require('electron')
const path = require('path')
const { spawn } = require('child_process')

let backendProc = null
function startBackend(){
  const backendPath = path.join(__dirname, '..', 'molecule_api_full.exe')
  const pyPath = path.join(__dirname, '..', 'molecule_api_full.py')
  try{
    if (require('fs').existsSync(backendPath)) {
      backendProc = spawn(backendPath, [], { cwd: path.join(__dirname, '..') })
    } else {
      // fallback to python script if exe not present (requires Python)
      backendProc = spawn('python', [pyPath], { cwd: path.join(__dirname, '..') })
    }
    backendProc.stdout.on('data', d=> console.log('[backend]', d.toString()))
    backendProc.stderr.on('data', d=> console.error('[backend]', d.toString()))
  }catch(e){
    console.error('Failed to start backend', e)
  }
}

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: { nodeIntegration: false, contextIsolation: true }
  })
  const indexHtml = path.join(__dirname, '..', 'react_frontend', 'dist', 'index.html')
  win.loadFile(indexHtml)
}

app.whenReady().then(()=>{
  startBackend()
  createWindow()
  app.on('activate', ()=>{ if (BrowserWindow.getAllWindows().length === 0) createWindow() })
})

app.on('window-all-closed', ()=>{
  if (backendProc) backendProc.kill()
  if (process.platform !== 'darwin') app.quit()
})
