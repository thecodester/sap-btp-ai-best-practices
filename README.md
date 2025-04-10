# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true npm run deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Video Compression

The project includes a script to compress large video files (over 100MB) to optimize website performance. The script uses FFmpeg to compress videos while maintaining good quality.

#### Prerequisites

- FFmpeg must be installed on your system
- Video files should be placed in the appropriate static directory

#### Usage

```bash
# Make the script executable
chmod +x scripts/compress-videos.sh

# Run the script with a video file path
./scripts/compress-videos.sh path/to/your/video.mp4
```

The script will:

- Check if the video is larger than 100MB
- If larger, compress it using H.264 codec with good quality settings
- Create a new file with "-compressed" added to the filename
- Skip compression for videos smaller than 100MB

Example:

```bash
./scripts/compress-videos.sh static/generative-ai/access-to-generative-ai-models/videos/your-video.mp4
```

Compressed videos will be saved in the same directory with "-compressed" added to the filename.
