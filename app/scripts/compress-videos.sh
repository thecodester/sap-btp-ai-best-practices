#!/bin/bash

# Script to compress videos using FFmpeg
# Usage: ./compress-videos.sh <input_video_path>

# Check if a video path was provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide the path to the video file"
    echo "Usage: ./compress-videos.sh <input_video_path>"
    exit 1
fi

input_video="$1"
# Create output filename by adding '-compressed' before the extension
output_video="${input_video%.*}-compressed.${input_video##*.}"

# Check if the input video exists
if [ ! -f "$input_video" ]; then
    echo "Error: Input video not found: $input_video"
    exit 1
fi

# Get the size of the input video in bytes
video_size=$(stat -f %z "$input_video")
size_limit=$((100 * 1024 * 1024))  # 100MB in bytes

if [ "$video_size" -gt "$size_limit" ]; then
    echo "Video size is $(($video_size / 1024 / 1024))MB, which is larger than 100MB. Compressing..."
    ffmpeg -i "$input_video" \
        -c:v libx264 \
        -crf 23 \
        -preset medium \
        -c:a aac \
        -b:a 128k \
        "$output_video"
    echo "Video compression completed! Output saved to: $output_video"
else
    echo "Video size is $(($video_size / 1024 / 1024))MB, which is smaller than 100MB. Skipping compression."
fi 