export const getCategoryName = (categoryName) => {
    switch (categoryName.toLowerCase()) {
        case "homme":
            return "BOYS";
        case "femme":
            return "GIRLS";
        case "mix":
            return "MIX";
        default:
            return categoryName;
    }
}
