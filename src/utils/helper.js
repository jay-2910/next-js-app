function unserialize(serializedString) {
    const matches = serializedString.match(/s:(\d+):"([^"]*)";/);
    if (matches) {
        return matches[2];
    }
    return null;
}

export default function getSettingValue(data, key, locale = '') {
    if (!data || !key) {
        return null;
    }

    const setting = data.find(item => item.key === key);
    if (!setting) {
        return null;
    }

    if (locale) {
        const translation = setting.setting_translations.find(t => t.locale === locale);
        if (translation && translation.value) {
            return unserialize(translation.value);
        }
    } 

    if (setting.plain_value) {
        return unserialize(setting.plain_value);
    }
    return null;
}
