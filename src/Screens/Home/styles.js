import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fontFamily from "../../styles/fontFamily";
import { spacing } from "../../styles/spacing";
import { textScale } from "../../styles/responsiveStyles";



// define your styles
const styles = StyleSheet.create({
   boxStyle: {
      backgroundColor: colors.gray2,
      borderRadius: spacing.RADIUS_8,
      padding:spacing.PADDING_16,
   },
   profileImage: {
      width: spacing.WIDTH_60,
      height: spacing.HEIGHT_60,
      borderRadius: spacing.RADIUS_30,
      marginRight:spacing.MARGIN_16
   },
   nameStyle: {
      fontSize: textScale(16),
      fontFamily: fontFamily.Medium,
      color: colors.whiteColor,
   },
   bioStyle: {
      fontSize: textScale(12),
      fontFamily: fontFamily.Medium,
      color: colors.whiteColorOpacity50,
      marginTop: spacing.MARGIN_12
   },
   postImage: {
      width: '100%',
      height: spacing.FULL_HEIGHT / 2.8,
      borderRadius: spacing.RADIUS_8,
      marginRight: spacing.MARGIN_16,
      marginVertical: spacing.MARGIN_16
   },
   descStyle: {
      fontSize: textScale(14),
      fontFamily: fontFamily.regular,
   },
   flexHorizontal: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: "space-between",
   }
});

export default styles