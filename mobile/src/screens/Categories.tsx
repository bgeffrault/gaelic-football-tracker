import { ScrollView, View } from "react-native";
import { memo, useEffect } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { StyledText } from "../components/StyledText";
import { CustomButton } from "../components/CustomButton";
import { CustomCheckbox } from "../components/CustomCheckbox";
import { setCategory } from "../stores/slices/gameSlice";
import { useAppSelector } from "../stores/store";
import { AppNavigationProp, useAppNavigation } from "../navigators";
import { useSupabaseClientContext } from "../providers/useSupabaseClient";
import { Category } from "../types/Category";

const CategoryHeaderButton = memo(({ selectMode }: { selectMode: boolean }) => {
  const navigation = useAppNavigation();

  return selectMode ? (
    <CustomButton onPress={() => navigation.goBack()}>
      <StyledText cn="">OK</StyledText>
    </CustomButton>
  ) : null;
});

function CategoryItem({
  category,
  first,
  last,
  selectMode,
}: {
  category: Category;
  first: boolean;
  last: boolean;
  selectMode: boolean;
}) {
  const isSelected = Boolean(
    useAppSelector((state) => state.game.category?.id === category.id),
  );
  const dispatch = useDispatch();

  return (
    <View
      className={clsx(
        "border border-[#000000] flex-row justify-between items-center",
        "py-2 px-4",
        first && "rounded-t-lg",
        last && "rounded-b-lg",
      )}
    >
      <StyledText cn="font-bold text-lg">{category.name}</StyledText>
      <View>
        {selectMode && (
          <CustomCheckbox
            isChecked={isSelected}
            setChecked={() => dispatch(setCategory(category))}
          />
        )}
      </View>
    </View>
  );
}

export function Categories({
  navigation,
  route,
}: AppNavigationProp<"Categories">) {
  const supabaseClient = useSupabaseClientContext();
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await supabaseClient.from("Category").select("id, name");

      return result.data as Category[];
    },
  });

  const mode = route.params?.mode;
  const selectMode = mode === "select";

  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectMode ? "Sélection de la categorie" : "Catégories",
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <CategoryHeaderButton selectMode={selectMode} />,
    });
  }, [navigation]);

  if (isLoading) return null;

  return (
    <View className="m-6">
      <ScrollView>
        {data.map((category, i, arr) => {
          return (
            <CategoryItem
              key={category.id}
              first={i === 0}
              last={i === arr.length - 1}
              selectMode={selectMode}
              category={category}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
