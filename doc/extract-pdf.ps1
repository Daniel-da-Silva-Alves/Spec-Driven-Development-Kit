$pdfPath = Join-Path $PSScriptRoot "01 - The New SDLC.pdf"
$bytes = [System.IO.File]::ReadAllBytes($pdfPath)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)

# Extract text between parentheses (PDF text objects)
$matches = [regex]::Matches($text, '(?<=\()([^\)]{3,300})(?=\))')
$extracted = $matches | ForEach-Object { $_.Value } | Where-Object { $_ -match '[a-zA-Z]{3}' -and $_ -notmatch '^\s*$' }

$outPath = Join-Path $PSScriptRoot "01-extracted.txt"
$extracted -join "`n" | Out-File -Encoding utf8 $outPath
Write-Host "Done. Lines: $($extracted.Count)"
