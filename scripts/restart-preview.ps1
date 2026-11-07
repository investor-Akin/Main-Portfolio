$ErrorActionPreference = "Stop"
$conn = Get-NetTCPConnection -LocalPort 4000 -State Listen -ErrorAction SilentlyContinue
if ($conn) {
  $pidToStop = $conn[0].OwningProcess
  Write-Output ("STOPPING {0}" -f $pidToStop)
  Stop-Process -Id $pidToStop -Force
  Start-Sleep -Seconds 2
}
Start-Process -FilePath "node" -ArgumentList "scripts/serve-out.mjs" -WindowStyle Hidden
Start-Sleep -Seconds 3
$r = Invoke-WebRequest -Uri "http://localhost:4000/akin-cv.pdf" -Method Head -UseBasicParsing
Write-Output ("STATUS {0} TYPE {1} LEN {2}" -f $r.StatusCode, $r.Headers['Content-Type'], $r.Headers['Content-Length'])
