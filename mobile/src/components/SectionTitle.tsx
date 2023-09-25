import { StyledText } from "./StyledText";

export const SectionTitle = ({ children, cn }: {
    children: React.ReactNode;
    cn?: string;
}) => <StyledText cn={"tracking-wide bg-[#df8c5f] p-1 " + cn}>{children}</StyledText>
