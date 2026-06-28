import { AppText } from "@/components/app-defaults/app-text";
import { appColors } from "@/constants/colors";

type Props = { children: string };

export const SectionLabel = ({ children }: Props) => (
	<AppText className="text-sm font-semibold uppercase tracking-widest" style={{ color: appColors.neutral.medium }}>
		{children}
	</AppText>
);
