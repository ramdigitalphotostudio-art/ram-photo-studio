# FFmpeg Installation & Video Compression Guide

## Quick Installation (Recommended - Using Chocolatey)

### Option 1: Install via Chocolatey (Easiest)

1. **Open PowerShell as Administrator** (Right-click Start → Windows PowerShell (Admin))

2. **Install Chocolatey** (if not already installed):
   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

3. **Install FFmpeg**:
   ```powershell
   choco install ffmpeg -y
   ```

4. **Restart your terminal** and verify:
   ```powershell
   ffmpeg -version
   ```

---

### Option 2: Manual Installation

1. **Download FFmpeg**:
   - Go to: https://www.gyan.dev/ffmpeg/builds/
   - Download: `ffmpeg-release-essentials.zip`

2. **Extract the ZIP file**:
   - Extract to: `C:\ffmpeg`
   - You should have: `C:\ffmpeg\bin\ffmpeg.exe`

3. **Add to System PATH**:
   - Press `Win + X` → System
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", find "Path" → Click "Edit"
   - Click "New" → Add: `C:\ffmpeg\bin`
   - Click "OK" on all dialogs

4. **Restart your terminal** and verify:
   ```powershell
   ffmpeg -version
   ```

---

## How to Use the Compression Script

After installing FFmpeg, use the `compress-video.bat` script I created:

### Method 1: Drag and Drop (Easiest)
1. Drag your large video file onto `compress-video.bat`
2. Wait for compression to complete
3. Find the compressed video in the same folder with `_compressed` suffix

### Method 2: Command Line
```bash
compress-video.bat "path\to\your\video.mp4"
```

---

## Manual Compression Commands

If you prefer to run commands manually:

### Basic Compression (Good Quality, ~70% size reduction)
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k output.mp4
```

### Aggressive Compression (Smaller file, ~80% reduction)
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 32 -preset slow -c:a aac -b:a 96k output.mp4
```

### With Resolution Reduction (1080p → 720p)
```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k output.mp4
```

---

## Understanding the Parameters

- **`-crf`**: Quality (0-51, lower = better quality, 23-28 recommended for web)
- **`-preset`**: Encoding speed (slow = better compression, fast = quicker but larger)
- **`-b:a`**: Audio bitrate (128k is good, 96k for smaller files)
- **`-vf scale`**: Resize video (e.g., 1280:720 for 720p)

---

## Troubleshooting

**Error: "ffmpeg is not recognized"**
- FFmpeg is not in your PATH
- Restart your terminal after installation
- Or use full path: `C:\ffmpeg\bin\ffmpeg.exe`

**Video quality is poor**
- Lower the CRF value (try 23-25)
- Use `-preset slower` for better quality

**File is still too large**
- Increase CRF value (try 30-32)
- Reduce resolution with `-vf scale=1280:720`
- Reduce audio bitrate to 96k or 64k
