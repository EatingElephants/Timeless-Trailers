# Hero montage: about a minute of real loading footage from Timpte's videos, silent, 1080p, crossfaded.
# Rule (Oct 20): the TRAILER must be clearly in every scene. Trailers sit low in the frame, under the headline,
# so clips where the trailer is only a ramp in the corner are out.
# Scenes (source, start, length):
#   1  Corvette on the EZ Load deck, wide shot                 Motorsports & Powerhouse video, 39.6s, 9.5s
#   2  '55 Chevy on a 10K EZ Load                               product reel, 15.0s, 4.5s  (caption band cropped off, slow pan)
#   3  Porsche on a 7K EZ Load, side view                       product reel, 233.5s, 4.5s (same treatment)
#   4  UTV driving up                                           UTV video, 8s, 10s
#   5  Skid steer onto the split tilt                           walk-around, 30s, 14s
#   6  Telehandler onto the split tilt                          walk-around, 178s, 13s
#   7  Gooseneck mega ramps                                     gooseneck video, 45s, 10s
# Re-run after changing the numbers below. Total about 61 seconds.
$bin = "C:\Users\jsalb\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin"
$src = "C:\Users\jsalb\OneDrive\Desktop\Albright Innovations\Matt Lyons\Timeless Trailers\03 Media\Tempte Website Content"
$out = Join-Path (Split-Path $PSScriptRoot -Parent) "site\video"
$mp = "$src\Timpte  Motorsports & Powerhouse Trailers.mp4"; $reel = "$src\TimpteEquipmentTrailers-ProductLine.mp4"
$utv = "$src\UTV-30sec-4K.mp4"; $st = "$src\Split Tilt Walk-Around Video.mp4"; $gn = "$src\Gooseneck Launch Video.mp4"
$f = 0.8
# lengths 9.5, 4.5, 4.5, 10, 14, 13, 10. Each xfade offset = previous offset + previous length - fade.
$sc = "scale=-2:1080:flags=lanczos,fps=30,setsar=1"
# product-reel stills: cut the caption band off the bottom, enlarge a little, and pan slowly left to right
$still = "crop=1920:900:0:0,scale=-2:1200:flags=lanczos,crop=1920:1080:'(iw-1920)*t/4.5':'(ih-1080)/2',fps=30,setsar=1"
$fc = "[0:v]$sc[a];[1:v]$still[b];[2:v]$still[c];[3:v]$sc[d];[4:v]$sc[e];[5:v]$sc[g];[6:v]$sc[h];" +
      "[a][b]xfade=transition=fade:duration=${f}:offset=8.7[ab];" +
      "[ab][c]xfade=transition=fade:duration=${f}:offset=12.4[abc];" +
      "[abc][d]xfade=transition=fade:duration=${f}:offset=16.1[abcd];" +
      "[abcd][e]xfade=transition=fade:duration=${f}:offset=25.3[abcde];" +
      "[abcde][g]xfade=transition=fade:duration=${f}:offset=38.5[abcdeg];" +
      "[abcdeg][h]xfade=transition=fade:duration=${f}:offset=50.7,fade=t=in:st=0:d=0.5,fade=t=out:st=60.1:d=0.6,format=yuv420p[v]"
& "$bin\ffmpeg.exe" -hide_banner -loglevel error -y `
  -ss 39.6 -t 9.5 -i $mp `
  -ss 15 -t 4.5 -i $reel `
  -ss 233.5 -t 4.5 -i $reel `
  -ss 8 -t 10 -i $utv `
  -ss 30 -t 14 -i $st `
  -ss 178 -t 13 -i $st `
  -ss 45 -t 10 -i $gn `
  -filter_complex $fc -map "[v]" -an -c:v libx264 -preset slow -profile:v high -crf 27 -maxrate 3200k -bufsize 6400k -movflags +faststart "$out\hero-full.mp4"
# poster (shown before the video loads): the Corvette on the deck
& "$bin\ffmpeg.exe" -hide_banner -loglevel error -y -ss 45 -i $mp -frames:v 1 -vf "scale=-2:1080:flags=lanczos" -c:v libwebp -quality 80 "$out\hero-full.webp"
Get-Item "$out\hero-full.mp4" | ForEach-Object { "hero-full.mp4: {0:N1} MB" -f ($_.Length/1MB) }
& "$bin\ffprobe.exe" -v error -show_entries format=duration -of csv=p=0 "$out\hero-full.mp4"
