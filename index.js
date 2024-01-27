const { exec } = require("child_process");
require("dotenv").config();
const inputVideoPath = process.env.INPUT_DIR;
const outputDir = process.env.OUTPUT_DIR;

const resolutions = [
  {
    h: "1080",
    w: "1920",
  },
  {
    h: "720",
    w: "1280",
  },
  {
    h: "480",
    w: "640",
  },
  {
    h: "360",
    w: "480",
  },
];

function convertVideo(inputPath, outputPath, height, width) {
  const ffmpegCommand = `ffmpeg -i ${inputPath} -y -acodec aac -vcodec libx264 -filter:v scale=w=${width}:h=${height} -f mp4 ${outputPath}`;
  const childProcess = exec(ffmpegCommand);
  childProcess.stdout.on("data", (data) => {
    console.log(`stdout ${data}`);
  });

  childProcess.stderr.on("data", (data) => {
    console.log(`stderr ${data}`);
  });
  childProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

convertVideo(inputVideoPath, `${outputDir}video.mp4`, 1080, 1920);

resolutions.forEach(async (resolution) => {
  const outputVideoPath = `${outputDir}video_${resolution.h}p.mp4`;
  await convertVideo(
    inputVideoPath,
    outputVideoPath,
    resolution.h,
    resolution.w
  );
});
