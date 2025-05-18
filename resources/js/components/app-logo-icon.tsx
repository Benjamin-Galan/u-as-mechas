//import { SVGAttributes } from 'react';
type AppLogoIcon = {
    className?: string;
}

export default function AppLogoIcon({className}: AppLogoIcon) {
    return (
        <img src="/logo.png" alt="" className={className} />
    );
}
