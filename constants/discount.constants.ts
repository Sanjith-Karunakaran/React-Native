
export const CLIENT_ID = 1;

export const DISCOUNT_TYPES = {
  PERCENTAGE: 'PERCENTAGE',
  FLAT: 'FLAT',
} as const;

export const DISCOUNT_TYPE_OPTIONS = [
  {
    label: 'Percentage',
    value: DISCOUNT_TYPES.PERCENTAGE,
    icon: '%',
  },
  {
    label: 'Fixed Amount',
    value: DISCOUNT_TYPES.FLAT,
    icon: '₹',
  },
];

export const DISCOUNT_SCOPES = {
  ORDER: 'ORDER',
  ITEM: 'ITEM',
} as const;

export const SCOPE_OPTIONS = [
  { label: 'Entire Order', value: DISCOUNT_SCOPES.ORDER },
  { label: 'Per Item', value: DISCOUNT_SCOPES.ITEM },
];

export const PLATFORMS = {
  BOTH: 'BOTH',
  DINE_IN: 'DINE_IN',
  POS: 'POS',
} as const;

export const PLATFORM_OPTIONS = [
  { label: 'All', value: PLATFORMS.BOTH },
  { label: 'Dine-in', value: PLATFORMS.DINE_IN },
  { label: 'POS', value: PLATFORMS.POS },
];


export const DAYS = [
  { label: 'M', value: 1 },
  { label: 'T', value: 2 },
  { label: 'W', value: 3 },
  { label: 'T', value: 4 },
  { label: 'F', value: 5 },
  { label: 'S', value: 6 },
  { label: 'S', value: 7 },
];

export const SCREEN_TITLES = {
  CREATE: 'New Discount',
  LIST: 'Discounts',
  EDIT: 'Edit Discount',
};

export const LABELS = {
  DESCRIPTION: 'Description',
  DISCOUNT_TYPE: 'Discount Type',
  APPLY_TO: 'Apply To',
  PLATFORM: 'Platform',
  PRIORITY: 'Priority',
  TIME_RESTRICTIONS: 'Time Restrictions',
  ACTIVE: 'Active',
};

export const PLACEHOLDERS = {
  DESCRIPTION: 'e.g., Weekend Special Offer',
  PERCENTAGE: '10',
  AMOUNT: '100',
  PRIORITY: '1',
  SEARCH: 'Search discounts...',
};


export const BUTTONS = {
  CREATE: 'Create Discount',
  UPDATE: 'Update Discount',
  EDIT: '✏️ Edit',
  DELETE: '🗑️ Delete',
};


export const ALERTS = {
  VALIDATION_ERROR_TITLE: 'Validation Error',
  VALIDATION_ERROR_MSG: 'Please fill all required fields',

  CREATE_SUCCESS: 'Discount created successfully',
  CREATE_FAILED: 'Failed to create discount',

  UPDATE_SUCCESS: 'Discount updated',
  UPDATE_FAILED: 'Update failed',

  LOAD_FAILED: 'Failed to load discounts',

  DELETE_TITLE: 'Delete Discount',
  DELETE_MSG: 'This action cannot be undone.',

  STATUS_UPDATE_FAILED: 'Failed to update status',
};
