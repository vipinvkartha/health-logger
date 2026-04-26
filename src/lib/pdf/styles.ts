import { StyleSheet } from "@react-pdf/renderer";

export const colors = {
  cream: "#FDF6EC",
  creamDark: "#F5EBD8",
  brown: "#5C4033",
  brownLight: "#8B6F5E",
  brownMuted: "#A89282",
  sage: "#A3B18A",
  sageDark: "#7D8B6A",
  terracotta: "#C68B59",
  terracottaLight: "#DEBA9A",
  rule: "#E2D5C3",
  white: "#FFFFFF",
};

export const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.cream,
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: colors.brown,
  },
  title: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: colors.brown,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: colors.brownMuted,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: colors.brown,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.rule,
  },
  section: {
    marginBottom: 16,
    backgroundColor: colors.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.rule,
    padding: 12,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.rule,
  },
  timeCell: {
    width: 60,
    fontSize: 9,
    color: colors.brownLight,
  },
  foodCell: {
    flex: 1,
    fontSize: 10,
    color: colors.brown,
  },
  label: {
    fontSize: 9,
    color: colors.brownMuted,
    marginBottom: 2,
  },
  value: {
    fontSize: 11,
    color: colors.brown,
  },
  inlineRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 8,
  },
  inlineItem: {
    flex: 1,
  },
  badge: {
    fontSize: 9,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: colors.creamDark,
    color: colors.brown,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  // Summary report styles
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    width: "48%",
    backgroundColor: colors.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.rule,
    padding: 12,
  },
  summaryValue: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: colors.sage,
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 9,
    color: colors.brownMuted,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: colors.brownMuted,
    borderTopWidth: 0.5,
    borderTopColor: colors.rule,
    paddingTop: 8,
  },
});
