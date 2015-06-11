<?php
ini_set('memory_limit', '1024M');
#echo "-||- HEY HEY HEY -||-";
if (isset($_POST)) {
#echo "-||- HEY HEY HEY -||-";
       
    //Variables
    $path               = (string) filter_input(INPUT_GET, 'path');                 
    $audioFileName      = (string) filter_input(INPUT_GET, 'audioFileName');
    $videoFileName      = (string) filter_input(INPUT_GET, 'videoFileName');    
    $extension          = (string) filter_input(INPUT_GET, 'extension'); 
    $deleteSeparatedFiles = (string) filter_input(INPUT_GET, 'deleteSeparatedFiles');     

    
    $basePath           = (string) $_SERVER['DOCUMENT_ROOT'];
    #echo "-||- basePath: " . $basePath . " -||-<br/>";
    #exit;

    $audio              = (string) $basePath . $audioFileName;
    #echo "-||- audio: " . $audio . " -||-<br/>";
    $video              = (string) $basePath . $videoFileName;
    #echo "-||- video: " . $video . " -||-<br/>";
    $output             = (string) str_replace('webm', $extension, $basePath . $videoFileName);
    #echo "-||- output: " . $output . " -||-<br/>";
    
    $relativeOutput     = str_replace($basePath, '', $output);
    #echo "-||- relativeOutput: " . $relativeOutput . " -||-<br/>";

    // run ffmpeg a+v merger 
    
    // ffmpeg -i video.mp4 -i audio.wav \
    // -c:v copy -c:a aac -strict experimental \
    // -map 0:v:0 -map 1:a:0 output.mp4
    
    // ffmpeg -i audio.wav -i video.mp4 -acodec copy -vcodec copy -f mkv output.mkv

    // ffmpeg.exe -i AudioT.m4a -i VideoT.mp4 -acodec copy -vcodec copy muxed.mp4

    // ffmpeg.exe -ss 00:00:10  -t 5 -i "video.mp4" -ss 0:00:01 -t 5 -i "music.m4a" -map 0:v:0 -map 1:a:0 -y out.mp4

    // ffmpeg -i videoFile.mp4 -i audioFile.mp3 -shortest outPutFile.mp4
    
    // ? -qscale 0

    // C:/webserver/ffmpeg/bin/
    $command  = 'ffmpeg.exe -i ' . $video . ' -i ' . $audio . ' -strict experimental -map 0:v:0 -map 1:a:0 ';
    $command .= ' ' . $output . ' 2> "' . $output . '.frog" ';
    echo "-||- command: " . $command . " -||-<br/>";
    shell_exec($command);
    #echo "-||- shell_exec run -||-<br/>";

    if ($deleteSeparatedFiles === 'true') {
        #echo "-||- deleteSeparatedFiles: " . $deleteSeparatedFiles . " -||-<br/>";
        unlink($audio);
        unlink($video);
        #echo "-||- unlink run -||-<br/>";
    }
    
    //Return media url inside media directory
    echo $relativeOutput;         
}