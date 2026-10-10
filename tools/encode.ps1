# Two-pass H.264 encodes sized to land under ~23 MB each (Cloudflare caps files at 25 MiB).
$ErrorActionPreference = 'Stop'
$bin = "C:\Users\jsalb\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin"
$ff = "$bin\ffmpeg.exe"; $fp = "$bin\ffprobe.exe"
$src = "C:\Users\jsalb\OneDrive\Desktop\Albright Innovations\Matt Lyons\Timeless Trailers\03 Media\Tempte Website Content"
$out = "C:\Users\jsalb\OneDrive\Documents\GitHub\timeless-trailers\site\video"
$tmp = "$env:LOCALAPPDATA\Temp\claude\C--Users-jsalb-OneDrive-Documents-GitHub-Albright-Innovations\fb98677d-7a2f-44ef-85d6-6a27ba3b32b5\scratchpad\enc"
New-Item -ItemType Directory -Force $out, $tmp | Out-Null

$jobs = @(
  @{ in = 'Split Tilt Walk-Around Video.mp4'; out = 'split-tilt-walkaround'; h = 540; ab = 64;  ac = 1; targetMB = 23; cap = 1800 },
  @{ in = 'Gooseneck Launch Video.mp4';       out = 'gooseneck-launch';      h = 720; ab = 96;  ac = 2; targetMB = 20; cap = 2600 },
  @{ in = 'Ramped Trailer Launch Video.mp4';  out = 'ez-load-launch';        h = 720; ab = 96;  ac = 2; targetMB = 20; cap = 2600 },
  @{ in = '1026-LaunchVideo.mp4';             out = '1026-launch';           h = 720; ab = 96;  ac = 2; targetMB = 20; cap = 2600 },
  @{ in = 'Timpte Torsion Trailer.mp4';       out = 'torsion-axle';          h = 720; ab = 96;  ac = 2; targetMB = 14; cap = 1800 }
)

foreach ($j in $jobs) {
  $in = Join-Path $src $j.in
  $dur = [double](& $fp -v error -show_entries format=duration -of csv=p=0 $in)
  $vk = [int][math]::Min($j.cap, ($j.targetMB * 8192 / $dur) - $j.ab)
  $dst = Join-Path $out ($j.out + '.mp4')
  $log = Join-Path $tmp $j.out
  $vf = "scale=-2:$($j.h):flags=lanczos,fps=30,format=yuv420p"
  Write-Output ("{0}: {1:N0}s -> {2}p at {3}k video" -f $j.out, $dur, $j.h, $vk)
  & $ff -hide_banner -loglevel error -y -i $in -vf $vf -c:v libx264 -preset slow -profile:v high -b:v "${vk}k" -pass 1 -passlogfile $log -an -f mp4 NUL
  & $ff -hide_banner -loglevel error -y -i $in -vf $vf -c:v libx264 -preset slow -profile:v high -b:v "${vk}k" -maxrate "$([int]($vk*1.5))k" -bufsize "$([int]($vk*2))k" -pass 2 -passlogfile $log -c:a aac -b:a "$($j.ab)k" -ac $j.ac -movflags +faststart $dst
  # poster frame about a third of the way in
  & $ff -hide_banner -loglevel error -y -ss ([math]::Round($dur/3,1)) -i $in -frames:v 1 -vf "scale=-2:720:flags=lanczos" -c:v libwebp -quality 78 (Join-Path $out ($j.out + '.webp'))
  $mb = [math]::Round((Get-Item $dst).Length/1MB,1)
  Write-Output ("   done: {0} MB" -f $mb)
}
Write-Output 'ALL DONE'
