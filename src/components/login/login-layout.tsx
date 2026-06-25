import { useEffect } from "react"
import { createAnimatedComponent, Easing, interpolateColor, SharedValue, SlideInLeft, useAnimatedProps, useSharedValue, withDelay, withRepeat, withTiming } from "react-native-reanimated"
import Svg, { Circle, Path, SvgProps, } from "react-native-svg"

const AnimatedCircle = createAnimatedComponent(Circle)
const AnimatedSvg = createAnimatedComponent(Svg)

export function LoginLayout(props: SvgProps) {
    const progress1 = useSharedValue(0)
    const progress2 = useSharedValue(0)
    const progress3 = useSharedValue(0)
    const progress4 = useSharedValue(0)

    const animProps = (progress: SharedValue<number>) => {
        return useAnimatedProps(() => {
            const fillColor = interpolateColor(
                progress.value,
                [0, 1],
                ['#002FBB', '#1646d4'] // From Red to Green
            );
            return {
                fill: fillColor
            }
        }, [progress])
    }

    useEffect(() => {
        const timingValue = withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) })
        progress1.value = withRepeat(timingValue, -1, true)
        progress2.value = withDelay(200, withRepeat(timingValue, -1, true))
        progress3.value = withDelay(400, withRepeat(timingValue, -1, true))
        progress4.value = withDelay(600, withRepeat(timingValue, -1, true))
    }, [])

    return (
        <AnimatedSvg
            width={211}
            height={886}
            viewBox="0 0 211 886"
            fill="none"
            {...props}
            entering={SlideInLeft.springify().delay(400)}
            style={{ position: 'absolute', bottom: 0 }}
        >
            <AnimatedCircle
                cx={11.9514}
                cy={198.828}
                r={198.828}
                fillOpacity={0.5}
                animatedProps={animProps(progress1)}
            />
            <AnimatedCircle
                cx={11.9514}
                cy={218.385}
                r={179.271}
                fillOpacity={0.5}
                animatedProps={animProps(progress2)}
            />
            <AnimatedCircle
                cx={11.9514}
                cy={237.942}
                r={159.714}
                fillOpacity={0.5}
                animatedProps={animProps(progress3)}
            />
            <AnimatedCircle
                cx={11.9514}
                cy={257.499}
                r={140.158}
                fillOpacity={0.5}
                animatedProps={animProps(progress4)}
            />
            <AnimatedCircle
                cx={11.9514}
                cy={277.056}
                r={120.601}
                fill="#002FBB"
            />
            <Path
                d="M49.978 993.428h-74.967V392.43a199.223 199.223 0 0036.94 3.439c13.005 0 25.719-1.254 38.027-3.646v601.205z"
                fill="#002FBB"
            />
        </AnimatedSvg>
    )
}

