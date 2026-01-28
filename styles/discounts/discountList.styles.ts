import { StyleSheet } from 'react-native';

export const discountListStyles  = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  emptyState: {
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    maxWidth: 300,
  },

  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.3,
  },

  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    opacity: 0.7,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },

  headerSubtitle: {
    fontSize: 15,
    marginTop: 4,
    opacity: 0.7,
  },

  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },

  clearButton: {
    padding: 4,
  },

  clearIcon: {
    fontSize: 18,
    fontWeight: '600',
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 6,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },

  valueContainer: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },

  valueLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  valueAmount: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },

  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },

  detailItem: {
    flex: 1,
    minWidth: '45%',
  },

  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    opacity: 0.7,
  },

  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
  },

  timeCard: {
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
    marginBottom: 12,
  },

  timeLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },

  timeDetails: {
    gap: 4,
  },

  timeText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },

  daysText: {
    fontSize: 13,
    opacity: 0.8,
  },

  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteButton: {},

  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});

