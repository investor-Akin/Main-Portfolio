$url = "https://akinfolio.vercel.app/"
for ($i = 1; $i -le 40; $i++) {
  try {
    $html = (Invoke-WebRequest -Uri $url -UseBasicParsing -Headers @{ "Cache-Control" = "no-cache" }).Content
    $hasBar = $html -match "scaleX\(0\)"
    Write-Output ("LILY_PROGRESS " + (@{ percent = [math]::Min(95, $i * 3); message = ("hasGsapBar=" + $hasBar) } | ConvertTo-Json -Compress))
    if ($hasBar) { Write-Output "DEPLOYED-WITH-GSAP"; break }
  } catch {
    Write-Output ("FETCH-ERR " + $_.Exception.Message)
  }
  Start-Sleep -Seconds 8
}
