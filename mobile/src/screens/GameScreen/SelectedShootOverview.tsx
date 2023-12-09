import { View } from "react-native";
import { Shoot } from "./FielZone";
import { StyledText } from "../../components/StyledText";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useAppNavigation } from "../../navigators";
import { useSupabaseClientContext } from "../../providers/useSupabaseClient";



const OverviewContent = ({ type, memberId, name, teamGameId }: {
  type: string;
  memberId: number | null;
  name: string;
  teamGameId: number;
}) => {
  const dispatch = useDispatch();
  const navigation = useAppNavigation();

  return (
    <View
      className="mt-2 p-2 rounded-xl bg-white grow flex flex-row justify-between items-center"
    >
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
  )
}

const Overview = ({ shoot, teamGameId }: {
  shoot: Shoot,
  teamGameId: number
}) => {
  const supabaseClient = useSupabaseClientContext();
  const memberId = shoot.memberId
  const { data, isLoading } = useQuery({
    queryKey: ["member", { memberId }],
    queryFn: async () => {
      const result = await supabaseClient.from('Members').select("id, firstName, lastName, pseudo").eq("id", memberId).single()
      return result.data
    },
  })
  const type = shoot.type.charAt(0).toUpperCase() + shoot.type.slice(1);


  if (isLoading || !data) return <View className="grow" />;

  if (!data) return (
    <OverviewContent name="Unknown" type={type} memberId={memberId} teamGameId={teamGameId} />
  )

  const { firstName, lastName } = data[0].node;
  return (
    <OverviewContent name={`${firstName} ${lastName}`} type={type} memberId={memberId} teamGameId={teamGameId} />
  );
};

export const SelectedShootOverview = ({ shoot, teamGameId }: { shoot?: Shoot, teamGameId: number }) => {
  if (!shoot) return <View className="grow" />;
  return (
    <Overview shoot={shoot} teamGameId={teamGameId} />
  );
};
