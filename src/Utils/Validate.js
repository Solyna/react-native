/* const allRules = {
    required: {
        message: '请输入%s'
    },
    valid_email: {
        regExp: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        message: '请输入正确的邮箱!'
    },
    valid_mobile: {
        regExp: /^[1][0-9]{10}$/,
        message: '请输入正确的手机号码!'
    },
    valid_mileage: {
        regExp: /^[1-9][0-9]{0,5}$/,
        message: '请输入正确的里程数!'
    },
    valid_enginNo: {
        regExp: /^[a-zA-Z-0-9]{4,17}$/,
        message: '请输入正确的发动机号'
    },
    valid_vin: {
        regExp: /^[a-zA-Z0-9]{17}$/,
        message: '请输入正确的车架号'
    },
    valid_driTel: {
        regExp: /^[1][0-9]{10}$/,
        message: '请输入正确的手机号码'
    },
    valid_dirFileNo: {
        regExp: /^[0-9]{12}$/,
        message: '请输入正确的驾驶证档案编号'
    },
    valid_dirNo: {
        regExp: /^[0-9]{17}[a-zA-Z0-9]{1}$/,
        message: '请输入正确的驾驶证号'
    },
    valid_chipNo: {
        regExp: /^[0-9]{13}$/,
        message: '请输入正确的驾驶证条形码'
    },
    max_value: {}
};

const ruleRegex = /^(.+?)\[(.+)\]$/;

export default function validate(data = {}, fields = []) {
    let msg = '';
    fields.some(({
        key,
        name,
        rules = '',
        messages = ''
    }) => {
        let val = data[key];
        rules = rules.split('|');
        messages = messages.split('|');

        const hasRuleDoesNotPass = rules.some((rule, index) => {
            const ruleParam = null;
            const parts = rule.match(ruleRegex);
            if (parts) {
                rule = parts[1];
                param = parts[2];
            }
            const regExp = allRules[rule].regExp;
            let isRulePass = false;

            switch (rule) {
                case 'required':
                    if (val) {
                        isRulePass = true;
                    }
                    break;
                case 'valid_email':
                case 'valid_mobile':
                case 'valid_mileage':
                case 'valid_enginNo':
                case 'valid_vin':
                case 'valid_driTel':
                case 'valid_dirFileNo':
                case 'valid_dirNo':
                case 'valid_chipNo':
                    val = val + '';
                    if (regExp.test(val)) {
                        isRulePass = true;
                    }
                    break;
                case 'max_value':
                    val = +val;
                    if (val <= +param) {
                        isRulePass = true;
                    }
                    break;
                default:
                    isRulePass = true;
            }
            let defaultMessage = allRules[rule].message;
            if (rule === 'required') {
                defaultMessage = defaultMessage.replace('%s', name);
            }
            if (!isRulePass) {
                msg = messages[index] || defaultMessage;
                return true;
            }
        });
        return hasRuleDoesNotPass;
    });

    return msg;
}
 */