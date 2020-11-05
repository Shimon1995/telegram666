import fs from 'fs';
import request from 'request';

export function download (url: string, path: string) {
    request(url).pipe(fs.createWriteStream(path));
}