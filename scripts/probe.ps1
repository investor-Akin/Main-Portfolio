Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms
$f = New-Object System.Drawing.Font("Segoe UI", 88, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$probe = New-Object System.Drawing.Size(4000, 400)
$flags = [System.Windows.Forms.TextFormatFlags]::NoPadding
$b = [System.Windows.Forms.TextRenderer]::MeasureText("Builds", $f, $probe, $flags).Width
$bb = [System.Windows.Forms.TextRenderer]::MeasureText("Brands", $f, $probe, $flags).Width
$b2 = [System.Windows.Forms.TextRenderer]::MeasureText("B B", $f, $probe, $flags).Width
$b1 = [System.Windows.Forms.TextRenderer]::MeasureText("BB", $f, $probe, $flags).Width
$g = [System.Drawing.Graphics]::FromImage((New-Object System.Drawing.Bitmap 10, 10))
$fmt = New-Object System.Drawing.StringFormat
$fmt.FormatFlags = [System.Drawing.StringFormatFlags]"MeasureTrailingSpaces, Typographic"
$m1 = $g.MeasureString("Builds", $f, [int]::MaxValue, $fmt).Width
$m2 = $g.MeasureString("Builds ", $f, [int]::MaxValue, $fmt).Width
"TR builds=$b brands=$bb space=$($b2-$b1)"
"GDI+ builds=$m1 withspace=$m2 space=$($m2-$m1)"
