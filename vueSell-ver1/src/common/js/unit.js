// 工具类方法
/*
 * 解析URL参数
 * @example ?id=1223123&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse() {
    let Url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]/g;
    let arr = Url.match(reg);
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = encodeURIComponent(tempArr[0]);
            let val = encodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
}
