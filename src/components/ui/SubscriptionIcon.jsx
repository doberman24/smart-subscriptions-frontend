import * as simpleIcons from 'simple-icons';

const SubscriptionIcon = ({name, size = 32}) => {
    const icon = simpleIcons[`si${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`];

    if (!icon) return null;
    
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