import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import dayjs from "dayjs";
import log from "loglevel";
// const prefix = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm';
const prefix = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";

export const ffmpeg = new FFmpeg();
ffmpeg.on("log", ({ message }) => {
    log.debug("# log ==>", message);
});
ffmpeg.on("progress", ({ progress, time }) => {
    log.debug("# progress ==>", time, progress);
});
globalThis.ffmpeg = ffmpeg;

export async function loadFFmpeg() {
    await ffmpeg.load({
        coreURL: await toBlobURL(`${prefix}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${prefix}/ffmpeg-core.wasm`, "application/wasm"),
        // workerURL: await toBlobURL(`${prefix}/ffmpeg-core.worker.js`, 'text/javascript'),
    });
}
export async function ffmpegDownloadFile(input, output) {
    await ffmpeg.writeFile(output, await fetchFile(input));
}

export async function ffmpegListDir(dir) {
    const dirs = await ffmpeg.listDir(dir).catch(err => {
        log.error("listDir err", err);
    });
    log.info("listDir", dirs);
}
export async function execCommands(str) {
    {
        const startTime = dayjs();

        try {
            const commands = str.split(" ");
            log.info("#execCommands start", commands);

            const res = await ffmpeg.exec(commands);
            const duration = dayjs.duration(dayjs().diff(startTime));
            log.info("#execCommands end", commands, res, "耗时：", duration.format("HH:mm:ss"));
            if (res) {
                log.error("# execCommands err ", res);
            }
        } catch (err) {
            log.error("# execCommands err ", err);
        }
    }
}
