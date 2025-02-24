import { Text } from "react-native";

type TextWithColorProps = {
    children: any;
    color?: string;
    style?: any
}

export default function TextWithColor({ children, color = 'black', style }: TextWithColorProps) {
    return (
        <Text style={{ color: color, ...style, fontFamily: 'OnestRegular' }}>{children}</Text>
    )
}