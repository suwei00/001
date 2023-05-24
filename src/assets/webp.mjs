/* eslint-disable no-empty */
'use strict'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import webp from 'webp-converter'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDir = path.join(__dirname, './image')

// 解析需要遍历的文件夹，我这以E盘根目录为例

// 调用文件遍历方法
fileDisplay(rootDir)
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
  // 根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, (err, files) => {
    if (err) {
    }
    else {
      // 遍历读取到的文件列表
      files.forEach((filename) => {
        // 获取当前文件的绝对路径
        const filedir = path.join(filePath, filename)
        // 根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, (eror, stats) => {
          if (eror) {
          }
          else {
            const isFile = stats.isFile() // 是文件
            const isDir = stats.isDirectory() // 是文件夹
            if (isFile) {
              if (filedir.includes('.webp') || filedir.includes('.avif'))
                return
              if (filedir.includes('.png') || filedir.includes('.jpg')) {
                sharp(filedir).toFormat('avif', { palette: true }).toFile(`${filedir}.avif`)
                webp.cwebp(filedir, `${filedir}.webp`, '-q 80')
              }
              else if (filedir.includes('.gif')) {
                webp.gwebp(filedir, `${filedir}.webp`, '-q 80')
              }
            }
            if (isDir)
              fileDisplay(filedir) // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
          }
        })
      })
    }
  })
}
