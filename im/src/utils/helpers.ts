import { copy } from 'clipboard'

// 检测浏览器是否支持webp格式
export const canUseWebp = () => {
  return document.documentElement.classList.value.split(' ').includes('webp')
}

// 检测浏览器是否支持avif格式
export const canUseAvif = () => {
  return document.documentElement.classList.value.split(' ').includes('avif')
}
// 获取浏览器支持的图片格式
export const getSupportImage = (imgs: any) => {
  if (!imgs?.length) return ''
  if (canUseAvif()) return imgs[0].srcset as string
  if (canUseWebp()) return imgs[1].srcset as string
  return imgs[2].srcset as string
}

// 获取css中v-bind绑定值
export const getImageUrl = (imgs: any) => {
  return `url(${getSupportImage(imgs)})`
}

// 生成 min 到 max之间的随机整数
export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const guid = () => {
  let idStr = Date.now().toString(36)
  idStr += Math.random().toString(36).substr(2)
  return idStr
}
// 复制操作
export const newCopy = (dom: any, cb?: (text: string) => void) => {
  const text = copy(dom)
  return cb?.(text)
}

// 高亮文本搜索
const indicesOf = (text: string, searchString: string) => {
  const searchStringLen = searchString.length;

  if (searchStringLen === 0) {
    return [];
  }

  const indices: any[] = [];

  let strCpy = text;
  let searchStringCpy = searchString;

  strCpy = text.toLocaleLowerCase();
  searchStringCpy = searchString.toLocaleLowerCase();

  let startIndex = 0;
  let index = strCpy.indexOf(searchStringCpy, startIndex);
  while (index > -1) {
    startIndex = index + searchStringLen;
    indices.push([index, startIndex]);

    index = strCpy.indexOf(searchStringCpy, index + 1);
  }

  return indices;
}

const mergeRange = ([...ranges]) => {
  if (!ranges.length) return [];

  ranges.sort((fir, sec) => {
    if (fir[0] !== sec[0]) return fir[0] - sec[0];
    return fir[1] - sec[1];
  });

  const merged = [];

  let curStart = ranges[0][0];
  let curEnd = ranges[0][1];

  ranges.shift();

  ranges.forEach(([start, end]) => {
    if (start >= curEnd) {
      merged.push([curStart, curEnd]);
      curStart = start;
      curEnd = end;
    } else if (end > curEnd) curEnd = end; // 有交叉 highigh 全部高亮
  });

  merged.push([curStart, curEnd]);

  return merged;
}

export const highlightChunks = (text: string, searchString: string) => {
  let queries = [searchString];

  const matches: any[] = [];

  queries.forEach((query) => {
    matches.push(...indicesOf(text, query));
  });

  const highlights = mergeRange(matches);

  const chunks = [];
  let lastEnd = 0;

  highlights.forEach(([start, end], index) => {
    if (lastEnd !== start) {
      chunks.push({
        isHighlighted: false,
        text: text.slice(lastEnd, start),
      });
    }
    chunks.push({
      isHighlighted: true,
      text: text.slice(start, end),
      highlightIndex: index,
    });

    lastEnd = end;
  });

  if (lastEnd !== text.length) {
    chunks.push({
      isHighlighted: false,
      text: text.slice(lastEnd),
    });
  }

  return chunks;
}