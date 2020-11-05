import fs from 'fs';
import request from 'request';

class FilesService {

    private readonly token = process.env.npm_package_env_API_TOKEN;
    private readonly URL = `https://api.telegram.org/file/bot${this.token}/`;

    // prevent downloading too large files
    downloadFile (url: string, path: string) {
        request(url).pipe(fs.createWriteStream(path));
    }
}