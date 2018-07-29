import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
import rfs from 'rotating-file-stream'

export default function (logFilePath) {
    const {dir, base} = path.parse(logFilePath)
    const accessLogStream = rfs(base, {
        interval: '1d',
        path: dir
    })

    return morgan('combined', {stream: accessLogStream})
}
