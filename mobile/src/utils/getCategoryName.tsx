export const getCategoryName = (categoryName) => {
    switch (categoryName.toLowerCase()) {
        case "homme":
            return "BOYS";
        case "femme":
            return "GIRLS";
        default:
            return categoryName;
    }
}
