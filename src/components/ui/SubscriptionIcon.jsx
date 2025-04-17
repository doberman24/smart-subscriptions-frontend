import * as simpleIcons from 'simple-icons';

const SubscriptionIcon = ({name, size = 32}) => {
    const format = `si${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`;
    const icon = simpleIcons[format.split(' ')[0]];

    if (!icon) return (
        <div
            style={{
                width: size,
                height: size,
                border: '3px solid #5552e8',
                borderRadius: 12,
            }}
        />
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