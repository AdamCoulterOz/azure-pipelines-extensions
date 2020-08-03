$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Authorization", "Basic xxxxx")

$response = Invoke-RestMethod "https://api.github.com/search/code?q=filename:vss-extension.json+Microsoft.VisualStudio.Services&per_page=100" -Method 'GET' -Headers $headers

$items = @()
$items = $items + $response.items

$itemsCount = $response.items.Count
$pages = 1

if ($response.items.Count -lt $response.total_count) {
    $partialPages = $response.total_count / $itemsCount
    $pages = [int][Math]::Ceiling($partialPages)
}

for ($p = 2; $p -le $pages; $p++) {
    $response = Invoke-RestMethod "https://api.github.com/search/code?q=filename:vss-extension.json+Microsoft.VisualStudio.Services&page=$p&per_page=100" -Method 'GET' -Headers $headers
    $items = $items + $response.items
}

$index = @{};

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
    #$fileName = ""

    For ($i = 6; $i -lt $parts.Count; $i++) {
        $filePath += "$($parts[$i])/"
        If($i -eq $parts.Count -1)
        {
            if($parts[$i] -ne "vss-extension.json")
            {
                Write-Host "Error with: $url"
            }
        }
    }

    $filePath = $filePath.Substring(0, $filePath.Length - 1)

    $url = "https://raw.githubusercontent.com/$account/$repo/$filePath"

    if(-Not (Test-Path "./vss-extensions/$account-$repo.json" -PathType Leaf)) {
        Invoke-WebRequest $url -OutFile "./vss-extensions/$account-$repo.json"
    }

    if($index.ContainsKey("$account-$repo"))
    {
        $index["$account-$repo"]++;
    }
    else {
        $index["$account-$repo"]=1;
    }
}
$total = 0;
foreach($value in $index.Values)
{
    $total+=$value;
}

$serviceEndpoints = @();
$vssExtensions = @();

foreach($file in Get-ChildItem -Path "./example-vss-extensions/")
{
    $filePathName = "./example-vss-extensions/$($file.Name)"
    Write-Host "Reading: $filePathName"
    $vssExtn = Get-Content -Raw -Path $filePathName | ConvertFrom-Json
    $vssExtensions += $vssExtn;
    # foreach($contribution in $vssExtn.contributions)
    # {
    #     if($contribution.type -eq "ms.vss-endpoint.service-endpoint-type")
    #     {
    #         #$serviceEndpoints += $contribution

    #     }
    # }
}

$serviceEndpoints | ConvertTo-Json -Depth 10 | Out-File -FilePath "./vss-extensions-serviceconnections.json"
$vssExtensions | ConvertTo-Json -Depth 10 | Out-File -FilePath "./vss-extensions-all.json"