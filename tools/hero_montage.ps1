# Hero montage: about a minute of real loading footage from Timpte's videos, silent, 1080p, crossfaded.
# Order (Matt's request, Oct 13): a car rolling OFF the trailer first, then the side-by-side driving up.
# Segments (start, length): Corvette rear wheels down the ramp, Corvette wide shot rolling off the deck,
# UTV drive-on, skid steer onto the split tilt, telehandler onto the split tilt, gooseneck mega ramps.
# Re-run after changing the numbers below. Total about 62 seconds.
$bin = "C:\Users\jsalb\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin"
$src = "C:\Users\jsalb\OneDrive\Desktop\Albright Innovations\Matt Lyons\Timeless Trailers\03 Media\Tempte Website Content"
$out = Join-Path (Split-Path $PSScriptRoot -Parent) "site\video"
$mp = "$src\Timpte  Motorsports & Powerhouse Trailers.mp4"; $utv = "$src\UTV-30sec-4K.mp4"; $st = "$src\Split Tilt Walk-Around Video.mp4"; $gn = "$src\Gooseneck Launch Video.mp4"
$f = 0.8
# segment lengths: 10, 9.5, 10, 14, 13, 10. Each xfade offset = previous offset + previous length - fade.
$sc = "scale=-2:1080:flags=lanczos,fps=30,setsar=1"
$fc = "[0:v]$sc[a];[1:v]$sc[b];[2:v]$sc[c];[3:v]$sc[d];[4:v]$sc[e];[5:v]$sc[g];" +
      "[a][b]xfade=transition=fade:duration=${f}:offset=9.2[ab];" +
      "[ab][c]xfade=transition=fade:duration=${f}:offset=17.9[abc];" +
      "[abc][d]xfade=transition=fade:duration=${f}:offset=27.1[abcd];" +
      "[abcd][e]xfade=transition=fade:duration=${f}:offset=40.3[abcde];" +
      "[abcde][g]xfade=transition=fade:duration=${f}:offset=52.5,fade=t=in:st=0:d=0.5,fade=t=out:st=61.9:d=0.6,format=yuv420p[v]"
& "$bin\ffmpeg.exe" -hide_banner -loglevel error -y `
  -ss 26 -t 10 -i $mp `
  -ss 39.6 -t 9.5 -i $mp `
  -ss 8 -t 10 -i $utv `
  -ss 30 -t 14 -i $st `
  -ss 178 -t 13 -i $st `
  -ss 45 -t 10 -i $gn `
  -filter_complex $fc -map "[v]" -an -c:v libx264 -preset slow -profile:v high -crf 27 -maxrate 3200k -bufsize 6400k -movflags +faststart "$out\hero-full.mp4"
# poster (shown before the video loads): the Corvette coming off the deck
& "$bin\ffmpeg.exe" -hide_banner -loglevel error -y -ss 45 -i $mp -frames:v 1 -vf "scale=-2:1080:flags=lanczos" -c:v libwebp -quality 80 "$out\hero-full.webp"
Get-Item "$out\hero-full.mp4" | ForEach-Object { "hero-full.mp4: {0:N1} MB" -f ($_.Length/1MB) }
& "$bin\ffprobe.exe" -v error -show_entries format=duration -of csv=p=0 "$out\hero-full.mp4"
