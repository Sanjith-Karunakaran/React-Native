import { StyleSheet } from 'react-native';

export const dashboardStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
    opacity: 0.6,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  statCard: {
    width: '48%',
    borderRadius: 20,
    padding: 20,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  trendText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.6,
  },
  statSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.5,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  periodSelector: {
    flexDirection: 'row',
    gap: 6,
  },
  periodButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  periodText: {
    fontSize: 13,
    fontWeight: '600',
  },
  chartContainer: {
    marginTop: 8,
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 160,
    gap: 8,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  barContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '80%',
    borderRadius: 8,
  },
  barLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  platformList: {
    gap: 20,
    marginTop: 8,
  },
  platformItem: {
    gap: 8,
  },
  platformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  platformName: {
    fontSize: 15,
    fontWeight: '700',
  },
  platformCount: {
    fontSize: 13,
    fontWeight: '500',
    opacity: 0.6,
  },
  platformBarContainer: {
    height: 8,
    backgroundColor: '#00000008',
    borderRadius: 4,
    overflow: 'hidden',
  },
  platformBar: {
    height: '100%',
    borderRadius: 4,
  },
  platformPercentage: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  recentSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 15,
    fontWeight: '600',
  },
  discountItem: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
  },
  discountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discountInfo: {
    flex: 1,
    gap: 10,
  },
  discountDescription: {
    fontSize: 16,
    fontWeight: '700',
  },
  discountMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  usageText: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.6,
  },
  discountValue: {
    alignItems: 'flex-end',
    gap: 2,
    marginLeft: 12,
  },
  valueText: {
    fontSize: 24,
    fontWeight: '800',
  },
  valueLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    opacity: 0.5,
  },
});
