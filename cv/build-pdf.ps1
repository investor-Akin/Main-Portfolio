$chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
$root = "C:\Users\USER\Desktop\My Works\Main Portfolio"
$src = "file:///C:/Users/USER/Desktop/My%20Works/Main%20Portfolio/cv/cv.html"
$out = Join-Path $root "public\akin-cv.pdf"

if (Test-Path $out) { Remove-Item $out -Force }

# One quoted argument string: Start-Process re-splits an array on spaces, and
# both paths here contain spaces.
$argString = '--headless=new --disable-gpu --no-sandbox --no-pdf-header-footer ' +
  '--virtual-time-budget=10000 ' +
  ('--print-to-pdf="{0}" ' -f $out) +
  ('"{0}"' -f $src)

Start-Process -FilePath $chrome -ArgumentList $argString -Wait -NoNewWindow

if (Test-Path $out) {
  $f = Get-Item $out
  Write-Output ("WROTE {0} bytes -> {1}" -f $f.Length, $f.FullName)
  # Latin1 keeps every byte readable as one char, which is all the /Page scan
  # needs. Encoding.Latin1 does not exist on PowerShell 5.1, hence the codepage.
  $bytes = [System.IO.File]::ReadAllText($out, [System.Text.Encoding]::GetEncoding(28591))
  $pages = ([regex]::Matches($bytes, "/Type\s*/Page[^s]")).Count
  Write-Output ("PAGES {0}" -f $pages)
} else {
  Write-Output "FAILED: no pdf produced"
}
