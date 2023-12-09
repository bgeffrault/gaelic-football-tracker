import { useQuery } from "@tanstack/react-query";
import { useClubIdContext } from "../../providers/ClubIdProvider";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TeamSection } from "./TeamSection";
import { CategoryFilter } from "../../components/CategoryFilter";
import { GoHomeButton } from "../../components/GoHomeButton";
import { useSupabaseClientContext } from "../../providers/useSupabaseClient";

export function ClubConfig({ navigation }) {
    const [categoryId, setCategoryId] = useState(1)
    const clubId = useClubIdContext();
    const supabaseClient = useSupabaseClientContext();

    const { data: clubTeams, isLoading: isLoadingClubTeams } = useQuery({
        queryKey: ["teams", { external: false, categoryId }],
        queryFn: async () => {
            const result = await supabaseClient.from('Team').select('*')
                .eq('clubId', clubId)
                .eq('categoryId', categoryId)
                .eq('external', false)
                .order('teamName')
            return result.data
        },
    })
    const { data: externalTeams, isLoading: isLoadingExternalTeams } = useQuery({
        queryKey: ["teams", { external: true, categoryId }],
        queryFn: async () => {
            const result = await supabaseClient.from('Team').select('*')
                .eq('clubId', clubId)
                .eq('categoryId', categoryId)
                .eq('external', true)
                .order('teamName')
            return result.data
        },
    })

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <FontAwesome name="cog" size={24} color="#1F2937" />,
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => <GoHomeButton />,
        });
    }, [navigation]);

    if (isLoadingClubTeams || isLoadingExternalTeams) return null;

    return (
        <>
            <CategoryFilter onPress={(id) => setCategoryId(id)} categoryId={categoryId} />
            <ScrollView>
                <SafeAreaView >
                    <TeamSection teams={clubTeams} external={false} title="Equipes du club" categoryId={categoryId} />
                </SafeAreaView>
                <SafeAreaView>
                    <TeamSection teams={externalTeams} external title="Equipes adverses" categoryId={categoryId} />
                </SafeAreaView>
            </ScrollView>
        </>
    );
}
