$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Authorization", "Basic xxxxx")

$response = Invoke-RestMethod "https://api.github.com/search/code?q=filename:vss-extension.json+ms.vss-endpoint.service-endpoint-type" -Method 'GET' -Headers $headers

$items = @()
$items = $items + $response.items

$itemsCount = $response.items.Count
$pages = 1

if ($response.items.Count -gt $response.total_count) {
    $partialPages = $response.total_count / $itemsCount
    $pages = [int][Math]::Ceiling($partialPages)
}

for ($p = 2; $p -le $pages; $p++) {
    $response = Invoke-RestMethod "https://api.github.com/search/code?q=filename:vss-extension.json+ms.vss-endpoint.service-endpoint-type&page=$p" -Method 'GET' -Headers $headers
    $items = $items + $response.items
}

foreach ($result in $items) {

    $url = $result.html_url
    #$url = "https://github.com/microsoft/vsts-docker/blob/e849845d57d2dc3d664429fb081f2189be340762/src/vss-extension.json"

    $parts = $url.Split("/")

    # 0 https:
    # 1
    # 2 github.com
    # 3 microsoft
    # 4 vsts-docker
    # 5 blob
    # 6 e849845d57d2dc3d664429fb081f2189be340762
    # 7 src
    # 8 vss-extension.json

    $account = $parts[3]
    $repo = $parts[4]

    $filePath = ""
    $fileName = ""

    For ($i = 6; $i -lt $parts.Count; $i++) {
        $filePath += "$($parts[$i])/"
        # If($i -eq $parts.Count -1)
        # {
        #     $fileName = $parts[$i]
        # }
    }

    $filePath = $filePath.Substring(0, $filePath.Length - 1)

    $url = "https://raw.githubusercontent.com/$account/$repo/$filePath"

    Invoke-WebRequest $url -OutFile "./vss-extensions/$account-$repo.json"
}

$serviceEndpoints = @()

foreach($file in Get-ChildItem -Path "./vss-extensions/")
{
    $filePathName = "./vss-extensions/$($file.Name)"
    Write-Host "Reading: $filePathName"
    $vssExtn = Get-Content -Raw -Path $filePathName | ConvertFrom-Json
    foreach($contribution in $vssExtn.contributions)
    {
        if($contribution.type -eq "ms.vss-endpoint.service-endpoint-type")
        {
            $serviceEndpoints += $contribution
        }
    }
}

$serviceEndpoints | ConvertTo-Json -Depth 10 | Out-File -FilePath "./vss-extensions.json"