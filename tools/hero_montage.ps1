# Hero montage: about a minute of real loading footage from three Timpte videos, silent, 1080p, crossfaded.
# Segments (start, length): UTV drive-on, skid steer onto the split tilt, telehandler onto the split tilt,
# gooseneck mega ramps, UTV drive-away. Re-run after changing the numbers below.
$bin = "C:\Users\jsalb\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin"
$src = "C:\Users\jsalb\OneDrive\Desktop\Albright Innovations\Matt Lyons\Timeless Trailers\03 Media\Tempte Website Content"
$out = Join-Path (Split-Path $PSScriptRoot -Parent) "site\video"
$utv = "$src\UTV-30sec-4K.mp4"; $st = "$src\Split Tilt Walk-Around Video.mp4"; $gn = "$src\Gooseneck Launch Video.mp4"
$f = 0.8
$sc = "scale=-2:1080:flags=lanczos,fps=30,setsar=1"
$fc = "[0:v]$sc[a];[1:v]$sc[b];[2:v]$sc[c];[3:v]$sc[d];[4:v]$sc[e];" +
      "[a][b]xfade=transition=fade:duration=${f}:offset=10.2[ab];" +
      "[ab][c]xfade=transition=fade:duration=${f}:offset=25.4[abc];" +
      "[abc][d]xfade=transition=fade:duration=${f}:offset=40.6[abcd];" +
      "[abcd][e]xfade=transition=fade:duration=${f}:offset=51.8,fade=t=in:st=0:d=0.5,fade=t=out:st=58.2:d=0.6,format=yuv420p[v]"
& "$bin\ffmpeg.exe" -hide_banner -loglevel error -y `
  -ss 8 -t 11 -i $utv `
  -ss 30 -t 16 -i $st `
  -ss 178 -t 16 -i $st `
  -ss 45 -t 12 -i $gn `
  -ss 30 -t 7 -i $utv `
  -filter_complex $fc -map "[v]" -an -c:v libx264 -preset slow -profile:v high -crf 27 -maxrate 3200k -bufsize 6400k -movflags +faststart "$out\hero-full.mp4"
& "$bin\ffmpeg.exe" -hide_banner -loglevel error -y -ss 14 -i $utv -frames:v 1 -vf "scale=-2:1080:flags=lanczos" -c:v libwebp -quality 80 "$out\hero-full.webp"
Get-Item "$out\hero-full.mp4" | ForEach-Object { "hero-full.mp4: {0:N1} MB" -f ($_.Length/1MB) }
& "$bin\ffprobe.exe" -v error -show_entries format=duration -of csv=p=0 "$out\hero-full.mp4"
