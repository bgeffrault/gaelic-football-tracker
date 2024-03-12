import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { StyledText } from "../../components/StyledText";
import { useSupabaseClientContext } from "../../providers/useSupabaseClient";
import { Shoot } from "../../domain/types";

function OverviewContent({
  type,
  // memberId,
  name,
  // teamGameId,
}: {
  type: string;
  // memberId: number | null;
  name: string;
  // teamGameId: number;
}) {
  // const dispatch = useDispatch();
  // const navigation = useAppNavigation();

  return (
    <View className="mt-2 p-2 rounded-xl bg-white grow flex flex-row justify-between items-center">
      <StyledText>{name}</StyledText>
      <StyledText>{type}</StyledText>
      {/* <CustomButton onPress={() => {
        dispatch(setPlayerId(memberId));
        navigation.navigate("SelectPlayer", { teamGameId });
      }}
        cn="h-5"
      >
        <Feather name="edit" size={20} color="#DF8C5F" />
      </CustomButton> */}
    </View>
  );
}

function Overview({ shoot }: { shoot: Shoot }) {
  const supabaseClient = useSupabaseClientContext();
  const { memberId } = shoot;
  const { data, isLoading } = useQuery({
    queryKey: ["member", { memberId }],
    queryFn: async () => {
      const result = await supabaseClient
        .from("Members")
        .select("id, firstName, lastName, pseudo")
        .eq("id", memberId)
        .single();
      return result.data;
    },
  });
  const type = shoot.type.charAt(0).toUpperCase() + shoot.type.slice(1);

  if (isLoading || !data) return <View className="grow" />;

  // eslint-disable-next-line no-nested-ternary
  const name = data
    ? Array.isArray(data)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        `${(data as any[])[0].node.firstName} ${(data as any[])[0].node.lastName}`
      : `${data.firstName} ${data.lastName}`
    : "Unknown";

  return (
    <OverviewContent
      name={name}
      type={type}
      // memberId={memberId}
      // teamGameId={teamGameId}
    />
  );
}

export function SelectedShootOverview({
  shoot,
  // teamGameId,
}: {
  shoot?: Shoot;
  // teamGameId: number;
}) {
  if (!shoot) return <View className="grow" />;
  return <Overview shoot={shoot} />;
}
