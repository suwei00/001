
/**
 * @FileDescription: 图片/视频 尺寸规则
 * @Author: Jango
 * @Date: 2023年05月11日
 * @LastEditors: webck
 * @LastEditTime: 2023年05月12日
 */

interface Size {
    maxWidth: string;
    objectFit: string;
    width: string;
    height: string;
}

const calculateSize = (width: number|string, height: number|string): Size => {
    width = Number(width);
    height = Number(height);
    const maxWidth: number = 500;
    const maxHeight: number = 500;
    const aspectRatio: number = width / height;
    const styleObj = {
        maxWidth: "100%",
        objectFit: "contain",
    }

    // 原尺寸在范围内
    if (width<= maxWidth && height <= maxHeight) {
        return {
            ... styleObj,
            width: width + "px",
            // height: height + "px",
            height: "100%",
        };
    }

    // 宽度&&高度 超出范围
    if (width > maxWidth && height > maxHeight) {
        if (width >= height) {
            return {
                ...styleObj,
                width: maxWidth + "px",
                height: Math.round(maxWidth / aspectRatio) + "px",
            };
        }
        return {
            ... styleObj,
            width: Math.round(maxHeight * aspectRatio) + "px",
            height: maxHeight + "px",
        };

    }

    // 宽度 超出范围
    if (width > maxWidth && height <= maxHeight) {
        return {
            ... styleObj,
            width: maxWidth + "px",
            height: Math.round(maxWidth / aspectRatio) + "px",
        };
    }

    // 高度 超出范围
    if (width <= maxWidth && height > maxHeight) {
        return {
            ... styleObj,
            width: Math.round(maxHeight * aspectRatio) + "px",
            height: maxHeight + "px",
        };
    }

}

export { calculateSize }
