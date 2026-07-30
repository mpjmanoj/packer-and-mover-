$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Hassan Packers & Movers Server listening on http://localhost:$port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") { $urlPath = "/index.html" }

        $localFile = Join-Path $PSScriptRoot $urlPath.TrimStart('/')

        if (Test-Path $localFile -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localFile)
            
            if ($localFile.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($localFile.EndsWith(".jpg") -or $localFile.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
            elseif ($localFile.EndsWith(".png")) { $response.ContentType = "image/png" }
            elseif ($localFile.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($localFile.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
}
