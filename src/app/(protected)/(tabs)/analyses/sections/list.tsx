import { AppLoad } from "@/components/app-defaults/app-load";
import { LazyLoad } from "@/components/LazyLoad";
import { FlatList } from "react-native";
import { AnalyseCard } from "../components/AnalyseCard";
import { useAnalyseListContext } from "../context";

export const AnalyseList = () => {
    const { analyses, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useAnalyseListContext();

    return (
        <LazyLoad loading={isLoading}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={analyses}
                keyExtractor={(item) => item.id}
                renderItem={({ item: analyse }) => <AnalyseCard {...analyse} />}
                contentContainerClassName="gap-4 pb-4"
                className="w-full px-4"
                onEndReached={() => {
                    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
                }}
                onEndReachedThreshold={0.3}
                ListFooterComponent={
                    isFetchingNextPage ? <AppLoad size={32} className="py-4" /> : null
                }
            />
        </LazyLoad>
    );
}
