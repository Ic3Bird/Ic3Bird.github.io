$uploadPath = split-path -parent $MyInvocation.MyCommand.Definition
$UI_Folder = $uploadPath -replace "Ic3Bird.github.io","Snowball_UI"
$exclude = @('src')

Copy-Item -Path $UI_Folder$("\assets") -Destination $uploadPath -Recurse -force
Copy-Item -Path $UI_Folder$("\index.html") -Destination $uploadPath -Recurse -force
Copy-Item -Path (Get-Item -Path $UI_Folder$("\js") -Exclude $exclude).FullName -Destination $uploadPath -Recurse -Force

Remove-Item $uploadPath$("\js\src") -Recurse

Start-Process $uploadPath$("\auto_commit.bat")