import { inPrimaryPageAtom } from "@/atoms/pages";
import { AppGradientView } from "@/components/app-defaults/app-gradient-view";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { ChevronLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const logo = require('../../../assets/logo.png')

export default function Header() {
    const isInPrimaryPage = useAtomValue(inPrimaryPageAtom)

    return <AppGradientView colors={['#e6ebff', 'white']} start={{ x: 0.5, y: 0 }} className="items-center justify-center border-b border-b-stone-300" style={{ flex: 0, }}>
        <SafeAreaView className="mt-4 px-4 items-center flex-row justify-between w-full">
            <TouchableOpacity disabled={isInPrimaryPage} hitSlop={12} onPress={() => router.back()}>
                <ChevronLeft opacity={isInPrimaryPage ? 0 : 1} size={24} color={'#262626'} />
            </TouchableOpacity>
            <Image source={logo} style={{
                width: 120, aspectRatio: 4.13

            }} />
            <ChevronLeft size={24} opacity={0} />
        </SafeAreaView>
    </AppGradientView>



}