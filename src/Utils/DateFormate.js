/* export function getFormatedDate(str, format) {
    if (str) {
        let oDate = new Date(str);
        let oYear = oDate.getFullYear();
        let oMonth = oDate.getMonth() + 1;
        let oDay = oDate.getDate();
        let oHour = oDate.getHours();
        let oMin = oDate.getMinutes();
        const weeks = ['日', '一', '二', '三', '四', '五', '六',];
        const lowerWeeks = ['7', '1', '2', '3', '4', '5', '6']
        let week = weeks[new Date(str).getDay()]
        let lowerweek = lowerWeeks[new Date(str).getDay()]

        let oTime;
        if (!format) {
            oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin);//最后拼接时间
        } else if (format === 'HH:MM') {
            oTime = getzf(oHour) + ':' + getzf(oMin);//最后拼接时间
        } else if (format === 'YY-MM-DD') {
            oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay);//最后拼接时间
        } else if (format === 'YY.MM.DD') {
            oTime = oYear + '.' + getzf(oMonth) + '.' + getzf(oDay);
        } else if (format === 'YY-MM-DD HH:mm') {
            oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin);//最后拼接时间
        } else if (format === 'YY-MM-DD WEEK') {
            oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + '(周' + week + ')';
        } else if (format === 'MM-DD') {
            oTime = getzf(oMonth) + '月' + getzf(oDay) + '日';
        } else if (format === 'WEEK') {
            oTime = lowerweek;
        }
        return oTime;
    } else {
        return null;
    }
};

//补0操作
export function getzf(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}
 */