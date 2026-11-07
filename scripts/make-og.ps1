# Generates public/og.png (1200x630) for link previews on WhatsApp, X, LinkedIn.
# Run: npm run og
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$portraitPath = Join-Path $root "public\akin.jpg"
$outPath = Join-Path $root "public\og.png"

if (-not (Test-Path $portraitPath)) {
  Write-Error "Missing portrait at public\akin.jpg"
  exit 1
}

$W = 1200
$H = 630

$ink = [System.Drawing.ColorTranslator]::FromHtml("#1e1d1b")
$cream = [System.Drawing.ColorTranslator]::FromHtml("#f6fbf7")
$orange = [System.Drawing.ColorTranslator]::FromHtml("#ff5821")
$muted = [System.Drawing.ColorTranslator]::FromHtml("#6b6b66")
$dot = [System.Drawing.ColorTranslator]::FromHtml("#c9430c")

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear($cream)

# Warm wash in the top-left corner, mirrors the site background
$washRect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
$washBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Point(0, 0)),
  (New-Object System.Drawing.Point($W, $H)),
  [System.Drawing.ColorTranslator]::FromHtml("#fdf3e7"),
  $cream
)
$g.FillRectangle($washBrush, $washRect)

$displayFont = New-Object System.Drawing.Font("Segoe UI", 88, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$wordFont = New-Object System.Drawing.Font("Segoe UI", 40, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$subFont = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$metaFont = New-Object System.Drawing.Font("Segoe UI", 22, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)

$inkBrush = New-Object System.Drawing.SolidBrush($ink)
$creamBrush = New-Object System.Drawing.SolidBrush($cream)
$orangeBrush = New-Object System.Drawing.SolidBrush($orange)
$mutedBrush = New-Object System.Drawing.SolidBrush($muted)
$dotBrush = New-Object System.Drawing.SolidBrush($dot)

# Typographic measurement, so text is placed edge to edge without GDI padding.
$fmtTypo = New-Object System.Drawing.StringFormat
$fmtTypo.FormatFlags = [System.Drawing.StringFormatFlags]::MeasureTrailingSpaces -bor [System.Drawing.StringFormatFlags]::NoWrap
$fmtTypo.Trimming = [System.Drawing.StringTrimming]::None

$left = 78

# Portrait: orange arc behind, then the photo clipped to a circle
$cx = 940
$cy = 300
$r = 205

$arcPen = New-Object System.Drawing.Pen($orange, 16)
$arcPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$arcPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$g.DrawArc($arcPen, [int]($cx - $r - 14), [int]($cy - $r - 14), [int](($r + 14) * 2), [int](($r + 14) * 2), 200, 200)

$clip = New-Object System.Drawing.Drawing2D.GraphicsPath
$clip.AddEllipse([int]($cx - $r), [int]($cy - $r), [int]($r * 2), [int]($r * 2))
$g.SetClip($clip)

$photo = [System.Drawing.Image]::FromFile($portraitPath)
# Cover-fit the square portrait into the circle
$g.DrawImage($photo, [int]($cx - $r), [int]($cy - $r), [int]($r * 2), [int]($r * 2))
$g.ResetClip()
$photo.Dispose()

# Cream ring around the portrait, like the hero
$ringPen = New-Object System.Drawing.Pen($cream, 12)
$g.DrawEllipse($ringPen, [int]($cx - $r - 6), [int]($cy - $r - 6), [int](($r + 6) * 2), [int](($r + 6) * 2))

# Wordmark
$g.DrawString("akin", $wordFont, $inkBrush, $left, 52, $fmtTypo)
$wordWidth = $g.MeasureString("akin", $wordFont, [int]::MaxValue, $fmtTypo).Width
$g.FillEllipse($orangeBrush, [int]($left + $wordWidth + 5), 80, 12, 12)

# Headline: "Builds" in orange, everything else ink, closing dot in orange
$g.DrawString("Design That", $displayFont, $inkBrush, ($left - 4), 168, $fmtTypo)
$builds = "Builds"
$rest = "Brands"
# Measure with GraphicsPath: it returns true rendered extents with no GDI+ padding,
# so measured width == drawn width and word spacing stays tight.
$pathW = {
    param($s)
    $p = New-Object System.Drawing.Drawing2D.GraphicsPath
    $p.AddString($s, $displayFont.FontFamily, [int]$displayFont.Style, $displayFont.Size, (New-Object System.Drawing.PointF(0, 0)), [System.Drawing.StringFormat]::GenericTypographic)
    $w = $p.GetBounds().Width
    $p.Dispose()
    $w
}
$buildsWidth = & $pathW $builds
# Distance from the start of "Builds Brands" to the start of "Brands".
$restX = $left - 4 + ((& $pathW "$builds $rest") - (& $pathW $rest))
$g.DrawString($builds, $displayFont, $orangeBrush, ($left - 4), 276, $fmtTypo)
$g.DrawString($rest, $displayFont, $inkBrush, $restX, 276, $fmtTypo)
# Closing dot drawn as a shape so its position does not depend on font bearings.
$g.FillEllipse($orangeBrush, [int]($restX + (& $pathW $rest) + 30), 342, 18, 18)

# Supporting line
$g.DrawString("Bold, strategic websites for ambitious brands.", $subFont, $mutedBrush, $left, 424, $fmtTypo)

# Footer meta
$g.DrawString("Onigbinde Akinbowale  |  Web Design & Development", $metaFont, $inkBrush, $left, 540, $fmtTypo)
$g.DrawString("Lagos, Nigeria  |  akinfolio.vercel.app", $subFont, $dotBrush, $left, 574, $fmtTypo)

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$arcPen.Dispose()
$ringPen.Dispose()
$inkBrush.Dispose()
$creamBrush.Dispose()
$orangeBrush.Dispose()
$mutedBrush.Dispose()
$dotBrush.Dispose()
$displayFont.Dispose()
$wordFont.Dispose()
$subFont.Dispose()
$metaFont.Dispose()
$washBrush.Dispose()

Write-Output "Wrote $outPath"
