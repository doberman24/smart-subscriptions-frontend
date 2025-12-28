import * as simpleIcons from 'simple-icons';

const SubscriptionIcon = ({name, size = 28}) => {
    const format = `si${name.charAt(0).toLocaleUpperCase('ru-RU')}${name.slice(1).toLocaleLowerCase('ru-Ru')}`;
    const icon = simpleIcons[format.split(' ')[0]];

    const stringColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = Math.abs(hash) % 360;
        return `hsl(${hue}, 70%, 80%)`;
    };

    if (!icon) return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: size,
                height: size,
                color: '#fff',
                borderRadius: 12,
                backgroundColor: stringColor(format),
                textTransform: 'uppercase',
                fontSize: '1.8rem',
                fontWeight: 600,
            }}
        >{name.charAt(0)}</div>
    );
    
    return (
        <div
            dangerouslySetInnerHTML={{__html: icon.svg}}
            style={{
                width: size,
                height: size,
                fill: `#${icon.hex}`,
            }}
            title={icon.title}
        />
    )
}

export default SubscriptionIcon