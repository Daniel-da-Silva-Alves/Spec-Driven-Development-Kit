Add-Type -AssemblyName System.Windows.Forms
$pdfPath = Resolve-Path "doc\01 - The New SDLC.pdf"

# Usar a API do Windows ou ler de forma limpa as strings
$bytes = [System.IO.File]::ReadAllBytes($pdfPath)
$enc = [System.Text.Encoding]::GetEncoding("latin1")
$raw = $enc.GetString($bytes)

# Regex para encontrar blocos de texto no formato PDF (Tj ou TJ)
$regex = [regex] '(?s)\((.*?)\)\s*Tj'
$matches = $regex.Matches($raw)

$cleanText = foreach ($m in $matches) {
    $val = $m.Groups[1].Value
    # Filtrar caracteres de controle
    $val = $val -replace '\\\d{3}', ''
    $val = $val -replace '\\\)', ')'
    $val = $val -replace '\\\(', '('
    if ($val.Length -gt 2) { $val }
}

$cleanText -join "`r`n" | Out-File -Encoding utf8 "doc\01-text-only.txt"
Write-Host "Extração concluída: $($cleanText.Count) blocos."
